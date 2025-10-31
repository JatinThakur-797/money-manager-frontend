"use client"

import { BarChart, ChevronDown, Star, Target, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

// --- Reusable Components with New Styles ---

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-muted p-6 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 border border-slate-800 hover:border-sky-500/50">
        <div className="inline-block p-4 bg-slate-900 rounded-full mb-4">
            <Icon className="text-sky-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <p className="text-slate-400 mt-2">{description}</p>
    </div>
)

const TestimonialCard = ({ name, role, quote }) => (
    <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-lg border border-sky-500/20">
        <div className="flex text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
        </div>
        <p className="text-slate-300 italic">"{quote}"</p>
        <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="font-bold text-slate-100">{name}</p>
            <p className="text-sm text-slate-500">{role}</p>
        </div>
    </div>
)

const FaqItem = ({ question, answer }) => (
    <details className="bg-muted p-4 rounded-lg group border border-slate-800 hover:bg-slate-800/50 transition-colors">
        <summary className="flex justify-between items-center font-semibold cursor-pointer text-slate-100">
            {question}
            <ChevronDown className="group-open:rotate-180 transition-transform" />
        </summary>
        <p className="text-slate-400 mt-2 pt-2 border-t border-slate-700">
            {answer}
        </p>
    </details>
)

 function Home() {
    return (
        <div className="bg-background text-slate-100">
            {/* --- Stylish Navbar --- */}
           <Navbar/>

            <main>
                {/* --- Dynamic Hero Section with Gradient Background --- */}
                <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] z-0"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-100 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                            Take Control of Your Finances.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl">
                            Money Manager helps you track your income and expenses with ease, so you can achieve your financial goals faster.
                        </p>
                        <div className="mt-8">
                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-lg text-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started for Free
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- What We Provide Section (Services) --- */}
                <section id="services" className="py-20 px-6 bg-muted">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Everything You Need to Succeed</h2>
                            <p className="text-slate-400 mt-2">Our features are designed for simplicity and power.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard icon={TrendingUp} title="Track Everything" description="Easily record your income and expenses in one secure place." />
                            <FeatureCard icon={BarChart} title="Visualize Spending" description="Understand where your money goes with insightful reports and charts." />
                            <FeatureCard icon={Target} title="Set Financial Goals" description="Create budgets and goals to stay on track and save more effectively." />
                        </div>
                    </div>
                </section>
               
                   
                    <section id="faq" className="py-20 px-6 bg-muted">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-4">
                                <FaqItem question="Is Money Manager secure?" answer="Yes! We prioritize your security above all else. All your data is encrypted and stored securely. We never share your financial information with third parties." />
                                <FaqItem question="Can I access my data on multiple devices?" answer="Absolutely. Your data is synced to your account, so you can access it on your phone, tablet, or computer seamlessly." />
                                <FaqItem question="Is there a free trial?" answer="Our core features for tracking income and expenses are completely free to use. We may offer premium features in the future." />
                            </div>
                        </div>
                    </section>
            
              
               
                {/* Bottom Grid */}
                
                <section className="py-20 px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Build Your Financial Future?</h2>
                        <p className="text-gray-400 mt-4">Join thousands of users who are taking control of their finances today.</p>
                        <div className="mt-8">
                             <Link to="/register" className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-lg text-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105">
                                Sign Up Now
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}
export default Home