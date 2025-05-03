import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !type || !amount) return;

    onAdd({ date, type, amount: parseFloat(amount), reason });
    setDate('');
    setType('');
    setAmount('');
    setReason('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="Restaurant Expense">Restaurant Expense</option>
          <option value="Other Expense">Other Expense</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="reason">Reason / Description</label>
        <input
          id="reason"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason or Description"
        />
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
