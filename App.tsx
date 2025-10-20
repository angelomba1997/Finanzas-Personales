import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ExpensesView } from './components/views/ExpensesView';
import { SavingsView } from './components/views/SavingsView';
import { Header } from './components/Header';
import { useFirestore } from './hooks/useFirestore';
import type { AppData } from './types';
import { DEFAULT_DATA } from './constants';
import { ThemeProvider } from './context/ThemeContext';
import { WalletIcon } from './components/icons/Icons';

function App() {
  const [data, setData, isLoading] = useFirestore<AppData>('appData', 'main', DEFAULT_DATA);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-gray-700 dark:text-gray-300">
        <WalletIcon className="h-16 w-16 text-primary animate-pulse" />
        <p className="mt-4 text-lg font-semibold">Cargando datos...</p>
      </div>
    );
  }

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