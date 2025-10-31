// src/components/Budget.jsx
import { useMemo } from 'react';

import currencyFormatter from './currencyFormatter';

const Budget = ({ totalIncome = 0, totalExpense = 0, totalBalance = 0 }) => {

    const { circumference, expenseStrokeOffset, expensePercentage } = useMemo(() => {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const percentage = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
        const offset = circumference - (percentage / 100) * circumference;
        return { circumference, expenseStrokeOffset: offset, expensePercentage: percentage };
    }, [totalIncome, totalExpense]);

    return (
        <div className="glass-panel rounded-2xl p-6 w-full"> {/* <-- Layout fix is here */}
            <h3 className="text-lg font-semibold tracking-tight mb-6">
                Financial Summary
            </h3>

            <div className="flex items-center justify-center mt-4">
                <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Track */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="12" />
                        {/* Total Income Ring (Green) */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset="0" style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))' }} />
                        {/* Total Expense Ring (Red) */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={expenseStrokeOffset} strokeLinecap="round" className="transition-all duration-700 ease-out" style={{ filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))' }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-xs text-gray-400">Net Balance</div>
                        <div className="text-2xl font-bold text-white mt-1">
                            {currencyFormatter.format(totalBalance)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-300">Total Income</span>
                    </div>
                    <span className="text-sm font-medium">{currencyFormatter.format(totalIncome)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div>
                            <span className="text-sm text-gray-300">Total Expense</span>
                            {/* NEW: Added percentage */}
                            <span className="text-xs text-red-400 ml-2">({expensePercentage.toFixed(1)}%)</span>
                        </div>
                    </div>
                    <span className="text-sm font-medium">{currencyFormatter.format(totalExpense)}</span>
                </div>
            </div>
        </div>
    );
};

export default Budget;