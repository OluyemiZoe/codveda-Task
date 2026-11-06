window.AuthCard = ({ onAuthSuccess }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const authContext = React.useContext(window.AuthContext);

    const handleAuth = async (type) => {
        const mutation = type === 'login' 
            ? `mutation($u: String!, $p: String!) { loginUser(username: $u, password: $p) { token } }`
            : `mutation($u: String!, $p: String!) { signupUser(username: $u, password: $p, role: "user") { token } }`;
        try {
            const data = await window.executeGraphQL(mutation, { u: username, p: password });
            const token = data[`${type}User`].token;
            authContext.login(token);
            if (onAuthSuccess) onAuthSuccess();
        } catch (err) { alert(err.message); }
    };

    return (
        <div class="bg-[#1e293b] p-8 rounded-xl shadow-2xl text-center max-w-md mx-auto mt-20 border border-[#334155]">
            <h2 class="text-2xl font-bold mb-6 text-white tracking-wide">Savings Access Point</h2>
            <div class="space-y-4">
                <input type="text" placeholder="Username" class="w-full p-3 bg-[#0f172a] border border-[#334155] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" class="w-full p-3 bg-[#0f172a] border border-[#334155] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div class="grid grid-cols-2 gap-4 mt-6">
                <button onClick={() => handleAuth('login')} class="p-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-md cursor-pointer transition-all">Log In</button>
                <button onClick={() => handleAuth('signup')} class="p-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md cursor-pointer transition-all">Register</button>
            </div>
        </div>
    );
};
