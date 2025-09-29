import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-8101432412-26f20',
  appId: '1:748309421975:web:52c746af9cc206d7e0aed2',
  apiKey: 'AIzaSyAaTlAemowANQp463umEpWX069g-rQdlms',
  authDomain: 'studio-8101432412-26f20.firebaseapp.com',
  messagingSenderId: '748309421975',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
