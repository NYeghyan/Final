import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';


// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireBaseApp);
export const storage = getStorage();

export default fireBaseApp;
