import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

// ✅ FIX: Add default values to the props.
// If totalIncome or totalExpense are not provided, they will default to 0.
const IncomeExpenseChart = ({ totalIncome = 0, totalExpense = 0 }) => {
    const data = [
        { name: "Income", income: totalIncome, expense: 0 },
        { name: "Expense", income: 0, expense: totalExpense },
    ];

    return (
        <div className="bg-[#0f172a] text-white p-4 rounded-xl shadow-md">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
                        itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Legend
                        wrapperStyle={{ color: "#e2e8f0" }}
                    />
                    <Bar dataKey="income" fill="#3b82f6" name="Total Income" barSize={50} />
                    <Bar dataKey="expense" fill="#ef4444" name="Total Expense" barSize={50} />
                </BarChart>
            </ResponsiveContainer>

            {/* Display Totals */}
            <div className="flex justify-around mt-4 text-xl font-semibold">
                {/* This code will now safely call .toLocaleString() on the number 0 instead of undefined */}
                <div className="text-blue-400">₹{totalIncome.toLocaleString()}</div>
                <div className="text-red-400">₹{totalExpense.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;