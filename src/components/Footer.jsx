// src/components/Footer.jsx

import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass-panel border-t border-white/5 mt-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: Brand Info */}
                    <div>
                        <div className="text-xl font-semibold tracking-tighter text-white mb-4">
                            Money Manager
                        </div>
                        <p className="text-sm text-gray-400">
                            Take control of your finances with powerful analytics and insights.
                        </p>
                    </div>

                    {/* Column 2: Product Links */}
                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Security</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Company Links */}
                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal Links */}
                    <div>
                        <h4 className="text-sm font-medium text-white mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Licenses</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Socials */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-gray-400">
                        © 2025 Money Manager. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 py-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Money Manager. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;