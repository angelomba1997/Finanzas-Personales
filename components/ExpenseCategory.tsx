
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { nanoid } from 'nanoid';
import type { Expense, SubExpense } from '../types';
import { getIcon, PlusIcon, TrashIcon, ChevronDownIcon, PencilIcon } from './icons/Icons';

interface ExpenseCategoryProps {
  expense: Expense;
  onUpdate: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
}

export const ExpenseCategory: React.FC<ExpenseCategoryProps> = ({ expense, onUpdate, onDelete }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [showSubExpenses, setShowSubExpenses] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  const totalSubExpenses = useMemo(() => 
    expense.subExpenses.reduce((sum, sub) => sum + sub.amount, 0),
    [expense.subExpenses]
  );
  
  useEffect(() => {
    if (expense.subExpenses.length > 0) {
      onUpdate({ ...expense, amount: totalSubExpenses });
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSubExpenses, expense.subExpenses.length]);
  
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  const hasAmount = expense.amount !== null && expense.amount > 0;
  const hasSubExpenses = expense.subExpenses.length > 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? null : parseFloat(e.target.value);
    onUpdate({ ...expense, amount: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...expense, name: e.target.value });
  };
  
  const handleNameBlur = () => {
    if (!expense.name.trim()) {
        onUpdate({ ...expense, name: 'Gasto sin nombre' });
    }
    setIsEditingName(false);
  }

  const addSubExpense = () => {
    const newSub: SubExpense = { id: nanoid(), name: 'Sub-gasto', amount: 0 };
    onUpdate({ ...expense, subExpenses: [...expense.subExpenses, newSub] });
    if (!showSubExpenses) setShowSubExpenses(true);
  };

  const updateSubExpense = (id: string, updatedSub: Partial<SubExpense>) => {
    const updatedSubs = expense.subExpenses.map(sub => 
      sub.id === id ? { ...sub, ...updatedSub } : sub
    );
    onUpdate({ ...expense, subExpenses: updatedSubs });
  };

  const deleteSubExpense = (id: string) => {
    const filteredSubs = expense.subExpenses.filter(sub => sub.id !== id);
    onUpdate({ ...expense, subExpenses: filteredSubs });
  };

  const Icon = getIcon(expense.icon);
  
  return (
    <div className={`p-4 rounded-lg shadow-sm transition-all duration-300 ${hasAmount ? 'bg-success-light dark:bg-opacity-20' : 'bg-white dark:bg-gray-800'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className={`h-6 w-6 ${hasAmount ? 'text-success' : 'text-gray-400'}`} />
          {isEditingName && expense.isCustom ? (
            <input
              ref={nameInputRef}
              type="text"
              value={expense.name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleNameBlur()}
              className="font-semibold text-lg bg-transparent border-b border-primary focus:outline-none"
            />
          ) : (
            <h3 className="font-semibold text-lg">{expense.name}</h3>
          )}

          {expense.isCustom && !isEditingName && (
            <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-primary transition-colors">
              <PencilIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
            <input
              type="number"
              placeholder="0.00"
              value={expense.amount ?? ''}
              onChange={handleAmountChange}
              disabled={hasSubExpenses}
              className={`w-28 text-right pr-3 pl-7 py-1.5 rounded-md border transition-colors ${hasSubExpenses ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' : 'bg-transparent border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary'}`}
            />
          </div>
          {expense.isCustom && (
            <button onClick={() => onDelete(expense.id)} className="text-gray-400 hover:text-danger p-1 rounded-full transition-colors"><TrashIcon className="h-5 w-5"/></button>
          )}
        </div>
      </div>
      
      {(hasSubExpenses || hasAmount) && (
        <div className="mt-3 flex justify-start items-center gap-4 text-sm">
          <button onClick={addSubExpense} className="flex items-center text-primary hover:underline">
            <PlusIcon className="h-4 w-4 mr-1" /> Detallar
          </button>
          {hasSubExpenses && (
             <button onClick={() => setShowSubExpenses(!showSubExpenses)} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary">
              <ChevronDownIcon className={`h-5 w-5 transition-transform ${showSubExpenses ? 'rotate-180' : ''}`} />
              {showSubExpenses ? 'Ocultar' : 'Mostrar'} detalles
            </button>
          )}
        </div>
      )}

      {showSubExpenses && hasSubExpenses && (
        <div className="mt-3 space-y-2 pl-8 border-l-2 border-gray-200 dark:border-gray-700 ml-3">
          {expense.subExpenses.map(sub => (
            <div key={sub.id} className="flex items-center gap-2 text-sm animate-fade-in">
              <input
                type="text"
                value={sub.name}
                onChange={(e) => updateSubExpense(sub.id, { name: e.target.value })}
                className="flex-grow bg-transparent p-1 rounded-md focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                <input
                  type="number"
                  value={sub.amount}
                  onChange={(e) => updateSubExpense(sub.id, { amount: parseFloat(e.target.value) || 0 })}
                  className="w-24 text-right pr-2 pl-5 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-primary focus:border-primary"
                />
              </div>
              <button onClick={() => deleteSubExpense(sub.id)} className="text-gray-400 hover:text-danger p-1 rounded-full transition-colors"><TrashIcon className="h-4 w-4"/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
