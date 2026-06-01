import { ReceiptText } from 'lucide-react';

export default function EmptyState({ hasTransactions }) {
  return (
    <div className="empty-state">
      <div className="empty-state__art">
        <ReceiptText size={42} aria-hidden="true" />
      </div>
      <h3>{hasTransactions ? 'No matching transactions' : 'Your ledger is ready'}</h3>
      <p>
        {hasTransactions
          ? 'Try adjusting your filters or search phrase to find the entry you need.'
          : 'Add your first income or expense to start tracking your financial flow.'}
      </p>
    </div>
  );
}
