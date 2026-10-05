import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import SpendingOverview from "../components/SpendingOverview";
import TopCategories from "../components/TopCategories";
import RecentTransactions from "../components/RecentTransactions";
import AddExpense from "../components/AddExpense";
import AddIncome from "../components/AddIncome";
import Toast from "../components/Toast";


function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [showAddIncome, setShowAddIncome] = useState(false);
    const [income, setIncome] = useState([]);
const [toastMessage, setToastMessage] = useState("");
    useEffect(() => {
        async function getProfile() {
            const token = localStorage.getItem("token");

            if (!token) {
                window.location.href = "/login";
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log("Profile response:", data);

            if (response.ok) {
                setUser(data);
            } else {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            setLoading(false);
        }

        getProfile();
    }, []);
async function getExpenses() {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/expenses",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    console.log("Dashboard expenses:", data);

    if (response.ok) {
        setExpenses(data);
    }
}
async function getIncome() {
    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/api/income",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    console.log("Income response:", data);

    if (response.ok) {
        setIncome(data);
    }
}
useEffect(() => {
    getExpenses();
    getIncome();
}, []);

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
);
const totalIncome = income.reduce(
    (total, item) => total + Number(item.amount),
    0
);

const savings = totalIncome - totalExpenses;
const currentHour = new Date().getHours();

let greeting;

if (currentHour < 12) {
    greeting = "Good morning";
} else if (currentHour < 18) {
    greeting = "Good afternoon";
} else {
    greeting = "Good evening";
}
const funnyMessages = [
    "👀 The wallet has concerns.",
    "💸 Let's check the damage.",
    "🫡 Welcome back, boss. Your wallet awaits.",
    "🧾 Your expenses have entered the chat.",
    "🤑 Let's make those rupees behave.",
    "🚨 We need to talk about your spending.",
    "🕵️ Let's investigate where the money went.",
    "☕ Coffee first, finances second.",
    "💰 Time to count the coins.",
    "✨ Financial zone activated.",
    "😌 Your wallet deserves some attention.",
    "🙃 Another day, another expense.",
    "💀 Your bank account asked me to check on you.",
    "👋 Pluto missed you. Your expenses didn't.",
    "🤨 Interesting... where did all that money go?"
];

const funnyMessage =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    return (
    <main className="dashboard">

        <section className="dashboard-header">
            <div>
    <span className="dashboard-eyebrow">YOUR FINANCIAL UNIVERSE</span>

    <h1>{greeting}, {user.name} 👋</h1>

    <p>{funnyMessage}</p>
</div>

            <div className="dashboard-actions">

    <button
        className="add-income-button"
        onClick={() => setShowAddIncome(true)}
    >
        + Add income
    </button>

    <button
        className="add-expense-button"
        onClick={() => setShowAddExpense(true)}
    >
        + Add expense
    </button>

</div>
        </section>
{showAddExpense && (
    <div className="modal-overlay">
        <div className="modal-container">
            <AddExpense
                onClose={() => setShowAddExpense(false)}
                onExpenseAdded={getExpenses}
                onSuccess={() =>
                    setToastMessage("Expense added successfully!")
                }
            />
        </div>
    </div>
)}

{showAddIncome && (
    <div className="modal-overlay">
        <div className="modal-container">
           <AddIncome
    onClose={() => setShowAddIncome(false)}
   onIncomeAdded={async () => {
    await getIncome();
    setToastMessage("Income added successfully!");
}}
/>
        </div>
    </div>
)}

{toastMessage && (
    <Toast
        message={toastMessage}
        onClose={() => setToastMessage("")}
    />
)}







        <section className="summary-grid">

            <SummaryCard
    title="Expenses"
    amount={`₹${totalExpenses.toLocaleString("en-IN")}`}
/>

            <SummaryCard
    title="Savings"
    amount={`₹${savings.toLocaleString("en-IN")}`}
/>

        </section>
        <SpendingOverview expenses={expenses} />
        <TopCategories expenses={expenses} />
        <RecentTransactions expenses={expenses} />

    </main>
);
}

export default Dashboard;