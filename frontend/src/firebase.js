// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "REPLACE_WITH_REAL_API_KEY",
  authDomain: "REPLACE_WITH_REAL_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_REAL_PROJECT_ID",
  storageBucket: "REPLACE_WITH_REAL_BUCKET",
  messagingSenderId: "REPLACE_WITH_REAL_SENDER_ID",
  appId: "REPLACE_WITH_REAL_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
