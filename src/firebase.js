
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyAJI3E-DpTOaPSpCfJ14pc55qRkzZwXv8s",
  authDomain: "expense-tracker-c21ed.firebaseapp.com",
  databaseURL: "https://expense-tracker-c21ed-default-rtdb.firebaseio.com/",
  projectId: "expense-tracker-c21ed",
  storageBucket: "expense-tracker-c21ed.firebasestorage.app",
  messagingSenderId: "689202301303",
  appId: "1:689202301303:web:643e5d1df8aa081e5a7972"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);