import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_YepbZXl6kx_IYUZTmahSh5rXw0FJCM0",
  authDomain: "rf-todo-f51d1.firebaseapp.com",
  projectId: "rf-todo-f51d1",
  storageBucket: "rf-todo-f51d1.firebasestorage.app",
  messagingSenderId: "882963027601",
  appId: "1:882963027601:web:c8d78ab10529ad2b4dd130",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
