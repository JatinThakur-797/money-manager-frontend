import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Filter from "./pages/Filter";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const loadBackend = async () => {
    try {
      // ✅ FIX: Use the environment variable for the health check URL
      const healthCheckUrl = `${import.meta.env.VITE_API_BASE_URL}/health`;
      console.log("Pinging backend at: " + healthCheckUrl);

      const response = await fetch(healthCheckUrl);

      if (!response.ok) {
        throw new Error(`Backend health check failed with status: ${response.status}`);
      }

      console.log("Backend is healthy:", response);
    } catch (error) {
      console.error("Backend loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackend();
  }, []);


  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
