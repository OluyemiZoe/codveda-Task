window.MetricsGrid = ({ balance, targetGoal }) => {
    const targetProgress = Math.min((balance / targetGoal) * 100, 100);
    return (
        <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155]">
                <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Liquid Savings</h3>
                <p class="text-4xl md:text-5xl font-black mt-2 text-white">${balance.toFixed(2)}</p>
                <div class="bg-[#334155] h-3 rounded-full overflow-hidden mt-6">
                    <div class="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${targetProgress}%` }}></div>
                </div>
                <span class="text-xs text-slate-400 block mt-2 font-medium">{targetProgress.toFixed(1)}% of your target reached</span>
            </div>
            <div class="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155] flex flex-col justify-center">
                <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Target Milestone</h3>
                <p class="text-4xl md:text-5xl font-black mt-2 text-white">${targetGoal.toFixed(2)}</p>
            </div>
        </div>
    );
};
