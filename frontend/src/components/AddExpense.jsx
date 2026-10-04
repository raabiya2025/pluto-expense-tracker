import { useState } from "react";

function AddExpense({ onClose,onExpenseAdded, onSuccess  }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
);

    async function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/expenses",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    amount: Number(amount),
                    category,
                    date
                })
            }
        );

        const data = await response.json();

        console.log("Expense response:", data);

        if (response.ok) {
            console.log("TOAST SHOULD SHOW NOW");
             onSuccess();

            setTitle("");
            setAmount("");
            setCategory("Food");
            setDate(new Date().toISOString().split("T")[0]);

            await onExpenseAdded();
            onClose();
        } else {
            alert(data.error || "Failed to add expense");
        }
    }

    return (
        <section className="add-expense-section">
            <div className="add-expense-header">

            <div>
            <h2>Add expense</h2>

            <p className="add-expense-subtitle">
                Record a new expense.
            </p>
            </div>
          

            
            
              <button
    type="button"
    className="modal-close"
    onClick={onClose}
>
    ✕
</button>
</div>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="e.g. Lunch"
                    />
                </div>

                <div className="form-group">
                    <label>Amount</label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(event) =>
                            setAmount(event.target.value)
                        }
                        placeholder="e.g. 320"
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                    >
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Shopping</option>
                        <option>Entertainment</option>
                        <option>Bills</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Date</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(event) =>
                            setDate(event.target.value)
                        }
                    />
                </div>

                <button
                    className="primary-button"
                    type="submit"
                >
                    Add expense
                </button>

            </form>

        </section>
    );
}

export default AddExpense;