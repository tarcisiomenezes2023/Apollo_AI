// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Adicione Firestore para o banco de dados

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpfWPp2Jsijxhslg7PV2vkbXx1K0TBZas",
  authDomain: "apollodb-1ce91.firebaseapp.com",
  projectId: "apollodb-1ce91",
  storageBucket: "apollodb-1ce91.appspot.com",
  messagingSenderId: "80302137507",
  appId: "1:80302137507:web:1ceabd754084ba4386df16",
  measurementId: "G-JW5HHMXTXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
