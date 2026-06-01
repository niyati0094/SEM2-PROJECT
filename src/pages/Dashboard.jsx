import { useMemo, useState } from 'react';
import Filters from '../components/Filters.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const sampleTransactions = [
  {
    id: 'sample-1',
    title: 'Monthly salary',
    amount: 5200,
    category: 'Salary',
    date: new Date().toISOString().slice(0, 10),
    type: 'income',
  },
  {
    id: 'sample-2',
    title: 'Grocery run',
    amount: 128.46,
    category: 'Food',
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    type: 'expense',
  },
];

const defaultFilters = {
  search: '',
  category: 'all',
  type: 'all',
};

export default function Dashboard() {
  const [transactions, setTransactions] = useLocalStorage('expense-tracker-transactions', sampleTransactions);
  const [filters, setFilters] = useState(defaultFilters);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const totals = useMemo(() => {
    return transactions.reduce(
      (summary, transaction) => {
        if (transaction.type === 'income') {
          summary.income += transaction.amount;
        } else {
          summary.expenses += transaction.amount;
        }

        summary.balance = summary.income - summary.expenses;
        return summary;
      },
      { balance: 0, income: 0, expenses: 0 },
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return [...transactions]
      .sort((first, second) => new Date(second.date) - new Date(first.date))
      .filter((transaction) => {
        const matchesSearch =
          !search ||
          transaction.title.toLowerCase().includes(search) ||
          transaction.category.toLowerCase().includes(search);
        const matchesCategory = filters.category === 'all' || transaction.category === filters.category;
        const matchesType = filters.type === 'all' || transaction.type === filters.type;

        return matchesSearch && matchesCategory && matchesType;
      });
  }, [filters, transactions]);

  function upsertTransaction(transaction) {
    setTransactions((currentTransactions) => {
      const exists = currentTransactions.some((item) => item.id === transaction.id);

      if (exists) {
        return currentTransactions.map((item) => (item.id === transaction.id ? transaction : item));
      }

      return [transaction, ...currentTransactions];
    });
    setEditingTransaction(null);
  }

  function deleteTransaction(transactionId) {
    setTransactions((currentTransactions) => currentTransactions.filter((transaction) => transaction.id !== transactionId));
    if (editingTransaction?.id === transactionId) {
      setEditingTransaction(null);
    }
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Expense Tracker</p>
          <h1>Keep your money decisions clear.</h1>
          <p className="hero__copy">
            Track income, expenses, categories, and cash flow in a polished local-first dashboard.
          </p>
        </div>
      </section>

      <section className="summary-grid" aria-label="Financial summary">
        <SummaryCard title="Total Balance" amount={totals.balance} tone="balance" />
        <SummaryCard title="Total Income" amount={totals.income} tone="income" />
        <SummaryCard title="Total Expenses" amount={totals.expenses} tone="expense" />
      </section>

      <section className="workspace">
        <div className="workspace__left">
          <TransactionForm
            editingTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
            onSubmit={upsertTransaction}
          />
        </div>

        <div className="workspace__right">
          <Filters filters={filters} onChange={setFilters} />
          <TransactionList
            hasTransactions={transactions.length > 0}
            onDelete={deleteTransaction}
            onEdit={setEditingTransaction}
            transactions={filteredTransactions}
          />
        </div>
      </section>
    </main>
  );
}
