import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function useGetEvent() {
  const [eventLists, setEventList] = useState([]);
  const eventRef = collection(db, 'event');

  useEffect(() => {
    const allevents = onSnapshot(eventRef, (snapshot) => {
      setEventList(
        snapshot.docs.map((alldocs) => ({
          ...alldocs.data(),
          id: alldocs.id,
          isEditable: false,
        }))
      );
    });
    return () => allevents();
  }, []);
  return { eventLists, setEventList };
}
