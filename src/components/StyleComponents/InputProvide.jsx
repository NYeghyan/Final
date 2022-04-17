import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const paperStyle = {
  padding: 20,
  height: 'auto',
  width: 400,
  margin: '20px auto',
};

export function SimpleCardForUpdateEvent({ ...children }) {
  return (
    // poxel Qarti
    <Paper elevation={10} style={paperStyle}>
      <List>
        <ListItem disablePadding>
          <ListItemText>
            <Typography>Name:</Typography>
            {children.name}
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemText>
            <Typography>Description: </Typography>
            {children.description}
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemText>
            <Typography>Start Time:</Typography>
            {children.startTime}
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemText>
            <Typography>End Time: </Typography>
            {children.endTime}
          </ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>
            <Typography>image </Typography>
            {children.eventImage}
          </ListItemText>
        </ListItem>
      </List>
      {children.updateButton}
      {children.deleteButton}
      {children.updateButtonForCreateEvent}
    </Paper>
  );
}
