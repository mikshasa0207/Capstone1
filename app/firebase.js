// Import Firebase core + auth
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config (✅ keep this secret in production)
const firebaseConfig = {
  apiKey: "AIzaSyA4ppvZu-5a4yVoT04PrgXaumfFNJwA5Yo",
  authDomain: "capstone1-2b578.firebaseapp.com",
  projectId: "capstone1-2b578",
  storageBucket: "capstone1-2b578.firebasestorage.app",
  messagingSenderId: "120926309670",
  appId: "1:120926309670:web:3e76d56e3b3b17d02785e7"
};

// ✅ Avoid reinitializing Firebase if already initialized
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ✅ Export auth so it can be used in AuthContext.jsx
export const auth = getAuth(app);
