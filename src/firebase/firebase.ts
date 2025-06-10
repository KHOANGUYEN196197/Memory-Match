// src/firebase/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyCacqKPvUgv8SQKVsEPlImeorEjD0SB97w",
  authDomain: "memory-match-f5cc7.firebaseapp.com",
  projectId: "memory-match-f5cc7",
  storageBucket: "memory-match-f5cc7.firebasestorage.app",
  messagingSenderId: "875577782748",
  appId: "1:875577782748:web:d5b12d8113a27962cc9f19",
  measurementId: "G-VSLY5VZ0TL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
