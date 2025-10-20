
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Saving } from '../types';
import { TrashIcon, CheckIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from './icons/Icons';

interface SavingsCardProps {
  saving: Saving;
  prevMonthSavings: Saving[];
  onUpdate: (saving: Saving) => void;
  onDelete: (savingId: string) => void;
}

const ComparisonIndicator: React.FC<{ diff: number, percentage: number }> = ({ diff, percentage }) => {
    if (diff === 0) return null;

    const isPositive = diff > 0;
    const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
    const bgColorClass = isPositive ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50';
    const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;

    return (
        <div className={`mt-2 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${colorClass} ${bgColorClass}`}>
            <Icon className="h-3 w-3" />
            <span>
                {diff.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', signDisplay: 'always' })}
            </span>
            <span>({percentage.toFixed(1)}%) vs mes anterior</span>
        </div>
    );
};

export const SavingsCard: React.FC<SavingsCardProps> = ({ saving, prevMonthSavings, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSaving, setEditedSaving] = useState(saving);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedSaving(saving);
  }, [saving]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const comparison = useMemo(() => {
      const prevSaving = prevMonthSavings.find(s => s.source.toLowerCase() === saving.source.toLowerCase());
      if (!prevSaving || prevSaving.amount === 0) return null;
      
      const diff = saving.amount - prevSaving.amount;
      const percentage = (diff / prevSaving.amount) * 100;
      return { diff, percentage };
  }, [saving, prevMonthSavings]);

  const handleSave = () => {
    if (editedSaving.source.trim() === '') {
        editedSaving.source = 'Ahorro sin nombre';
    }
    onUpdate(editedSaving);
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedSaving(prev => ({
          ...prev,
          [name]: name === 'amount' ? parseFloat(value) || 0 : value
      }));
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between transition-shadow hover:shadow-lg">
      <div>
        {isEditing ? (
          <input
            type="text"
            name="source"
            value={editedSaving.source}
            onChange={handleInputChange}
            className="text-lg font-semibold bg-transparent border-b-2 border-primary w-full focus:outline-none mb-2"
          />
        ) : (
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{saving.source}</h3>
        )}

        {isEditing ? (
            <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                <input
                    ref={inputRef}
                    type="number"
                    name="amount"
                    value={editedSaving.amount}
                    onChange={handleInputChange}
                    className="text-2xl font-bold w-full bg-transparent border-b-2 border-primary focus:outline-none pl-7"
                />
            </div>
        ) : (
            <p className="text-3xl font-bold text-primary dark:text-primary-light my-2">
                {saving.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
        )}
        
        {!isEditing && comparison && <ComparisonIndicator diff={comparison.diff} percentage={comparison.percentage} />}

      </div>
      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {isEditing ? (
          <button onClick={handleSave} className="p-2 text-success hover:bg-success-light rounded-full transition-colors">
            <CheckIcon className="h-5 w-5" />
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <PencilIcon className="h-5 w-5" />
          </button>
        )}
        <button onClick={() => onDelete(saving.id)} className="p-2 text-danger hover:bg-danger-light rounded-full transition-colors">
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
