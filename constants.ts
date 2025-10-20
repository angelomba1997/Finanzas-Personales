import type { AppData, Expense } from './types';
import { nanoid } from 'nanoid';

export const INITIAL_EXPENSES: Expense[] = [
  { id: nanoid(), name: 'Alquiler / Hipoteca', icon: 'Home', amount: null, subExpenses: [], isCustom: false, category: 'fixed' },
  { id: nanoid(), name: 'Luz', icon: 'Bolt', amount: null, subExpenses: [], isCustom: false, category: 'fixed' },
  { id: nanoid(), name: 'Agua', icon: 'WaterDrop', amount: null, subExpenses: [], isCustom: false, category: 'fixed' },
  { id: nanoid(), name: 'Seguro de moto', icon: 'Motorcycle', amount: null, subExpenses: [], isCustom: false, category: 'fixed' },
  { id: nanoid(), name: 'Netflix', icon: 'Tv', amount: null, subExpenses: [], isCustom: false, category: 'fixed' },
  { id: nanoid(), name: 'Restaurantes', icon: 'Restaurant', amount: null, subExpenses: [], isCustom: false, category: 'variable' },
];

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const DEFAULT_DATA: AppData = {};