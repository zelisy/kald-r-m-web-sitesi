// /src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7jzuuLuXkdn5ONxM-JWqyti-YqWD-xaY",
  authDomain: "sahaf-918d6.firebaseapp.com",
  projectId: "sahaf-918d6",
  storageBucket: "sahaf-918d6.firebasestorage.app",
  messagingSenderId: "97622790826",
  appId: "1:97622790826:web:2240bf0db89e17e9beb6d3"
};

const app = initializeApp(firebaseConfig);

// 🔽 Burada eksik olan export'lar vardı, ekledik
export const db = getFirestore(app);
export const storage = getStorage(app);
