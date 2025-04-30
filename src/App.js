import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import SummaryView from './components/SummaryView';
import './App.css';

import { db } from './firebase';
import { ref, push, onValue } from 'firebase/database';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const transactionsRef = ref(db, 'transactions');
    const unsubscribe = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      const loaded = data ? Object.values(data) : [];
      setTransactions(loaded);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const addTransaction = (transaction) => {
    const transactionsRef = ref(db, 'transactions');
    push(transactionsRef, transaction);
  };

  return (
    <div className="App">
      <h1>Business Tracker</h1>
      <button
        className={`toggle-btn ${showSummary ? 'hide' : 'show'}`}
        onClick={() => setShowSummary(!showSummary)}
      >
        {showSummary ? 'Hide Summary' : 'Show Summary'}
      </button>

      <TransactionForm onAdd={addTransaction} />
      {showSummary ? (
        <SummaryView transactions={transactions} />
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </div>
  );
}

export default App;




