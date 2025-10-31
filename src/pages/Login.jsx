// src/pages/LoginPage.jsx

import { AlertTriangle, Lock, Mail } from 'lucide-react'; // Import icons
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth)
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      console.log(formData)
      const response = await authAPI.login(formData.email, formData.password);
      console.log(response)
      setAuth(response.data.user, response.data.token)
      navigate("/dashboard")

    } catch (error) {
      console.log(error.response)
      setError({ submit: error.response?.data?.message || "Login failed" })
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel rounded-3xl p-8 md:p-12 w-full max-w-md border border-white/10 shadow-lg relative overflow-hidden">
        {/* Decorative elements for the theme */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full filter blur-3xl"></div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to your Money Manager account
        </p>
        {
          error.submit && (
            <div
              className="glass-panel flex items-center gap-3 p-4 rounded-lg border border-red-500/40 mb-4"
              role="alert"
            >
              <AlertTriangle className="text-red-400 h-5 w-5 flex-shrink-0" />
              <span className="text-red-400 text-sm font-medium">
                {error.submit}
              </span>
            </div>
          )}
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          {/* Email Input */}
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200"
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end text-sm">
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          Don't have an account?{' '}
          <a href="/signup" className="text-green-400 hover:text-green-300 transition-colors">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;