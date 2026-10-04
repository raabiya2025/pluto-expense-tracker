function TopCategories({ expenses }) {
    const categoryTotals = {};

expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += Number(expense.amount);
});
const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
);

const categories = Object.entries(categoryTotals).map(
    ([name, amount]) => ({
        name,
        amount,
        percentage: totalExpenses
            ? Math.round((amount / totalExpenses) * 100)
            : 0
    })
);
categories.sort((a, b) => b.amount - a.amount);

    return (
        <section className="categories-section">

            <div className="section-heading">
                <div>
                    <h2>Top categories</h2>

                    <p>
                        See where most of your money is going.
                    </p>
                </div>
            </div>

            <div className="categories-list">

                {categories.map((category) => (
                    <div
                        className="category-item"
                        key={category.name}
                    >
                        <div className="category-info">

                            <span className="category-name">
                                {category.name}
                            </span>

                            <span className="category-amount">
    ₹{category.amount.toLocaleString("en-IN")}
</span>

                        </div>

                        <div className="category-bar">
                            <div
                                className="category-progress"
                                style={{
                                    width: `${category.percentage}%`
                                }}
                            ></div>
                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default TopCategories;