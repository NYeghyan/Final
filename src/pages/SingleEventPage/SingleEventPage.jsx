import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useGetEvent from '../../hooks/useGetEvent';
import styles from './SingleEventPage.module.css';

export default function SingleEventPage() {
  const { eventid } = useParams();
  const { eventLists } = useGetEvent();
  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        {eventLists
          .filter((event) => event.id === eventid)
          .map((event) => (
            <div key={event.id} className={styles.singleEventDiv}>
              <div className={styles.eventImage}>
                <img src={`${event.imgUrl}`} alt="event" />
              </div>
              <Typography
                variant="h2"
                component="div"
                textAlign="center"
                sx={{ maxWidth: '60%' }}
              >
                {event.name}
                <Typography color="text.secondary">
                  Description: {event.description}
                </Typography>
                <Typography color="text.secondary">
                  Start Time:
                  {new Date(event.startTime.seconds * 1000).toLocaleString(
                    'en-GB',
                    {
                      timeZone: 'UTC',
                    }
                  )}
                </Typography>
                <Typography color="text.secondary">
                  End Time:
                  {new Date(event.endTime.seconds * 1000).toLocaleString(
                    'en-GB',
                    {
                      timeZone: 'UTC',
                    }
                  )}
                </Typography>
              </Typography>
            </div>
          ))}
      </Box>
    </Container>
  );
}
