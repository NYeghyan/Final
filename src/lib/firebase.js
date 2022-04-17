import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBBLZQECp0jFBK5-5qmfzZFAUJEE0d7Kus',
  authDomain: 'event-management-55809.firebaseapp.com',
  databaseURL:
    'https://event-management-55809-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'event-management-55809',
  storageBucket: 'event-management-55809.appspot.com',
  messagingSenderId: '768695642405',
  appId: '1:768695642405:web:4a890e28c1bfdb373452cc',
  measurementId: 'G-GXWEX3VHFM',
};
// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireBaseApp);
export const storage = getStorage();

export default fireBaseApp;
