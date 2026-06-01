import { ArrowDownCircle, ArrowUpCircle, WalletCards } from 'lucide-react';
import { formatCurrency } from '../utils/currency.js';

const icons = {
  balance: WalletCards,
  income: ArrowUpCircle,
  expense: ArrowDownCircle,
};

export default function SummaryCard({ title, amount, tone }) {
  const Icon = icons[tone] || WalletCards;

  return (
    <article className={`summary-card summary-card--${tone}`}>
      <div className="summary-card__icon">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div>
        <p>{title}</p>
        <strong>{formatCurrency(amount)}</strong>
      </div>
    </article>
  );
}
