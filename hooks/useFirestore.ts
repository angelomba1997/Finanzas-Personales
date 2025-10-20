import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { AppData } from '../types';

export function useFirestore<T>(collectionId: string, docId: string, initialData: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  // useRef to avoid writing to Firestore on initial component mount
  const isInitialMount = useRef(true);
  const debounceTimer = useRef<number | null>(null);

  // Effect for listening to real-time updates from Firestore
  useEffect(() => {
    const docRef = doc(db, collectionId, docId);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as T);
      } else {
        // Document doesn't exist, use initial data
        // and we will create it on the first data change
        setData(initialData);
        console.log("No such document! Initializing with default data.");
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore snapshot error:", error);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [collectionId, docId, initialData]);

  // Effect for debouncing writes to Firestore
  useEffect(() => {
    // Don't write on the very first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new timer to write data after 500ms of inactivity
    debounceTimer.current = window.setTimeout(async () => {
      if (isLoading) return; // Don't write while still loading
      try {
        const docRef = doc(db, collectionId, docId);
        await setDoc(docRef, data, { merge: true }); // Use merge to avoid overwriting fields
      } catch (error) {
        console.error("Error writing document to Firestore:", error);
      }
    }, 500); // 500ms debounce delay

    // Cleanup timer on unmount or if data changes again
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [data, collectionId, docId, isLoading]);

  return [data, setData, isLoading];
}
