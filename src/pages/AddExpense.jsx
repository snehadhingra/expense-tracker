import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { CATEGORIES } from "../constants";
import { styles } from "../styles/styles";
import Toast from "../components/Toast";

export default function AddExpense() {
  const { addExpense } = useExpenses();
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      errs.amount = "Enter a valid amount";
    if (!form.date) errs.date = "Date is required";
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    addExpense({ ...form, amount: Number(form.amount) });
    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
    setErrors({});
    setToast("Expense added successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <div style={styles.pageTitle}>Add Expense</div>
      <div style={{ ...styles.card, maxWidth: "560px" }}>
        <div style={styles.form}>
          <div style={styles.row2}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Title *</label>
              <input
                style={{ ...styles.input, borderColor: errors.title ? "#e05d5d" : undefined }}
                placeholder="e.g. Lunch at Saravana"
                value={form.title}
                onChange={handleChange("title")}
              />
              {errors.title && <span style={{ fontSize: "11px", color: "#e05d5d" }}>{errors.title}</span>}
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount (₹) *</label>
              <input
                style={{ ...styles.input, borderColor: errors.amount ? "#e05d5d" : undefined }}
                placeholder="e.g. 450"
                type="number"
                min="0"
                value={form.amount}
                onChange={handleChange("amount")}
              />
              {errors.amount && <span style={{ fontSize: "11px", color: "#e05d5d" }}>{errors.amount}</span>}
            </div>
          </div>

          <div style={styles.row2}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <select style={styles.select} value={form.category} onChange={handleChange("category")}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date *</label>
              <input
                style={{ ...styles.input, borderColor: errors.date ? "#e05d5d" : undefined }}
                type="date"
                value={form.date}
                onChange={handleChange("date")}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Note (optional)</label>
            <textarea
              style={styles.textarea}
              placeholder="Add any extra details..."
              value={form.note}
              onChange={handleChange("note")}
            />
          </div>

          <button style={styles.submitBtn} onClick={handleSubmit}>
            + Add Expense
          </button>
        </div>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  );
}
