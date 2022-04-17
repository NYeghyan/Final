import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBarForAdmin() {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('createevent');
  };

  const handleHome = () => {
    navigate('/');
  };
  const handleUpdateEvent = () => {
    navigate('updateEvent');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Button
            variant="contained"
            onClick={handleCreateEvent}
            style={{ margin: 15 }}
          >
            Create Post
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateEvent}
            style={{ margin: 15 }}
          >
            Update Post
          </Button>
          <Button
            variant="contained"
            onClick={handleHome}
            style={{ margin: 15 }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
