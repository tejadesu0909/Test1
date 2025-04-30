import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((txn, index) => (
          <tr key={index}>
            <td>{txn.date}</td>
            <td>{txn.type}</td>
            <td>{txn.amount}</td>
            <td>{txn.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
