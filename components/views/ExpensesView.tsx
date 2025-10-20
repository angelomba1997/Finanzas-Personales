import React, { useState, useMemo, useEffect } from 'react';
import { nanoid } from 'nanoid';
import type { AppData, Expense, IncomeSource, MonthlyData } from '../../types';
import { INITIAL_EXPENSES } from '../../constants';
import { MonthNavigator } from '../MonthNavigator';
import { ExpenseCategory } from '../ExpenseCategory';
import { ExpensesChart } from '../ExpensesChart';
import { PlusIcon, BillIcon, TrashIcon, CashIcon, ScaleIcon } from '../icons/Icons';

interface ExpensesViewProps {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}

const SummaryCard: React.FC<{ title: string; amount: number; icon: React.ReactNode; colorClass?: string }> = ({ title, amount, icon, colorClass = 'text-gray-900 dark:text-white' }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center">
        {icon}
        <div className="ml-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
            <p className={`text-2xl font-bold ${colorClass}`}>
                {amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
        </div>
    </div>
);


export const ExpensesView: React.FC<ExpensesViewProps> = ({ data, setData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { currentIncomes, currentExpenses } = useMemo(() => {
    const monthData = data[year]?.[month];
    return {
      currentIncomes: monthData?.income || [],
      currentExpenses: monthData?.expenses || [],
    };
  }, [data, year, month]);
  
  const updateMonthData = (updates: Partial<MonthlyData>) => {
    setData(prevData => {
      const currentMonthData = prevData[year]?.[month] || { income: [], expenses: [], savings: [] };
      return {
        ...prevData,
        [year]: {
          ...prevData[year],
          [month]: {
            ...currentMonthData,
            ...updates,
          },
        },
      };
    });
  };

  useEffect(() => {
    if (!data[year] || !data[year][month]) {
      const prevMonthDate = new Date(year, month - 1);
      const prevYear = prevMonthDate.getFullYear();
      const prevMonth = prevMonthDate.getMonth();
      const prevMonthData = data[prevYear]?.[prevMonth];
      
      const initialMonthData: MonthlyData = {
        income: prevMonthData?.income?.map(i => ({...i, amount: 0})) || [],
        expenses: prevMonthData?.expenses
          ? prevMonthData.expenses.map(e => ({...e, amount: null, subExpenses: []}))
          : INITIAL_EXPENSES,
        // FIX: Replaced `prevData` with `data` as `prevData` is not defined in this scope.
        savings: data[year]?.[month]?.savings || [],
      };
      
      updateMonthData(initialMonthData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const updateExpense = (updatedExpense: Expense) => {
    const newExpenses = currentExpenses.map(e => e.id === updatedExpense.id ? updatedExpense : e);
    updateMonthData({ expenses: newExpenses });
  };
  
  const addExpense = (category: 'fixed' | 'variable') => {
    const newExpense: Expense = { id: nanoid(), name: 'Nuevo Gasto', icon: 'Default', amount: null, subExpenses: [], isCustom: true, category };
    updateMonthData({ expenses: [...currentExpenses, newExpense] });
  };

  const deleteExpense = (expenseId: string) => {
    updateMonthData({ expenses: currentExpenses.filter(e => e.id !== expenseId) });
  };
  
  const addIncomeSource = () => {
    const newSource: IncomeSource = { id: nanoid(), source: '', amount: 0 };
    updateMonthData({ income: [...currentIncomes, newSource] });
  };

  const updateIncomeSource = (id: string, field: 'source' | 'amount', value: string | number) => {
    const newIncomes = currentIncomes.map(inc => 
      inc.id === id ? { ...inc, [field]: value } : inc
    );
    updateMonthData({ income: newIncomes });
  };

  const deleteIncomeSource = (id: string) => {
    updateMonthData({ income: currentIncomes.filter(inc => inc.id !== id) });
  };
  
  const { fixedExpenses, variableExpenses, totalIncome, totalExpenses, balance } = useMemo(() => {
    const fixed = currentExpenses.filter(e => e.category === 'fixed');
    const variable = currentExpenses.filter(e => e.category === 'variable');
    const incomeTotal = currentIncomes.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const expenseTotal = currentExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    return {
      fixedExpenses: fixed,
      variableExpenses: variable,
      totalIncome: incomeTotal,
      totalExpenses: expenseTotal,
      balance: incomeTotal - expenseTotal,
    };
  }, [currentIncomes, currentExpenses]);

  return (
    <div className="space-y-6">
      <MonthNavigator currentDate={currentDate} setCurrentDate={setCurrentDate} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold">Ingresos</h2>
            {currentIncomes.map(income => (
              <div key={income.id} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Fuente (ej: Salario)"
                  value={income.source}
                  onChange={(e) => updateIncomeSource(income.id, 'source', e.target.value)}
                  className="flex-grow p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-primary focus:border-primary"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={income.amount}
                    onChange={(e) => updateIncomeSource(income.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-32 text-right pr-3 pl-7 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-primary focus:border-primary"
                  />
                </div>
                <button onClick={() => deleteIncomeSource(income.id)} className="text-gray-400 hover:text-danger p-2 rounded-full transition-colors"><TrashIcon className="h-5 w-5"/></button>
              </div>
            ))}
            <button onClick={addIncomeSource} className="w-full flex items-center justify-center py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <PlusIcon className="h-5 w-5 mr-2" /> Añadir Fuente de Ingreso
            </button>
          </div>
          
          <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">Gastos Fijos</h2>
            {fixedExpenses.map(exp => <ExpenseCategory key={exp.id} expense={exp} onUpdate={updateExpense} onDelete={deleteExpense} />)}
            <button onClick={() => addExpense('fixed')} className="w-full flex items-center justify-center py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <PlusIcon className="h-5 w-5 mr-2" /> Añadir Gasto Fijo
            </button>
          </div>
          <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">Gastos Variables</h2>
            {variableExpenses.map(exp => <ExpenseCategory key={exp.id} expense={exp} onUpdate={updateExpense} onDelete={deleteExpense} />)}
            <button onClick={() => addExpense('variable')} className="w-full flex items-center justify-center py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <PlusIcon className="h-5 w-5 mr-2" /> Añadir Gasto Variable
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold">Resumen del Mes</h2>
            <SummaryCard title="Total Ingresos" amount={totalIncome} icon={<CashIcon className="h-8 w-8 text-success"/>} colorClass="text-success" />
            <SummaryCard title="Total Gastos" amount={totalExpenses} icon={<BillIcon className="h-8 w-8 text-danger"/>} colorClass="text-danger" />
            <SummaryCard title="Balance" amount={balance} icon={<ScaleIcon className="h-8 w-8 text-primary"/>} colorClass={balance >= 0 ? 'text-success' : 'text-danger'} />
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 text-center">Distribución de Gastos</h3>
                <ExpensesChart expenses={currentExpenses} total={totalExpenses} />
            </div>
        </div>
      </div>
    </div>
  );
};