import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Expense } from '../types';

interface ExpensesChartProps {
  expenses: Expense[];
  total: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#82ca9d'];

const CustomTooltip = ({ active, payload, total }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = total > 0 ? ((payload[0].value / total) * 100).toFixed(1) : 0;
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
        <p className="font-bold text-gray-800 dark:text-white">{`${data.name}: ${data.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}`}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{`Representa el ${percentage}% del total`}</p>
      </div>
    );
  }
  return null;
};

export const ExpensesChart: React.FC<ExpensesChartProps> = ({ expenses, total }) => {
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-gray-500">No hay datos de gastos para mostrar.</p>
      </div>
    );
  }

  const chartData = expenses
    .filter(e => e.amount && e.amount > 0)
    .map(e => ({ name: e.name, value: e.amount || 0 }));
    
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip total={total} />} />
          <Legend wrapperStyle={{fontSize: "12px"}} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
