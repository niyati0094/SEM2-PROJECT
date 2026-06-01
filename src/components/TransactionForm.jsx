import { useEffect, useMemo, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { categories, transactionTypes } from '../utils/categories.js';

const defaultForm = {
  title: '',
  amount: '',
  category: categories[0],
  date: new Date().toISOString().slice(0, 10),
  type: 'expense',
};

export default function TransactionForm({ editingTransaction, onCancelEdit, onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({ ...editingTransaction, amount: String(editingTransaction.amount) });
      return;
    }

    setForm(defaultForm);
  }, [editingTransaction]);

  const submitLabel = useMemo(
    () => (editingTransaction ? 'Save transaction' : 'Add transaction'),
    [editingTransaction],
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!form.title.trim() || Number.isNaN(amount) || amount <= 0) {
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      amount,
      id: editingTransaction?.id ?? crypto.randomUUID(),
    });

    setForm(defaultForm);
  }

  return (
    <form className="panel transaction-form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <div>
          <span>Transaction</span>
          <h2>{editingTransaction ? 'Edit entry' : 'Add new entry'}</h2>
        </div>
        {editingTransaction ? (
          <button className="icon-button" type="button" onClick={onCancelEdit} aria-label="Cancel edit">
            <X size={18} />
          </button>
        ) : null}
      </div>

      <label>
        Title
        <input
          name="title"
          value={form.title}
          onChange={updateField}
          placeholder="Client payment, groceries..."
          required
        />
      </label>

      <div className="form-grid">
        <label>
          Amount
          <input
            min="0.01"
            name="amount"
            onChange={updateField}
            placeholder="0.00"
            step="0.01"
            type="number"
            value={form.amount}
            required
          />
        </label>

        <label>
          Date
          <input name="date" onChange={updateField} type="date" value={form.date} required />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Category
          <select name="category" onChange={updateField} value={form.category}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Type
          <select name="type" onChange={updateField} value={form.type}>
            {transactionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button className="primary-button" type="submit">
        {editingTransaction ? <Check size={18} /> : <Plus size={18} />}
        {submitLabel}
      </button>
    </form>
  );
}
