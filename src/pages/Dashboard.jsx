import PropTypes from "prop-types";
import { useExpenses } from "../context/ExpenseContext";
import { styles } from "../styles/styles";
import StatCard from "../components/StatCard";
import BudgetProgress from "../components/BudgetProgress";
import ExpenseListItem from "../components/ExpenseListItem";
import CategoryBar from "../components/CategoryBar";

export default function Dashboard({ onNavigate }) {
  const { state, deleteExpense } = useExpenses();
  const { expenses, budget } = state;

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const thisMonth = expenses.filter((e) => e.date.startsWith("2025-04"));
  const monthSpent = thisMonth.reduce((s, e) => s + e.amount, 0);
  const avgPerExpense = expenses.length ? Math.round(totalSpent / expenses.length) : 0;
  const recent = expenses.slice(0, 5);

  return (
    <div>
      <div style={styles.pageTitle}>Dashboard</div>

      <div style={styles.grid4}>
        <StatCard label="Total Spent" value={`₹${totalSpent.toLocaleString()}`} color="#7c6ded" />
        <StatCard label="This Month" value={`₹${monthSpent.toLocaleString()}`} color="#4a9eed" />
        <StatCard label="Transactions" value={`${expenses.length}`} color="#3dbf7e" />
        <StatCard label="Avg Expense" value={`₹${avgPerExpense.toLocaleString()}`} color="#e8a838" />
      </div>

      <BudgetProgress spent={monthSpent} budget={budget} />

      <div style={{ ...styles.grid2, marginTop: "1.5rem" }}>
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Recent Expenses</div>
          {recent.length === 0 ? (
            <div style={styles.emptyState}>No expenses yet</div>
          ) : (
            recent.map((e) => <ExpenseListItem key={e.id} expense={e} onDelete={deleteExpense} />)
          )}
          {expenses.length > 5 && (
            <button
              style={{ ...styles.filterChip(false), marginTop: "1rem", width: "100%", textAlign: "center" }}
              onClick={() => onNavigate("history")}
            >
              View all {expenses.length} expenses →
            </button>
          )}
        </div>

        <div style={styles.card}>
          <div style={styles.sectionTitle}>Spending by Category</div>
          <CategoryBar expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
