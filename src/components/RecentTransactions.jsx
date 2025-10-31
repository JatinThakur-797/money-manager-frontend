// src/components/RecentTransactions.jsx
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import currencyFormatter from './currencyFormatter';
// This component now receives transactions as a prop from the Dashboard
const RecentTransactions = ({ transactions = [] }) => {
    return (
        <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold tracking-tight">Recent Transactions</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
            </div>
            <div className="space-y-3">
                {transactions.length > 0 ? (
                    transactions.map((transaction) => {
                        const isIncome = transaction.type === 'income';
                        return (
                            <div key={`${transaction.type}-${transaction.id}`} className="flex items-center justify-between p-3 rounded-xl border border-white/5 card-hover">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-xl ${isIncome ? 'bg-green-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                                        {isIncome
                                            ? <ArrowDownLeft size={18} className="text-green-500" />
                                            : <ArrowUpRight size={18} className="text-red-500" />
                                        }
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{transaction.name}</div>
                                        <div className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className={`text-sm font-semibold ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
                                    {isIncome ? '+' : '-'}{currencyFormatter.format(transaction.amount.toFixed(2)) }
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-400 py-4">No recent transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;