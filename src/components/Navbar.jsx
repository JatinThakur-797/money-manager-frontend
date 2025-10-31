import { Bell, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
    const { logout, isAuthenticated } = useAuthStore()
    const navigate = useNavigate();
    const handleLogout = () => {

        logout();
        alert("Logout Successfull");
        navigate("/")


    }
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-12">
                        <Link to={"/home"}><div className="text-xl font-semibold tracking-tighter text-white">Money_Manager</div></Link>
                        <div className="hidden md:flex items-center space-x-8">
                            {!isAuthenticated ? (
                                <>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</a>
                                </>)
                                :
                                (<>
                                    <Link to={"/dashboard"} className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                                    <Link to={"/expenses"} className="text-sm text-gray-400 hover:text-white transition-colors">Expenses</Link>
                                    <Link to={"/income"} className="text-sm text-gray-400 hover:text-white transition-colors">Income</Link>
                                    <Link to={"/categories"} className="text-sm text-gray-400 hover:text-white transition-colors">Category</Link>
                                    <Link to={"/filter"} className="text-sm text-gray-400 hover:text-white transition-colors">Filter</Link>
                                </>)

                            }

                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                            <Search size={18} />
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                            <Bell size={18} />
                        </button>

                        {!isAuthenticated ? (
                            <>
                                <Link to="/login"><button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">Login</button></Link>
                                <Link to="/signup"><button className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">Sign Up</button></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/profile"><button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">Welcome</button></Link>
                                <button className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" onClick={handleLogout}>Logout</button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;