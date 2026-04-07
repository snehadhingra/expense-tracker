import { useState } from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import { styles } from "./styles/styles";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import History from "./pages/History";
import Summary from "./pages/Summary";

const PAGES = ["dashboard", "add", "history", "summary"];
const PAGE_LABELS = {
  dashboard: "Dashboard",
  add: "Add Expense",
  history: "History",
  summary: "Summary",
};

function AppContent() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard onNavigate={setPage} />;
      case "add":       return <AddExpense />;
      case "history":   return <History />;
      case "summary":   return <Summary />;
      default:          return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        button:hover { opacity: 0.85; }
      `}</style>

      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoAccent}></span>
          ExpenseTrack
        </div>
        <nav style={styles.nav}>
          {PAGES.map((p) => (
            <button key={p} style={styles.navBtn(page === p)} onClick={() => setPage(p)}>
              {PAGE_LABELS[p]}
            </button>
          ))}
        </nav>
      </header>

      <main style={styles.main}>{renderPage()}</main>
    </div>
  );
}

export default function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}
