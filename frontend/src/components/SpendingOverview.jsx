import { useState } from "react";

function SpendingOverview({ expenses }) {

    const [timeRange, setTimeRange] = useState("This month");
    const [hoveredPoint, setHoveredPoint] = useState(null);

    const now = new Date();

    const filteredExpenses = expenses.filter((expense) => {

        const expenseDate = new Date(expense.date);

        if (timeRange === "This month") {
            return (
                expenseDate.getMonth() === now.getMonth() &&
                expenseDate.getFullYear() === now.getFullYear()
            );
        }

        if (timeRange === "Last month") {

            const lastMonth = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                1
            );

            return (
                expenseDate.getMonth() === lastMonth.getMonth() &&
                expenseDate.getFullYear() === lastMonth.getFullYear()
            );
        }

        if (timeRange === "Last 3 months") {

            const threeMonthsAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 2,
                1
            );

            return expenseDate >= threeMonthsAgo;
        }

        return true;
    });

    const dailyTotals = {};

    filteredExpenses.forEach((expense) => {

        const date = new Date(expense.date)
            .toISOString()
            .split("T")[0];

        if (!dailyTotals[date]) {
            dailyTotals[date] = 0;
        }

        dailyTotals[date] += Number(expense.amount);
    });

    const chartData = Object.entries(dailyTotals)
        .sort(([dateA], [dateB]) =>
            dateA.localeCompare(dateB)
        )
        .map(([date, amount]) => ({
            date,
            amount
        }));

    const maxAmount = Math.max(
        ...chartData.map((item) => item.amount),
        1
    );

    const chartTop = 10;
    const chartBottom = 220;
    const chartHeight = chartBottom - chartTop;

    const chartPoints = chartData.map((item, index) => {

        const x =
            chartData.length === 1
                ? 400
                : (index / (chartData.length - 1)) * 740 + 30;

        const y =
            chartBottom -
            (item.amount / maxAmount) * chartHeight;

        return {
            ...item,
            x,
            y
        };
    });

    return (
        <section className="spending-section">

            <div className="section-heading">

                <div>
                    <h2>Spending overview</h2>

                    <p>
                        Track how your spending changes over time.
                    </p>
                </div>

                <select
                    value={timeRange}
                    onChange={(event) =>
                        setTimeRange(event.target.value)
                    }
                >
                    <option>This month</option>
                    <option>Last month</option>
                    <option>Last 3 months</option>
                </select>

            </div>

            <div className="chart-placeholder">

                <div className="chart-line">

                    <span>
                        ₹{maxAmount.toLocaleString("en-IN")}
                    </span>

                    <span>
                        ₹{Math.round(maxAmount * 0.75).toLocaleString("en-IN")}
                    </span>

                    <span>
                        ₹{Math.round(maxAmount * 0.5).toLocaleString("en-IN")}
                    </span>

                    <span>
                        ₹{Math.round(maxAmount * 0.25).toLocaleString("en-IN")}
                    </span>

                    <span>₹0</span>

                </div>

                <div className="chart-area">

                    {chartData.length === 0 ? (

                        <div className="empty-chart">

                            <p>No expenses for this period</p>

                            <span>
                                Add an expense to see your spending trend.
                            </span>

                        </div>

                    ) : (

                        <div className="chart-content">

                            <div className="chart-visual">

                                <svg
                                    className="spending-chart"
                                    viewBox="0 0 800 230"
                                    preserveAspectRatio="none"
                                >

                                    <polyline
    points={chartPoints
        .map((point) =>
            `${point.x},${point.y}`
        )
        .join(" ")}
    fill="none"
    stroke="#8B5E3C"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
/>

                                    {chartPoints.map((point) => {

                                        const expenseForDate =
                                            filteredExpenses.find(
                                                (expense) => {

                                                    const expenseDate =
                                                        new Date(expense.date)
                                                            .toISOString()
                                                            .split("T")[0];

                                                    return expenseDate === point.date;
                                                }
                                            );

                                        return (
                                            <circle
                                                key={point.date}
                                                cx={point.x}
                                                cy={point.y}
                                                r="6"
                                                fill="#B88962"
                                               onMouseEnter={() =>
    setHoveredPoint({
        ...point
    })
}
                                                onMouseLeave={() =>
                                                    setHoveredPoint(null)
                                                }
                                            />
                                        );
                                    })}

                                </svg>

                                {hoveredPoint && (
    <div
        className="chart-tooltip"
        style={{
            left: `${(hoveredPoint.x / 800) * 100}%`,
            top: `${(hoveredPoint.y / 230) * 100}%`
        }}
    >
        <strong>
            Daily spending
        </strong>

        <span>
            ₹{hoveredPoint.amount.toLocaleString("en-IN")}
        </span>

        <small>
            {new Date(
                hoveredPoint.date
            ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            })}
        </small>
    </div>
)}

                            </div>

                            <div className="chart-dates">

                                {chartPoints.map((point) => (

                                    <span key={point.date}>

                                        {new Date(
                                            point.date
                                        ).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short"
                                        })}

                                    </span>

                                ))}

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}

export default SpendingOverview;