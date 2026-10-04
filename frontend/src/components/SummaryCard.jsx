function SummaryCard({ title, amount }) {
    return (
        <div className="summary-card">
            <p className="summary-title">{title}</p>

            <h2 className="summary-amount">
                {amount}
            </h2>
        </div>
    );
}

export default SummaryCard;