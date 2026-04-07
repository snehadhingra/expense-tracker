import PropTypes from "prop-types";
import { styles } from "../styles/styles";
import CategoryIcon from "./CategoryIcon";

export default function ExpenseListItem({ expense, onDelete }) {
  return (
    <div style={styles.expenseItem}>
      <div style={styles.expenseLeft}>
        <div style={styles.categoryDot(expense.category)}>
          <CategoryIcon category={expense.category} />
        </div>
        <div>
          <div style={styles.expenseTitle}>{expense.title}</div>
          <div style={styles.expenseMeta}>
            <span style={styles.badge(expense.category)}>{expense.category}</span>
            {"  "}
            {expense.date}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={styles.expenseAmount}>₹{expense.amount.toLocaleString()}</span>
        <button style={styles.deleteBtn} onClick={() => onDelete(expense.id)} title="Delete">
          ✕
        </button>
      </div>
    </div>
  );
}

ExpenseListItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    note: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
