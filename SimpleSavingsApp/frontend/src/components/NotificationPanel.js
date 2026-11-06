window.NotificationPanel = ({ notifications }) => {
    return (
        <div class="bg-[#020617] border border-[#1e293b] p-6 rounded-xl shadow-inner">
            <h3 class="text-md font-bold mb-3 text-slate-300 tracking-wide uppercase text-xs">⚡ Live WebSocket Notifications</h3>
            {notifications.length === 0 ? (
                <p class="text-slate-500 italic text-sm">Awaiting bidirectional channel stream...</p>
            ) : (
                <ul class="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {notifications.map((n, i) => (
                        <li key={i} class="p-3 bg-[#0f172a]/50 rounded-lg text-emerald-400 font-mono text-sm border-l-4 border-emerald-500">
                            {n}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
