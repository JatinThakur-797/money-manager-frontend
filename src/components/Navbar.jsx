// src/components/Navbar.jsx

// --- Step 1: Import new hooks and icons ---
import { Bell, Menu, Search, X } from 'lucide-react'; // <-- Import Menu and X icons
import { useState } from 'react'; // <-- To manage the open/close state
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
    const { logout, isAuthenticated } = useAuthStore()
    const navigate = useNavigate();

    // --- Step 2: Add state to track if the mobile menu is open ---
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- State for the sidebar

    const handleLogout = () => {
        logout();
        toast.success("Logout Successful");
        navigate("/");
        setIsMobileMenuOpen(false); // <-- Close menu on logout
    }

    // --- Step 3: Create a helper component for mobile links ---
    // This makes the menu close automatically when you click a link
    const MobileNavLink = ({ to, children }) => (
        <Link
            to={to}
            onClick={() => setIsMobileMenuOpen(false)} // <-- Closes menu on click
            className="block py-4 px-6 text-2xl font-medium text-gray-300 hover:bg-slate-800 rounded-lg"
        >
            {children}
        </Link>
    );

    return (
        // Add 'relative' to the nav so the absolute sidebar works
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-12">
                        <Link to={"/home"}><div className="text-xl font-semibold tracking-tighter text-white">Money_Manager</div></Link>

                        {/* --- This is your original desktop navbar --- */}
                        <div className="hidden md:flex items-center space-x-8">
                            {!isAuthenticated ? (
                                <>
                                    <Link to={"/home"} className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
                                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</a>
                                </>)
                                :
                                (<>
                                    {/* These links are correctly hidden on mobile (md:flex) */}
                                    <Link to={"/home"} className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
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

                        {/* --- This is your original desktop auth buttons --- */}
                        <div className="hidden md:flex items-center space-x-4">
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

                        {/* --- Step 4: Add the Hamburger Menu Button --- */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // <-- Toggles the state
                                className="text-gray-300 hover:text-white"
                                aria-label="Open navigation menu"
                            >
                                <Menu size={24} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- Step 5: The Mobile Sidebar Panel --- */}
            {/* This div only appears if isMobileMenuOpen is true */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden absolute top-0 left-0 w-full h-screen bg-slate-950 z-50 p-6"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-xl font-semibold tracking-tighter text-white">Money_Manager</div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)} // <-- Close button
                            className="text-gray-300 hover:text-white"
                            aria-label="Close navigation menu"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* --- Step 6: Add all the mobile links --- */}
                    <div className="flex flex-col space-y-4">
                        {!isAuthenticated ? (
                            <>
                                <MobileNavLink to="/home">Home</MobileNavLink>
                                <MobileNavLink to="/login">Login</MobileNavLink>
                                <MobileNavLink to="/signup">Sign Up</MobileNavLink>
                            </>
                        ) : (
                            <>
                                <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
                                <MobileNavLink to="/expenses">Expenses</MobileNavLink>
                                <MobileNavLink to="/income">Income</MobileNavLink>
                                <MobileNavLink to="/categories">Categories</MobileNavLink>
                                <MobileNavLink to="/filter">Filter</MobileNavLink>
                                <MobileNavLink to="/profile">Profile</MobileNavLink>
                                <button
                                    className="block w-full text-left py-4 px-6 text-2xl font-medium text-red-400 hover:bg-slate-800 rounded-lg"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;