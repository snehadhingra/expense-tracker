import PropTypes from "prop-types";
import { styles } from "../styles/styles";

export default function BudgetProgress({ spent, budget }) {
  const pct = budget > 0 ? (spent / budget) * 100 : 0;
  const color = pct > 90 ? "#e05d5d" : pct > 70 ? "#e8a838" : "#3dbf7e";

  return (
    <div style={styles.card}>
      <div style={styles.budgetRow}>
        <span style={{ fontSize: "13px", color: "#8a9bb0" }}>Monthly Budget</span>
        <span style={{ fontSize: "13px", fontWeight: "600", color }}>
          {Math.round(pct)}% used
        </span>
      </div>
      <div style={styles.progressBar(pct, color)}>
        <div style={styles.progressFill(pct, color)} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <span style={{ fontSize: "12px", color: "#6a7b8e" }}>₹{spent.toLocaleString()} spent</span>
        <span style={{ fontSize: "12px", color: "#6a7b8e" }}>₹{budget.toLocaleString()} budget</span>
      </div>
    </div>
  );
}

BudgetProgress.propTypes = {
  spent: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
};
