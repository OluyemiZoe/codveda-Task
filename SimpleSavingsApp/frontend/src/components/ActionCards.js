window.ActionCards = ({ onDeposit, onUpdateGoal }) => {
    const [depositAmount, setDepositAmount] = React.useState('');
    const [goalInput, setGoalInput] = React.useState('');

    return (
        <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155]">
                <h3 class="text-lg font-bold mb-4 text-white">Process Secure Deposit</h3>
                <div class="flex flex-col sm:flex-row gap-3">
                    <input type="number" placeholder="Amount ($)" class="flex-1 p-3 bg-[#0f172a] border border-[#334155] rounded-lg text-white focus:outline-none" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
                    <button onClick={() => { onDeposit(depositAmount); setDepositAmount(''); }} class="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-semibold rounded-lg cursor-pointer">Deposit</button>
                </div>
            </div>
            <div class="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-[#334155]">
                <h3 class="text-lg font-bold mb-4 text-white">Modify Target Goal</h3>
                <div class="flex flex-col sm:flex-row gap-3">
                    <input type="number" placeholder="Set Goal ($)" class="flex-1 p-3 bg-[#0f172a] border border-[#334155] rounded-lg text-white focus:outline-none" value={goalInput} onChange={e => setGoalInput(e.target.value)} />
                    <button onClick={() => { onUpdateGoal(goalInput); setGoalInput(''); }} class="bg-blue-600 hover:bg-blue-500 px-6 py-3 font-semibold rounded-lg cursor-pointer">Update</button>
                </div>
            </div>
        </div>
    );
};
