"use client"

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Pencil, PlusCircle, SmilePlus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { categoryAPI } from "../services/api";
import { useAuthStore } from "../store/authStore";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("expense");
  const [loading, setLoading] = useState(true);
  const [categoryIcon, setCategoryIcon] = useState("💰");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const { logout } = useAuthStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryAPI.getAll();
        setCategories(response.data);
       
      } catch (error) {
        toast.error("Could not fetch categories.");
        if (error.status === 403 || error.status === 401) {
          alert("Session is expired. Please Login again.");
          logout();
        }
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    setCurrentCategory(category);
    setCategoryName(category ? category.name : "");
    setCategoryType(category ? category.type : "expense");
    setCategoryIcon(category ? category.icon : "💰");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setCategoryName("");
    setCategoryType("expense");
    setCategoryIcon("💰");
    setIsPickerVisible(false);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: categoryName, type: categoryType, icon: categoryIcon };
      if (currentCategory) {
        await categoryAPI.update(currentCategory.id, payload);
        toast.success("Category updated successfully!");
      } else {
        await categoryAPI.create(payload);
        toast.success("Category created successfully!");
      }
      const response = await categoryAPI.getAll();

      setCategories(response.data);
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      handleCloseModal();
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await categoryAPI.delete(categoryToDelete.id);
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      handleCloseConfirmModal();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setCategoryIcon(emoji.native);
    setIsPickerVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-5xl bg-muted p-6 md:p-8 rounded-lg border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-100">Manage Categories</h1>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
            >
              <PlusCircle size={20} />
              Add New Category
            </button>
          </div>

          {/* --- FIXED: UNIFIED TABLE CONTAINER --- */}
          <div className="mt-6 border-t border-slate-700">
            {/* Table Header Row (Now always visible) */}
            <div className="grid grid-cols-[60px_1fr_150px_100px] items-center gap-4 px-4 py-2">
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider text-center">Icon</h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider">Category Name</h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider">Type</h3>
              <h3 className="font-semibold text-xs uppercase text-slate-400 tracking-wider text-right">Actions</h3>
            </div>

            {/* Table Body (This part is now conditional) */}
            {loading ? (
              <div className="text-center py-8 border-t border-slate-800">
                <div className="w-8 h-8 border-2 border-slate-600 border-t-sky-400 rounded-full animate-spin mx-auto"></div>
                <p className="mt-2 text-slate-400">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border-t border-slate-800">
                No categories found. Create your first category!
              </div>
            ) : (
              categories.map(category => (
                <div
                  key={category.id}
                  className="grid grid-cols-[60px_1fr_150px_100px] items-center gap-4 px-4 py-4 border-t border-slate-800"
                >
                  <span className="text-2xl flex items-center justify-center">{category.icon}</span>
                  <p className="text-slate-200 font-medium truncate">{category.name}</p>
                  <div className="flex justify-start">
                    <p className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${category.type === 'income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                      {category.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 justify-end">
                    <button onClick={() => handleOpenModal(category)} className="text-slate-400 hover:text-sky-400 transition-colors" aria-label={`Edit ${category.name}`}>
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDeleteClick(category)} className="text-slate-400 hover:text-red-500 transition-colors" aria-label={`Delete ${category.name}`}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* --- Add/Edit Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
          <div className="bg-muted w-full max-w-md p-6 rounded-lg border border-slate-700 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-100">
                {currentCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveCategory}>
              <label className="block text-sm font-medium text-slate-400 mb-2">Category Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <button type="button" onClick={() => setIsPickerVisible(!isPickerVisible)} className="text-xl p-1 rounded-full hover:bg-slate-700 transition-colors">
                    {categoryIcon ? categoryIcon : <SmilePlus size={22} className="text-slate-400" />}
                  </button>
                </div>
                <input id="categoryName" type="text" value={categoryName || ""} onChange={(e) => setCategoryName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-md p-2 pl-12 focus:ring-2 focus:ring-sky-500 focus:outline-none" required autoFocus />
              </div>

              {isPickerVisible && (
                <div className="absolute z-10 mt-2">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                </div>
              )}

              <label className="block text-sm font-medium text-slate-400 mt-4 mb-2">Category Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="categoryType" value="expense" checked={categoryType === 'expense'} onChange={(e) => setCategoryType(e.target.value)} className="form-radio text-sky-500 bg-slate-700 border-slate-600 focus:ring-sky-500" /><span className="text-slate-200">Expense</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="categoryType" value="income" checked={categoryType === 'income'} onChange={(e) => setCategoryType(e.target.value)} className="form-radio text-sky-500 bg-slate-700 border-slate-600 focus:ring-sky-500" /><span className="text-slate-200">Income</span></label>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={handleCloseModal} className="bg-slate-700 text-slate-100 py-2 px-4 rounded-md hover:bg-slate-600 transition-colors">Cancel</button>
                <button type="submit" className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-shadow">{currentCategory ? "Update Category" : "Save Category"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Confirm Delete Modal --- */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
          <div className="bg-muted w-full max-w-md p-6 rounded-lg border border-slate-700 mx-4">
            <h2 className="text-xl font-bold text-slate-100">Confirm Deletion</h2>
            <p className="text-slate-400 my-4">Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={handleCloseConfirmModal} className="bg-slate-700 text-slate-100 py-2 px-4 rounded-md hover:bg-slate-600 transition-colors">Cancel</button>
              <button onClick={handleConfirmDelete} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Categories;