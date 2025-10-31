// src/pages/SignupPage.jsx

import { AlertTriangle, CheckCircle2, Lock, Mail, User } from "lucide-react"; // Import icons
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError({ confirmPassword: "Passwords do not match" });
      setLoading(false);
      return;
    } else {
      try {
        console.log(formData)
        const response = await authAPI.signup(
          formData.email,
          formData.password,
          formData.name
        );
        console.log(response);
        toast.success("Registration successful! Redirecting to login page...");
     
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log("Status" + error.status)
        console.log(error);
        setError({ submit: error.response?.data?.message || "Signup Failed" });
      } finally {
        setLoading(false);
      }
    }
  };

  const errorM = error.confirmPassword ? error.confirmPassword : error.submit;
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel rounded-3xl p-8 md:p-12 w-full max-w-md border border-white/10 shadow-lg relative overflow-hidden">
        {/* Decorative elements for the theme */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full filter blur-3xl"></div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Join Money Manager
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Create your account to get started
        </p>

        
        {errorM && (
          <div
            className="glass-panel flex items-center gap-3 p-4 rounded-lg border border-red-500/40 mb-4"
            role="alert"
          >
            <AlertTriangle className="text-red-400 h-5 w-5 flex-shrink-0" />
            <span className="text-red-400 text-sm font-medium">{errorM}</span>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="relative">
            <User
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200"
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
