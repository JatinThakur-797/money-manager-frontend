"use client";

import { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';

// Import all your display components
import AnalyticsChart from "../components/AnalyticsChart";
import Budget from "../components/Budget";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RecentTransactions from "../components/RecentTransactions";
import StatCard from "../components/StatCard";
import currencyFormatter from '../components/currencyFormatter';


function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuthStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await dashboardAPI.getAll();
                setDashboardData(response.data);
            } catch (error) {
                if (error.response?.status === 403 || error.response?.status === 401) {
                    alert("Session is expired. Please Login again.");
                    logout();
                }
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen text-white antialiased flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-slate-600 border-t-sky-400 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="min-h-screen text-white antialiased flex items-center justify-center bg-background">
                <Navbar />
                <p className="mt-24">Could not load dashboard data. Please try refreshing the page.</p>
            </div>
        );
    }



    return (
        <div className="min-h-screen text-white antialiased bg-background">
            <Navbar />
            <main className="pt-24 pb-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight mb-4 glow-text">
                            Financial Overview
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl">
                            Your real-time financial summary.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            type="income"
                            title="Total Income"
                            amount={currencyFormatter.format(dashboardData.totalIncome)}
                            percentage={0} // Backend does not provide this yet
                        />
                        <StatCard
                            type="expenses"
                            title="Total Expenses"
                            amount={currencyFormatter.format(dashboardData.totalExpense)}
                            percentage={0} // Backend does not provide this yet
                        />
                        <StatCard
                            type="balance"
                            title="Net Balance"
                            amount={currencyFormatter.format(dashboardData.totalBalance)}
                            percentage={0} // Backend does not provide this yet
                        />
                    </div>

                    {/* This component remains static until backend provides historical data */}
                    <AnalyticsChart
                        totalIncome={dashboardData.totalIncome}
                        totalExpense={dashboardData.totalExpense}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center align-center">
                        <Budget
                            totalIncome={dashboardData.totalIncome}
                            totalExpense={dashboardData.totalExpense}
                            totalBalance={dashboardData.totalBalance}
                        />
                        <RecentTransactions transactions={dashboardData.recentTransactions} />
                    </div>

                    <CTA />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;