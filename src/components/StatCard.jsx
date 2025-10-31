import { ArrowDown, ArrowUp, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const icons = {
    income: <TrendingUp size={20} className="text-blue-500" />,
    expenses: <TrendingDown size={20} className="text-red-500" />,
    balance: <Wallet size={20} className="text-green-500" />,
};

const bgColors = {
    income: 'bg-blue-500/10',
    expenses: 'bg-red-500/10',
    balance: 'bg-green-500/10',
};

const StatCard = ({ type, title, amount, percentage }) => {
    const isPositive = percentage >= 0;

    return (
        <div className="glass-panel rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${bgColors[type]} flex items-center justify-center`}>
                    {icons[type]}
                </div>
                <span className={`text-xs flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {Math.abs(percentage)}%
                </span>
            </div>
            <div className="text-sm text-gray-400 mb-1">{title}</div>
            <div className="text-3xl font-semibold tracking-tight">{amount}</div>
        </div>
    );
};

export default StatCard;