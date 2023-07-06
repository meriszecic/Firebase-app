import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAw8M2elwvba6rVcdMrmvzD0Q8xFwu_BCg",
    authDomain: "systemduo-3ff48.firebaseapp.com",
    databaseURL: "https://systemduo-3ff48-default-rtdb.firebaseio.com",
    projectId: "systemduo-3ff48",
    storageBucket: "systemduo-3ff48.appspot.com",
    messagingSenderId: "828256388172",
    appId: "1:828256388172:web:1875edf42c2b20d7cde0e9",
    measurementId: "G-Z8L6LFJG5X"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
