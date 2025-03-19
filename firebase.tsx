// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0zyLX1f2zta3NZULobDZKSPa-SvdHhig",
  authDomain: "studenckiswiat-4efc2.firebaseapp.com",
  databaseURL: "https://studenckiswiat-4efc2.firebaseio.com",
  projectId: "studenckiswiat-4efc2",
  storageBucket: "studenckiswiat-4efc2.appspot.com",
  messagingSenderId: "397127690125",
  appId: "1:397127690125:web:1d9a04dd04ac54facaffc4",
  measurementId: "G-YR0ZL7GHX2"
};

// Inicjalizacja aplikacji Firebase
const app = initializeApp(firebaseConfig);

// Eksportuj instancje Firebase Auth i Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);
