import React, { useState } from 'react';
// import './SummaryView.css'; // optional, if you're separating styles

const SummaryView = ({ transactions }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const getYear = (date) => new Date(date).getFullYear();
  const getMonth = (date) => new Date(date).getMonth() + 1;

  const allYears = [...new Set(transactions.map(t => getYear(t.date)))];
  const allMonths = [...new Set(
    transactions
      .filter(t => getYear(t.date) === Number(selectedYear))
      .map(t => getMonth(t.date))
  )];

  const filteredTransactions = transactions.filter(
    t => getYear(t.date) === Number(selectedYear) && getMonth(t.date) === Number(selectedMonth)
  );

  const summaryByDate = {};
  filteredTransactions.forEach(txn => {
    const date = txn.date;
    if (!summaryByDate[date]) {
      summaryByDate[date] = { restaurant: 0, other: 0, sales: 0 };
    }

    if (txn.type === 'Restaurant Expense') summaryByDate[date].restaurant += txn.amount;
    else if (txn.type === 'Other Expense') summaryByDate[date].other += txn.amount;
    else if (txn.type === 'Sales') summaryByDate[date].sales += txn.amount;
  });

  const dates = Object.keys(summaryByDate).sort();
  let totalRestaurant = 0;
  let totalOther = 0;

  return (
    <div>
      <h2>Summary</h2>

      {/* Styled Year/Month Filters */}
      <div className="summary-filters">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          {allYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          disabled={!selectedYear}
        >
          <option value="">Select Month</option>
          {allMonths.map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {selectedYear && selectedMonth && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Restaurant</th>
              <th>Other</th>
              <th>Total Expenses</th>
              <th>Sales</th>
              <th>Profit</th>
              <th>Total Restaurant</th>
              <th>Total Other</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date) => {
              const r = summaryByDate[date].restaurant;
              const o = summaryByDate[date].other;
              const s = summaryByDate[date].sales;
              const expenses = r + o;
              const profit = s - expenses;

              totalRestaurant += r;
              totalOther += o;

              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{r}</td>
                  <td>{o}</td>
                  <td>{expenses}</td>
                  <td>{s}</td>
                  <td>{profit}</td>
                  <td>{totalRestaurant}</td>
                  <td>{totalOther}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SummaryView;
