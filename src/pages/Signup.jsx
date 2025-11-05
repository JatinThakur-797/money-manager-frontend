import { AlertTriangle, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // State specifically for password mismatch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(""); // Clear password error on change
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await authAPI.signup(
        formData.email,
        formData.password,
        formData.fullName
      );

      toast.success("Registration successful! Activate account by you mail");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup Failed. Please try again.";
      toast.error(errorMessage);
      console.error("Signup error:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel rounded-3xl p-8 md:p-12 w-full max-w-md border border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full filter blur-3xl"></div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Join Money Manager
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Create your account to get started
        </p>

        {passwordError && (
          <div
            className="glass-panel flex items-center gap-3 p-4 rounded-lg border border-red-500/40 mb-4"
            role="alert"
          >
            <AlertTriangle className="text-red-400 h-5 w-5 flex-shrink-0" />
            <span className="text-red-400 text-sm font-medium">{passwordError}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form inputs remain the same */}
          <div className="relative">
            <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" name="fullName" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200" onChange={handleChange} required />
          </div>
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" name="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200" onChange={handleChange} required />
          </div>
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" name="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200" onChange={handleChange} required />
          </div>
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all duration-200" onChange={handleChange} required />
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-400 hover:text-blue-300 transition-colors">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;