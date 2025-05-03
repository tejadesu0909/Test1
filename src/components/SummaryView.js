import React, { useState } from 'react';

const SummaryView = ({ transactions }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const getYear = (dateStr) => parseInt(dateStr.split('-')[0], 10);
  const getMonth = (dateStr) => parseInt(dateStr.split('-')[1], 10); // 1-based

  const allYears = [...new Set(transactions.map(t => getYear(t.date)))].sort();
  const allMonths = [...new Set(
    transactions
      .filter(t => getYear(t.date) === Number(selectedYear))
      .map(t => getMonth(t.date))
  )].sort((a, b) => a - b);

  const filtered = transactions.filter(
    t =>
      getYear(t.date) === Number(selectedYear) &&
      getMonth(t.date) === Number(selectedMonth)
  );

  // ✅ Group by date
  const groupedByDate = {};
  filtered.forEach((txn) => {
    const { date, type, amount } = txn;
    if (!groupedByDate[date]) {
      groupedByDate[date] = { restaurant: 0, other: 0, sales: 0 };
    }
    if (type === 'Restaurant Expense') groupedByDate[date].restaurant += amount;
    else if (type === 'Other Expense') groupedByDate[date].other += amount;
    else if (type === 'Sales') groupedByDate[date].sales += amount;
  });

  const sortedDates = Object.keys(groupedByDate).sort();

  let totalRestaurant = 0;
  let totalOther = 0;

  return (
    <div>
      <h2>Summary</h2>

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
            {sortedDates.map((date) => {
              const { restaurant, other, sales } = groupedByDate[date];
              const expenses = restaurant + other;
              const profit = sales - expenses;
              totalRestaurant += restaurant;
              totalOther += other;

              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{restaurant.toFixed(2)}</td>
                  <td>{other.toFixed(2)}</td>
                  <td>{expenses.toFixed(2)}</td>
                  <td>{sales.toFixed(2)}</td>
                  <td>{profit.toFixed(2)}</td>
                  <td>{totalRestaurant.toFixed(2)}</td>
                  <td>{totalOther.toFixed(2)}</td>
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
