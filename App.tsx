
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ExpensesView } from './components/views/ExpensesView';
import { SavingsView } from './components/views/SavingsView';
import { Header } from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { AppData } from './types';
import { DEFAULT_DATA } from './constants';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [data, setData] = useLocalStorage<AppData>('finanzasClarasData', DEFAULT_DATA);

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/ahorros" element={<SavingsView data={data} setData={setData} />} />
              <Route path="/" element={<ExpensesView data={data} setData={setData} />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
