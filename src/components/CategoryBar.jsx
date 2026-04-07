import PropTypes from "prop-types";
import { CATEGORIES, CATEGORY_COLORS } from "../constants";
import { styles } from "../styles/styles";
import CategoryIcon from "./CategoryIcon";

export default function CategoryBar({ expenses }) {
  const totals = {};
  CATEGORIES.forEach((c) => (totals[c] = 0));
  expenses.forEach((e) => (totals[e.category] = (totals[e.category] || 0) + e.amount));
  const max = Math.max(...Object.values(totals), 1);
  const sorted = Object.entries(totals)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a);

  if (sorted.length === 0) return <div style={styles.emptyState}>No data yet</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {sorted.map(([cat, amt]) => (
        <div key={cat}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontSize: "13px", color: "#c0b8e0", display: "flex", alignItems: "center", gap: "6px" }}>
              <CategoryIcon category={cat} /> {cat}
            </span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>
              ₹{amt.toLocaleString()}
            </span>
          </div>
          <div style={styles.progressBar(100, CATEGORY_COLORS[cat])}>
            <div style={styles.progressFill((amt / max) * 100, CATEGORY_COLORS[cat])} />
          </div>
        </div>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  expenses: PropTypes.array.isRequired,
};
