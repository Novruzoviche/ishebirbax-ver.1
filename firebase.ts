import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAQ8VFNxE_0TaIu4WuZ9bZVzRKQgaQ_sko",
  authDomain: "isebirbax.firebaseapp.com",
  projectId: "isebirbax",
  storageBucket: "isebirbax.firebasestorage.app",
  messagingSenderId: "310208859875",
  appId: "1:310208859875:web:bfc8cdb5f893ba75ed7fd6",
  measurementId: "G-46Q9V7MF15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;