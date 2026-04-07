import { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { CATEGORIES, CATEGORY_COLORS } from "../constants";
import { styles } from "../styles/styles";
import StatCard from "../components/StatCard";
import BudgetProgress from "../components/BudgetProgress";
import CategoryIcon from "../components/CategoryIcon";

export default function Summary() {
  const { state, setBudget } = useExpenses();
  const { expenses, budget } = state;
  const [editBudget, setEditBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);

  const topCat = (() => {
    const t = {};
    expenses.forEach((e) => (t[e.category] = (t[e.category] || 0) + e.amount));
    return Object.entries(t).sort(([, a], [, b]) => b - a)[0];
  })();

  const avgDaily = expenses.length ? Math.round(totalSpent / 30) : 0;

  const catTotals = CATEGORIES.map((cat) => ({
    cat,
    amt: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
    count: expenses.filter((e) => e.category === cat).length,
  }))
    .filter((x) => x.amt > 0)
    .sort((a, b) => b.amt - a.amt);

  const saveBudget = () => {
    setBudget(Number(newBudget));
    setEditBudget(false);
  };

  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  return (
    <div>
      <div style={styles.pageTitle}>Summary</div>

      <div style={styles.grid4}>
        <StatCard label="Total Spent" value={`₹${totalSpent.toLocaleString()}`} color="#7c6ded" />
        <StatCard
          label="Budget Left"
          value={`₹${Math.max(0, budget - totalSpent).toLocaleString()}`}
          color="#3dbf7e"
        />
        <StatCard
          label="Top Category"
          value={topCat ? topCat[0] : "—"}
          sub={topCat ? `₹${topCat[1].toLocaleString()}` : ""}
          color="#e8a838"
        />
        <StatCard label="Avg / Day" value={`₹${avgDaily.toLocaleString()}`} color="#4a9eed" />
      </div>

      <div style={styles.grid2}>
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Category Breakdown</div>
          {catTotals.length === 0 ? (
            <div style={styles.emptyState}>No expenses yet</div>
          ) : (
            catTotals.map(({ cat, amt, count }) => {
              const pct = totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0;
              return (
                <div key={cat} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span
                      style={{ fontSize: "13px", color: "#c0b8e0", display: "flex", gap: "6px", alignItems: "center" }}
                    >
                      <CategoryIcon category={cat} /> {cat}
                      <span style={{ color: "#6a7b8e", fontSize: "11px" }}>({count})</span>
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>
                      ₹{amt.toLocaleString()}{" "}
                      <span style={{ color: "#6a7b8e", fontSize: "11px" }}>({pct}%)</span>
                    </span>
                  </div>
                  <div style={styles.progressBar(pct, CATEGORY_COLORS[cat])}>
                    <div style={styles.progressFill(pct, CATEGORY_COLORS[cat])} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={styles.card}>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
          >
            <div style={styles.sectionTitle}>Budget Settings</div>
            {!editBudget && (
              <button style={styles.filterChip(false)} onClick={() => setEditBudget(true)}>
                Edit
              </button>
            )}
          </div>

          {editBudget ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                style={styles.input}
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="Enter monthly budget"
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={styles.submitBtn} onClick={saveBudget}>
                  Save
                </button>
                <button
                  style={{ ...styles.filterChip(false), padding: "10px 16px" }}
                  onClick={() => setEditBudget(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <BudgetProgress spent={totalSpent} budget={budget} />
              <div
                style={{
                  marginTop: "1rem",
                  padding: "12px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "10px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#8a9bb0", marginBottom: "4px" }}>Status</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: totalSpent > budget ? "#e05d5d" : "#3dbf7e",
                  }}
                >
                  {totalSpent > budget
                    ? `Over budget by ₹${(totalSpent - budget).toLocaleString()}`
                    : `₹${(budget - totalSpent).toLocaleString()} remaining`}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
