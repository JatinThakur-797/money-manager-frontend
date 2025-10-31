// src/components/Budget.jsx
import { useMemo } from 'react';

// A simple currency formatter
const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
});

// A map of category names to colors for the chart
const categoryColors =  {
    'Rent': '#3b82f6', // blue
    'Fees Payment': '#10b981',    // green
    'Transport': '#a855f7', // purple
    'Entertainment': '#f59e0b', // amber
    'Utilities': '#ef4444', // red
    'Other': '#6b7280', // gray
};

const Budget = ({ expenses = [] }) => {
    // useMemo will recalculate only when the expenses prop changes
    const { total, categories } = useMemo(() => {
        const categoryTotals = {};
        let total = 0;

        expenses.forEach(expense => {
            // Assuming each expense has a `categoryName` property.
            // If not, you'll need to fetch categories and match by `categoryId`.
            const categoryName = expense.categoryName || 'Other';

            categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + expense.amount;
            total += expense.amount;
        });

        const sortedCategories = Object.entries(categoryTotals)
            .map(([name, amount]) => ({ name, amount }))
            .sort((a, b) => b.amount - a.amount);

        return { total, categories: sortedCategories };
    }, [expenses]);

    const circumference = 2 * Math.PI * 40; // 2 * pi * radius
    let accumulatedOffset = 0;

    return (
        <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold tracking-tight mb-6">Expense Categories</h3>
            <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                        {categories.map((cat, index) => {
                            const percentage = (cat.amount / total) * 100;
                            const strokeDasharray = (circumference * percentage) / 100;
                            const strokeDashoffset = -accumulatedOffset;
                            accumulatedOffset += strokeDasharray;

                            return (
                                <circle
                                    key={index}
                                    cx="50" cy="50" r="40"
                                    fill="none"
                                    stroke={categoryColors[cat.name] || categoryColors['Other']}
                                    strokeWidth="12"
                                    strokeDasharray={`${strokeDasharray} ${circumference}`}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-2xl font-semibold">{currencyFormatter.format(total)}</div>
                        <div className="text-xs text-gray-500">Total Expenses</div>
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                {categories.slice(0, 4).map((cat, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[cat.name] || categoryColors['Other'] }}></div>
                            <span className="text-sm text-gray-300">{cat.name}</span>
                        </div>
                        <span className="text-sm font-medium">{currencyFormatter.format(cat.amount)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Budget;