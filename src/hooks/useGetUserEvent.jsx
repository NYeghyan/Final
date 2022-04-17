import { collection, where, getDocs, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const GetUserEvent = async (userId) => {
  const allUsereventsID = query(
    collection(db, 'usersevents'),
    where('userid', '==', userId)
  );

  const data = [];
  const querySnapshot = await getDocs(allUsereventsID);
  querySnapshot.forEach((docs) => {
    const eventId = docs.data();
    data.push(eventId);
  });

  return data;
};
