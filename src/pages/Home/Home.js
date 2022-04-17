import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useGetEvent from '../../hooks/useGetEvent';
import { GetUserEvent } from '../../hooks/useGetUserEvent';
import { useUserAuth } from '../../hooks/useAuth';
import SingleEventSyle from '../../components/StyleComponents/StyleHomePageEvent';
import StyleHomePagebaner from '../../components/StyleComponents/StyleHomePagebaner';
import styles from './Home.module.css';

export default function Home() {
  const { ref: magicSectionRef, inView: magicSectionIsVisible } = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });
  const [favoritEventExist, setFavoritEventExist] = useState();
  const { eventLists } = useGetEvent();
  const { user } = useUserAuth();
  const navigate = useNavigate();
  // const handleLearnMore = (eventID) => {
  //   navigate(`/singleEventPage/${eventID}`);
  //   setSingleEventID(eventID);
  // };

  useEffect(() => {
    if (user) {
      GetUserEvent(user.uid).then((data) => {
        setFavoritEventExist(`${data[0]}.eventid`);
      });
    }
  }, [user]);

  const handleAddToEventList = async (eventid) => {
    //  await addDoc(singleEventRef, {
    //    event: {  eventid,  userid }
    //  });

    const userid = user.uid;
    const singleEventRefUpdate = doc(db, 'usersevents', userid);

    if (favoritEventExist) {
      await updateDoc(singleEventRefUpdate, {
        eventid: arrayUnion(eventid),
      });
    } else {
      await setDoc(
        singleEventRefUpdate,
        { userid, eventid: [eventid] },
        { merge: true }
      );
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <StyleHomePagebaner />
      <div className={styles.home}>
        <h1 ref={magicSectionRef} className={styles.divayder}>
          All Events
        </h1>
        <Box sx={{ flexGrow: 1 }} className={styles.mt100}>
          <div className={styles.items}>
            {eventLists &&
              eventLists.map((post) => (
                <div key={post.id}>
                  <div
                    className={
                      magicSectionIsVisible
                        ? styles.animateRocket
                        : styles.teest
                    }
                  >
                    <SingleEventSyle
                      eventImage={`${post.imgUrl}`}
                      name={post.name}
                      description={post.description}
                      startTime={post.startTime.seconds}
                      addToEventList={
                        user ? (
                          <Button
                            size="small"
                            onClick={() => handleAddToEventList(post.id)}
                            value={post.id}
                          >
                            Add To Favorits
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            onClick={handleRedirectToLogin}
                            value={post.id}
                          >
                            Add To Favorits
                          </Button>
                        )
                      }
                      learnMore={
                        <Button size="small">
                          <Link
                            to={`/singleEventPage/${post.id}`}
                            style={{ textDecoration: 'none', color: '#9c27b0' }}
                          >
                            Learn More
                          </Link>
                        </Button>
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
        </Box>
      </div>
    </>
  );
}
