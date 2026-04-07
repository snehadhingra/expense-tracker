import { createContext, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";

export const ExpenseContext = createContext();

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case "DELETE_EXPENSE":
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    default:
      return state;
  }
}

const initialState = {
  expenses: [
    { id: 1, title: "Grocery Run", amount: 1250, category: "Food", date: "2025-04-01", note: "Weekly groceries" },
    { id: 2, title: "Metro Pass", amount: 500, category: "Transport", date: "2025-04-01", note: "" },
    { id: 3, title: "Netflix", amount: 649, category: "Entertainment", date: "2025-03-30", note: "Monthly sub" },
    { id: 4, title: "Medicines", amount: 320, category: "Health", date: "2025-03-29", note: "Pharmacy" },
    { id: 5, title: "Electricity Bill", amount: 1800, category: "Bills", date: "2025-03-28", note: "March bill" },
    { id: 6, title: "Zara T-shirt", amount: 899, category: "Shopping", date: "2025-03-27", note: "" },
  ],
  filter: "All",
  budget: 10000,
};

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const addExpense = useCallback((expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { ...expense, id: Date.now() } });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);

  const setBudget = useCallback((budget) => {
    dispatch({ type: "SET_BUDGET", payload: budget });
  }, []);

  return (
    <ExpenseContext.Provider value={{ state, addExpense, deleteExpense, setFilter, setBudget }}>
      {children}
    </ExpenseContext.Provider>
  );
}

ExpenseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useExpenses() {
  return useContext(ExpenseContext);
}
