// src/pages/FilterPage.jsx
"use client"

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { categoryAPI, filterAPI } from "../services/api"; // The filter API we added
import { useAuthStore } from "../store/authStore";

function Filter() {
  // State for the filter form inputs
  const [filters, setFilters] = useState({
    type: 'all', // 'all', 'income', or 'expense'
    startDate: '',
    endDate: '',
    keyword: '',
    sortField: 'date',
    sortOrder: 'desc',
  });

  // State for the results, loading, and categories
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuthStore();

  // Fetch categories once on component mount for display purposes
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch filtered data. Please try again.");
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryDetails = (id) => {
    return categories.find(cat => cat.id === id) || { name: "N/A", icon: "❓" };
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]); // Clear previous results



    try {
      if (filters.type === 'all') {
        // If 'all', make two separate API calls and combine the results
        const incomeFilters = { ...filters, type: 'income' };
        const expenseFilters = { ...filters, type: 'expense' };

        const [incomeResponse, expenseResponse] = await Promise.all([
          filterAPI.filterTransactions(incomeFilters),
          filterAPI.filterTransactions(expenseFilters)
        ]);

        // Add a 'type' property to each object before combining
        const allIncomes = incomeResponse.data.map(item => ({ ...item, type: 'income' }));
        const allExpenses = expenseResponse.data.map(item => ({ ...item, type: 'expense' }));

        const combined = [...allIncomes, ...allExpenses];

        // Sort the combined array client-side since they came from different calls
        combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        setResults(combined);

      } else {
        // If 'income' or 'expense', make a single API call
        const response = await filterAPI.filterTransactions(filters);
        // Add the type property for consistent rendering
        const typedResults = response.data.map(item => ({ ...item, type: filters.type }));
        setResults(typedResults);
      }
    } catch (error) {
      console.error("Error filtering transactions:", error);
      alert("Failed to fetch filtered data. Please try again.");
      if (error.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-5xl bg-muted p-6 md:p-8 rounded-lg border border-slate-800">
          <h1 className="text-2xl font-bold text-slate-100 mb-6">Filter Transactions</h1>

          {/* Filter Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-8">
            {/* Type, StartDate, EndDate, Keyword, Sort, Order */}
            <div>
              <label className="text-xs text-slate-400">Type</label>
              <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 mt-1">
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Start Date</label>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-slate-400">End Date</label>
              <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 mt-1" />
            </div>
            <div className="lg:col-span-2">
              <label className="text-xs text-slate-400">Keyword</label>
              <input type="text" name="keyword" placeholder="Search by source..." value={filters.keyword} onChange={handleFilterChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 mt-1" />
            </div>
            {/* Add Sort Fields if needed */}
            <button type="submit" className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-2 px-4 rounded-lg col-span-1 md:col-span-2 lg:col-span-2">
              <Search size={20} /> Search
            </button>
          </form>

          {/* Results Table */}
          <div className="mt-6 border-t border-slate-700">
            {loading ? (
              <div className="text-center py-8"><div className="w-8 h-8 border-2 border-slate-600 border-t-sky-400 rounded-full animate-spin mx-auto"></div><p className="mt-2 text-slate-400">Filtering...</p></div>
            ) : results.length === 0 ? (
              <div className="text-center py-8 text-slate-400">No results found. Adjust your filters and try again.</div>
            ) : (
              results.map(item => {
                const category = getCategoryDetails(item.categoryId);
                const isIncome = item.type === 'income';
                return (
                  <div key={`${item.type}-${item.id}`} className="grid grid-cols-[60px_1fr_150px_150px_150px] items-center gap-4 px-4 py-4 border-t border-slate-800">
                    <span className="text-2xl flex items-center justify-center">{category.icon}</span>
                    <p className="text-slate-200 font-medium truncate">{item.name || item.incomeSource}</p>
                    <p className="text-slate-300">{category.name}</p>
                    <p className="text-slate-400">{new Date(item.date).toLocaleDateString()}</p>
                    <p className={`font-semibold ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
                      {isIncome ? '+' : '-'}${item.amount.toFixed(2)}
                    </p>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Filter;