// src/components/CTA.jsx


const CTA = () => {
    return (
        <div className="mt-12 glass-panel rounded-2xl p-8 text-center border border-blue-500/20 glow-border">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Take Control of Your Finances
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Get insights, set budgets, and achieve your financial goals with Money Manager's powerful analytics.
            </p>
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all green-glow">
                Get Started Free
            </button>
        </div>
    );
};

export default CTA;