/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import styles from './Profile.module.css';
import SingleEventSyle from '../../components/StyleComponents/StyleHomePageEvent';
import useGetEvent from '../../hooks/useGetEvent';
import { GetUserEvent } from '../../hooks/useGetUserEvent';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const [singleUserEvent, SetSingleUserEvent] = useState();
  const [singleEventsID, SetSingleEventsID] = useState();
  const { eventLists } = useGetEvent();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      GetUserEvent(user.uid).then((data) => {
        SetSingleEventsID(data[0].eventid);
      });
    }
  }, [user]);

  const handlesomethig = (list, listId) => {
    const userEvents = [];
    if (list && listId) {
      list.forEach((elem) => {
        for (let i = 0; i < listId.length; i++) {
          if (elem.id === listId[i]) {
            userEvents.push(elem);
          }
        }
      });
    }
    return userEvents;
  };

  const handleDeleteEvent = () => {};
  // eslint-disable-next-line no-unused-vars
  const handleEventDisplay = (async) => {
    const list = handlesomethig(eventLists, singleEventsID);
    SetSingleUserEvent(list);
  };

  return (
    <div className={styles.profile_container}>
      <div>
        <Button color="inherit" variant="outlined" onClick={handleEventDisplay}>
          Show Favorit events
        </Button>
      </div>
      <div className={styles.profile}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} className={styles.center}>
            {singleUserEvent &&
              singleUserEvent.map((post) => (
                <Grid item xs={12} sm={4} key={post.id}>
                  <SingleEventSyle
                    eventImage={`${post.imgUrl}`}
                    name={post.name}
                    description={post.description}
                    startTime={post.startTime}
                    addToEventList={
                      <Button
                        size="small"
                        onClick={() => handleDeleteEvent(post.id)}
                        value={post.id}
                      >
                        Delete from Favorits
                      </Button>
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
                </Grid>
              ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
