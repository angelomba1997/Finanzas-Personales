
import React, { useState, useMemo } from 'react';
import { nanoid } from 'nanoid';
import type { AppData, Saving } from '../../types';
import { MonthNavigator } from '../MonthNavigator';
import { SavingsCard } from '../SavingsCard';
import { PlusIcon, PiggyBankIcon } from '../icons/Icons';

interface SavingsViewProps {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}

export const SavingsView: React.FC<SavingsViewProps> = ({ data, setData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { savings, prevMonthSavings } = useMemo(() => {
    const currentSavings = data[year]?.[month]?.savings || [];
    
    const prevMonthDate = new Date(year, month - 1);
    const prevMonthYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth();
    const prevSavings = data[prevMonthYear]?.[prevMonth]?.savings || [];

    return { savings: currentSavings, prevMonthSavings: prevSavings };
  }, [data, year, month]);

  const handleDataChange = (updatedSavings: Saving[]) => {
    setData(prevData => ({
      ...prevData,
      [year]: {
        ...prevData[year],
        [month]: {
          ...prevData[year]?.[month],
          savings: updatedSavings,
          expenses: prevData[year]?.[month]?.expenses || [],
        },
      },
    }));
  };

  const addSaving = () => {
    const newSaving: Saving = { id: nanoid(), source: 'Nuevo Ahorro', amount: 0 };
    handleDataChange([...savings, newSaving]);
  };

  const totalSavings = useMemo(() => 
    savings.reduce((acc, s) => acc + s.amount, 0), 
    [savings]
  );
  
  return (
    <div className="space-y-6">
      <MonthNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
          <div className="flex items-center">
              <PiggyBankIcon className="h-10 w-10 text-success" />
              <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ahorro Acumulado (Mes)</h2>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {totalSavings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savings.map((saving, index) => (
          <SavingsCard 
            key={saving.id}
            saving={saving}
            prevMonthSavings={prevMonthSavings}
            onUpdate={(updatedSaving) => {
              const newSavings = [...savings];
              newSavings[index] = updatedSaving;
              handleDataChange(newSavings);
            }}
            onDelete={(savingId) => {
              handleDataChange(savings.filter(s => s.id !== savingId));
            }}
          />
        ))}

        <button
            onClick={addSaving}
            className="h-full min-h-[150px] flex items-center justify-center py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <PlusIcon className="h-6 w-6 mr-2" />
            Añadir Ahorro
        </button>
      </div>
    </div>
  );
};
