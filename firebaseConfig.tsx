// firebase.ts
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Dane konfiguracyjne Firebase (na podstawie Twojego pliku plist)
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

// Inicjalizacja Firebase tylko raz
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Jeśli Firebase już jest zainicjalizowany
}

export { firebase };
