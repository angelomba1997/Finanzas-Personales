import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDUO3tyBo9YuM9je2vmKQJ9Asl6Eg0ybw",
  authDomain: "finanzas-personales-de817.firebaseapp.com",
  projectId: "finanzas-personales-de817",
  storageBucket: "finanzas-personales-de817.firebasestorage.app",
  messagingSenderId: "25345604223",
  appId: "1:25345604223:web:94f3d56d56eb6407435d4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
