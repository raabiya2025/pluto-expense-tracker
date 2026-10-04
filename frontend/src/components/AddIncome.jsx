import { useState } from "react";

function AddIncome({ onClose, onIncomeAdded }) {

    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/income",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: Number(amount),
                    source,
                    date
                })
            }
        );

        const data = await response.json();

        console.log("Income response:", data);

        if (response.ok) {
            

            setAmount("");
            setSource("");
            setDate(
                new Date().toISOString().split("T")[0]
            );

            await onIncomeAdded();
            onClose();
            

        } else {
            setMessage(data.error || "Failed to add income");
        }
    }

    return (
        <section className="add-expense-section">

            <div className="section-heading">
                <div>
                    <h2>Add income</h2>
                    <p>Record money you've received.</p>
                </div>

                <button
                    className="close-button"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit}>

                <label>
                    Amount
                    <input
                        type="number"
                        value={amount}
                        onChange={(event) =>
                            setAmount(event.target.value)
                        }
                        placeholder="Enter amount"
                        min="1"
                        required
                    />
                </label>

                <label>
                    Source
                    <input
                        type="text"
                        value={source}
                        onChange={(event) =>
                            setSource(event.target.value)
                        }
                        placeholder="e.g. Salary, Freelance"
                        required
                    />
                </label>

                <label>
                    Date
                    <input
                        type="date"
                        value={date}
                        onChange={(event) =>
                            setDate(event.target.value)
                        }
                        required
                    />
                </label>
{message && (
    <p className="form-message">
        {message}
    </p>
)}
                <button
                    type="submit"
                    className="submit-expense-button"
                >
                    Add income
                </button>

            </form>

        </section>
    );
}

export default AddIncome;