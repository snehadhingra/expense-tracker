import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { CATEGORIES } from "../constants";
import { styles } from "../styles/styles";
import ExpenseListItem from "../components/ExpenseListItem";

export default function History() {
  const { state, deleteExpense, setFilter } = useExpenses();
  const { expenses, filter } = state;
  const [search, setSearch] = useState("");

  const filtered = expenses.filter((e) => {
    const matchCat = filter === "All" || e.category === filter;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <div style={styles.pageTitle}>History</div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          style={{ ...styles.input, marginBottom: "1rem" }}
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={styles.filterBar}>
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              style={styles.filterChip(filter === cat)}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontSize: "13px", color: "#8a9bb0" }}>{filtered.length} expenses</span>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>₹{total.toLocaleString()}</span>
        </div>
        {filtered.length === 0 ? (
          <div style={styles.emptyState}>No expenses found</div>
        ) : (
          filtered.map((e) => <ExpenseListItem key={e.id} expense={e} onDelete={deleteExpense} />)
        )}
      </div>
    </div>
  );
}
