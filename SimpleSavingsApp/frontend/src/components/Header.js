window.Header = () => {
    const { logout } = React.useContext(window.AuthContext);
    return (
        <header class="flex justify-between items-center border-b border-[#334155] pb-4">
            <h2 class="text-2xl font-extrabold text-white md:text-3xl">Savings Vault Dashboard</h2>
            <button class="bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer shadow-md transition-all" onClick={logout}>Logout</button>
        </header>
    );
};
