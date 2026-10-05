import { useState } from "react";

function RecentTransactions({ expenses , onExpenseDeleted }) {

    const [showAll, setShowAll] = useState(false);
async function handleDelete(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.ok) {
        await onExpenseDeleted();
    } else {
        console.error("Failed to delete expense");
    }
}
    const displayedTransactions = showAll
        ? expenses
        : expenses.slice(0, 5);

    return (
        <section className="transactions-section">

            <div className="section-heading">

                <div>
                    <h2>Recent transactions</h2>
                    <p>Your latest money activity.</p>
                </div>

                {expenses.length > 5 && (
                    <button
                        className="view-all-button"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show less" : "View all"}
                    </button>
                )}

            </div>

            <div className="transactions-list">

                {displayedTransactions.map((transaction) => (
                    
                    <div
                        className="transaction-item"
                        key={transaction.id}
                    >

                        <div className="transaction-details">

                            <span className="transaction-name">
                                {transaction.title}
                            </span>

                            <div className="transaction-meta">

                                <span className="transaction-category">
                                    {transaction.category}
                                </span>

                                <span className="transaction-separator">
                                    •
                                </span>

                                <span className="transaction-date">
                                    {new Date(
                                        transaction.date
                                    ).toLocaleDateString("en-IN")}
                                </span>

                            </div>

                        </div>

                        <div className="transaction-actions">
    <span className="transaction-amount">
        -₹{Number(transaction.amount).toLocaleString("en-IN")}
    </span>

    <button
        className="delete-transaction-button"
        onClick={() => handleDelete(transaction.id)}
        title="Delete expense"
    >
        🗑️
    </button>
</div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default RecentTransactions;