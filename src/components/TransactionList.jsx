import { Edit3, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState.jsx';
import { formatCurrency } from '../utils/currency.js';

export default function TransactionList({ hasTransactions, onDelete, onEdit, transactions }) {
  return (
    <section className="panel transaction-list">
      <div className="section-heading">
        <div>
          <span>Ledger</span>
          <h2>Transactions</h2>
        </div>
        <strong>{transactions.length}</strong>
      </div>

      {transactions.length === 0 ? (
        <EmptyState hasTransactions={hasTransactions} />
      ) : (
        <div className="transactions">
          {transactions.map((transaction) => (
            <article className="transaction" key={transaction.id}>
              <div className={`transaction__marker transaction__marker--${transaction.type}`} />
              <div className="transaction__body">
                <div>
                  <h3>{transaction.title}</h3>
                  <p>
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <strong className={`transaction__amount transaction__amount--${transaction.type}`}>
                  {transaction.type === 'expense' ? '-' : '+'}
                  {formatCurrency(transaction.amount)}
                </strong>
              </div>
              <div className="transaction__actions">
                <button className="icon-button" type="button" onClick={() => onEdit(transaction)} aria-label="Edit">
                  <Edit3 size={17} />
                </button>
                <button className="icon-button icon-button--danger" type="button" onClick={() => onDelete(transaction.id)} aria-label="Delete">
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
