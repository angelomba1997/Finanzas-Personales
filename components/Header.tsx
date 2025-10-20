
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, WalletIcon } from './icons/Icons';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-dark text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <WalletIcon className="h-8 w-8 text-primary" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
              Finanzas Claras
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden sm:flex space-x-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
              <NavLink to="/" className={navLinkClasses}>
                Gastos
              </NavLink>
              <NavLink to="/ahorros" className={navLinkClasses}>
                Ahorros
              </NavLink>
            </nav>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-6 w-6" />
              ) : (
                <SunIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <nav className="sm:hidden bg-gray-100 dark:bg-gray-900 p-2 flex justify-center space-x-2">
         <NavLink to="/" className={navLinkClasses}>
            Gastos
          </NavLink>
          <NavLink to="/ahorros" className={navLinkClasses}>
            Ahorros
          </NavLink>
      </nav>
    </header>
  );
};
