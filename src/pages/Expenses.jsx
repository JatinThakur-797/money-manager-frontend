"use client";

import { DollarSign, PlusCircle, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import currencyFormatter from "../components/currencyFormatter";
import { categoryAPI, expenseAPI } from "../services/api";
import { useAuthStore } from "../store/authStore";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState("");
  const { logout } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [expenseResponse, categoryResponse] = await Promise.all([
          expenseAPI.getAll(),
          categoryAPI.getAll(),
        ]);

        setExpenses(expenseResponse.data);
        const expenseCategories = categoryResponse.data.filter(
          (cat) => cat.type === "expense"
        );
        setCategories(expenseCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Could not fetch expense data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [logout]);

  const getCategoryDetails = (id) => {
    return (
      categories.find((cat) => cat.id === id) || { name: "N/A", icon: "❓" }
    );
  };

  const handleOpenModal = () => {
    setName("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategoryId(categories.length > 0 ? categories[0].id : "");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => setIsConfirmModalOpen(false);

  const handleSaveExpense = async (e) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }
    const expenseDTO = { name, amount: parseFloat(amount), date, categoryId };
    try {
      await expenseAPI.create(expenseDTO);
      const response = await expenseAPI.getAll();
      setExpenses(response.data);
      toast.success("Expense saved successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error saving expense:", error);
      toast.error("Failed to save expense. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!expenseToDelete) return;
    try {
      await expenseAPI.delete(expenseToDelete.id);
      setExpenses(expenses.filter((exp) => exp.id !== expenseToDelete.id));
      toast.success("Expense record deleted.");
      handleCloseConfirmModal();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-5xl bg-muted p-6 md:p-8 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-100">
              Manage Expenses
            </h1>
            <button
              onClick={handleOpenModal}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
            >
              <PlusCircle size={20} />
              Add New Expense
            </button>
          </div>
          <div className="mt-6 border-t border-slate-700">
            <div className="grid grid-cols-[60px_1fr_150px_150px_150px_100px] items-center gap-4 px-4 py-2">
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider text-center">
                Icon
              </h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider">
                Source
              </h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider">
                Category
              </h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider">
                Date
              </h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider">
                Amount
              </h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider text-right">
                Actions
              </h3>
            </div>
            {loading ? (
              <div className="text-center py-8 border-t border-slate-800">
                <div className="w-8 h-8 border-2 border-slate-600 border-t-sky-400 rounded-full animate-spin mx-auto"></div>
                <p className="mt-2 text-slate-400">Loading expenses...</p>
              </div>
            ) : expenses.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border-t border-slate-800">
                No expenses recorded for this month.
              </div>
            ) : (
              expenses.map((expense) => {
                const category = getCategoryDetails(expense.categoryId);
                return (
                  <div
                    key={expense.id}
                    className="grid grid-cols-[60px_1fr_150px_150px_150px_100px] items-center gap-4 px-4 py-4 border-t border-slate-800"
                  >
                    <span className="text-2xl flex items-center justify-center">
                      {category.icon}
                    </span>
                    <p className="text-slate-200 font-medium truncate">
                      {expense.name}
                    </p>
                    <p className="text-slate-300">{category.name}</p>
                    <p className="text-slate-400">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                    <p className="text-red-400 font-semibold">
                      {currencyFormatter.format(expense.amount)}
                    </p>
                    <div className="flex items-center gap-4 justify-end">
                      <button
                        onClick={() => handleDeleteClick(expense)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        aria-label={`Delete ${expense.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
          <div className="bg-muted w-full max-w-md p-6 rounded-lg border border-slate-700 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-100">
                Add New Expense
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveExpense} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Expense Source
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-slate-400" />
                  </div>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md p-2 pl-10 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-slate-700 text-slate-100 py-2 px-4 rounded-md hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-shadow"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
          <div className="bg-muted w-full max-w-md p-6 rounded-lg border border-slate-700 mx-4">
            <h2 className="text-xl font-bold text-slate-100">
              Confirm Deletion
            </h2>
            <p className="text-slate-400 my-4">
              Are you sure you want to delete this expense record? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleCloseConfirmModal}
                className="bg-slate-700 text-slate-100 py-2 px-4 rounded-md hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Expense;
