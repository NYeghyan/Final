import { React } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function SingleEventSyle({ ...children }) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={children.eventImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {children.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {children.description.seconds}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {children.startTime.seconds}
        </Typography>
      </CardContent>
      <CardActions>
        {children.addToEventList}
        {children.learnMore}
      </CardActions>
    </Card>
  );
}
