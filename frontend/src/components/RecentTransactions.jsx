import { useState } from "react";

function RecentTransactions({ expenses }) {

    const [showAll, setShowAll] = useState(false);

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

                        <span className="transaction-amount">
                            -₹{Number(transaction.amount).toLocaleString("en-IN")}
                        </span>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default RecentTransactions;