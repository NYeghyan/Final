import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingScreen() {
  return (
    <Backdrop
      open
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
}
