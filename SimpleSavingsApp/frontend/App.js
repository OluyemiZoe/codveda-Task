
(function () {
    const BACKEND_URL = 'http://localhost:4000/graphql';
    let token = localStorage.getItem('token') || '';
    let balance = 0;
    let targetGoal = 500;
    let notifications = [];
    let socket = null;

    // Network Transport section
    async function executeGraphQL(query, variables = {}) {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0]?.message || 'GraphQL Mutation Failure');
        return json.data;
    }

    // App View Routing Switch
    function render() {
        const root = document.getElementById('root');
        if (!root) return;

        if (!token) {

            // Screen 1: Access Portal
            root.innerHTML = `
                <div class="box">
                    <h2>Savings Vault</h2>
                    <input type="text" id="username" placeholder="Username" class="input-field" />
                    <input type="password" id="password" placeholder="Password" class="input-field" />
                    <div style="margin-top: 15px;">
                        <button id="loginBtn" class="btn btn-green">Log In</button>
                        <button id="signupBtn" class="btn btn-blue">Register</button>
                    </div>
                </div>
            `;
            document.getElementById('loginBtn').onclick = () => handleAuth('login');
            document.getElementById('signupBtn').onclick = () => handleAuth('signup');
        } else {

            // Screen 2: System Dashboard 
            let logsHtml = notifications.map(n => `<div style="padding: 6px; border-left: 3px solid #10b981; background: #0f172a; margin-bottom: 5px; font-family: monospace; color: #10b981;">${n}</div>`).join('');
            let progressWidth = Math.min((balance / targetGoal) * 100, 100);

            root.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 15px;">
                    <h2>Savings Vault Dashboard</h2>
                    <button id="logoutBtn" class="btn btn-red">Logout</button>
                </div>
                
                <div class="grid">
                    <div style="background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155;">
                        <span style="color: #94a3b8; font-size: 0.85rem; text-transform: uppercase;">Liquid Savings</span>
                        <h1 style="font-size: 3rem; margin: 10px 0; color: white;">$${balance.toFixed(2)}</h1>
                        <div style="background: #334155; height: 12px; border-radius: 6px; overflow: hidden; margin-top: 15px;">
                            <div style="background: #10b981; height: 100%; width: ${progressWidth}%; transition: width 0.4s;"></div>
                        </div>
                        <span style="font-size: 0.75rem; color: #94a3b8; display: block; margin-top: 5px;">${progressWidth.toFixed(1)}% of milestone target</span>
                    </div>
                    <div style="background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; display: flex; flex-col; justify-content: center; align-items: center;">
                        <div style="text-align: center;">
                            <span style="color: #94a3b8; font-size: 0.85rem; text-transform: uppercase;">Target Goal </span>
                            <h1 style="font-size: 3rem; margin: 10px 0; color: white;">$${targetGoal.toFixed(2)}</h1>
                        </div>
                    </div>
                </div>

                <div class="grid">
                    <div style="background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155;">
                        <h3> Deposit Process </h3>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <input type="number" id="depAmt" placeholder="Amount ($)" class="input-field" style="margin:0;" />
                            <button id="doDepBtn" class="btn btn-green">Deposit</button>
                        </div>
                    </div>
                    <div style="background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155;">
                        <h3>Modify Target Goal</h3>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <input type="number" id="goalAmt" placeholder="Set Goal ($)" class="input-field" style="margin:0;" />
                            <button id="doGoalBtn" class="btn btn-blue">Update</button>
                        </div>
                    </div>
                </div>

                <div class="ledger">
                    <h4 style="margin: 0 0 10px 0; color: #94a3b8; font-size: 0.8rem; text-transform: uppercase;"> Live Ledger Notifications</h4>
                    <div style="max-h: 180px; overflow-y: auto;">
                        ${logsHtml || '<p style="color: #475569; font-style: italic; margin:0;">Awaiting stream transactions...</p>'}
                    </div>
                </div>
            `;

            document.getElementById('logoutBtn').onclick = handleLogout;
            document.getElementById('doDepBtn').onclick = handleDeposit;
            document.getElementById('doGoalBtn').onclick = handleUpdateGoal;
        }
    }

    // Transaction Implementations
    async function handleAuth(type) {
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;
        const mutation = type === 'login'
            ? `mutation($u: String!, $p: String!) { loginUser(username: $u, password: $p) { token } }`
            : `mutation($u: String!, $p: String!) { signupUser(username: $u, password: $p, role: "user") { token } }`;
        try {
            const data = await executeGraphQL(mutation, { u, p });
            token = data[`${type}User`].token;
            localStorage.setItem('token', token);
            initDashboardSession();
        } catch (err) { alert(err.message); }
    }

    function handleLogout() {
        localStorage.clear();
        token = '';
        if (socket) socket.disconnect();
        render();
    }

    async function handleDeposit() {
        const amt = parseFloat(document.getElementById('depAmt').value);
        if (!amt) return;
        try {
            await executeGraphQL(`mutation($amt: Float!) { depositMoney(amount: $amt) { balance } }`, { amt });
        } catch (err) { alert(err.message); }
    }

    async function handleUpdateGoal() {
        const tgt = parseFloat(document.getElementById('goalAmt').value);
        if (!tgt) return;
        try {
            const data = await executeGraphQL(`mutation($tgt: Float!) { setSavingsGoal(target: $tgt) { targetGoal } }`, { tgt });
            targetGoal = data.setSavingsGoal.targetGoal;
            render();
        } catch (err) { alert(err.message); }
    }

    function initDashboardSession() {
        if (!token) return;
        try {
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            
            // Connect to local WebSocket stream
            if (typeof io !== 'undefined') {
                socket = io('http://localhost:4000');
                socket.emit('join_user_channel', payload.userId);
                
                socket.on('balance_updated', (data) => {
                    notifications.unshift(data.message);
                    balance = data.newBalance;
                    render();
                });
                
                socket.on('milestone_reached', (data) => {
                    notifications.unshift(` ${data.message}`);
                    render();
                });
            }

            // Sync initial server 
            executeGraphQL(`query { getMySavings { balance targetGoal } }`)
                .then(data => {
                    if (data && data.getMySavings) {
                        balance = data.getMySavings.balance;
                        targetGoal = data.getMySavings.targetGoal;
                    }
                    render();
                }).catch(e => { console.error(e); render(); });
        } catch (e) { console.error(e); render(); }
    }

   
    if (token) { initDashboardSession(); } else { render(); }
})();
