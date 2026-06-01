import { Search } from 'lucide-react';
import { categories, transactionTypes } from '../utils/categories.js';

export default function Filters({ filters, onChange }) {
  function updateFilter(event) {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  }

  return (
    <section className="panel filters">
      <div className="search-field">
        <Search size={18} aria-hidden="true" />
        <input
          aria-label="Search transactions"
          name="search"
          onChange={updateFilter}
          placeholder="Search transactions"
          value={filters.search}
        />
      </div>

      <label>
        Category
        <select name="category" onChange={updateFilter} value={filters.category}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Type
        <select name="type" onChange={updateFilter} value={filters.type}>
          <option value="all">All types</option>
          {transactionTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
