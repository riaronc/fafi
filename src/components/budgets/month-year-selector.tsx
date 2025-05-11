"use client";

import React from 'react';

interface MonthYearSelectorProps {
  currentYear: number;
  onYearChange: (newYear: number) => void;
  disabled?: boolean;
}

const generateYearOptions = (currentYear: number) => {
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
};

export default function MonthYearSelector({
  currentYear,
  onYearChange,
  disabled = false
}: MonthYearSelectorProps) {
  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(parseInt(event.target.value, 10));
  };

  const yearOptions = generateYearOptions(currentYear);

  return (
    <select
      value={currentYear}
      onChange={handleYearSelect}
      disabled={disabled}
      className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
    >
      {yearOptions.map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  );
} 