// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDFOYMxjtjL8iqMmj3XHc39RzEuyCkDGK4",
  authDomain: "business-tracker-672bb.firebaseapp.com",
  databaseURL: "https://business-tracker-672bb-default-rtdb.firebaseio.com", // ✅ Important!
  projectId: "business-tracker-672bb",
  storageBucket: "business-tracker-672bb.appspot.com",
  messagingSenderId: "190355834574",
  appId: "1:190355834574:web:73b3d013b9b6863216f29f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
