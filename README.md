# Modern Expense Tracker

A responsive expense tracker built with React and Vite. It keeps transactions in local storage, summarizes income and expenses, and includes search plus category/type filters.

## Features

- Dashboard cards for total balance, income, and expenses
- Add, edit, and delete transactions
- Transaction fields for title, amount, category, date, and type
- Search by title or category
- Filter by category and income/expense type
- Local storage persistence
- Responsive card-based layout
- Empty state messaging

## Tech Stack

- React
- Vite
- Plain CSS
- Local Storage

## Project Structure

```text
src/
├── components/
├── hooks/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The app can be deployed to GitHub Pages or Vercel. For GitHub Pages, the Vite base path may need to match the repository name, for example:

```bash
$env:VITE_BASE_PATH="/your-repo-name/"
npm run build
```
