import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt5TOlpowM7DoMJUH6I_YA7fiWmB82h7M",
  authDomain: "activesocialnetwork-cd142.firebaseapp.com",
  projectId: "activesocialnetwork-cd142",
  storageBucket: "activesocialnetwork-cd142.appspot.com",
  messagingSenderId: "676241238504",
  appId: "1:676241238504:web:235b24e65fb8ac124edc5d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { auth, app,database,firestore}