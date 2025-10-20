
import React from 'react';
import { MONTH_NAMES } from '../constants';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/Icons';

interface MonthNavigatorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({ currentDate, setCurrentDate }) => {
  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <button 
        onClick={() => changeMonth(-1)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <div className="mx-6 text-center">
        <h2 className="text-xl font-bold text-primary dark:text-primary-light">
          {MONTH_NAMES[currentDate.getMonth()]}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{currentDate.getFullYear()}</p>
      </div>
      <button 
        onClick={() => changeMonth(1)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next month"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
