export interface IncomeSource {
  id: string;
  source: string;
  amount: number;
}

export interface SubExpense {
  id: string;
  name: string;
  amount: number;
}

export type ExpenseCategoryType = 'fixed' | 'variable';

export interface Expense {
  id: string;
  name: string;
  icon: string;
  amount: number | null;
  subExpenses: SubExpense[];
  isCustom: boolean;
  category: ExpenseCategoryType;
}

export interface Saving {
  id: string;
  source: string;
  amount: number;
}

export interface MonthlyData {
  income: IncomeSource[];
  expenses: Expense[];
  savings: Saving[];
}

export interface AppData {
  [year: number]: {
    [month: number]: MonthlyData;
  };
}
