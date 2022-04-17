import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EmptyScreen({ img, title, icon }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'grey.100',
        height: 'calc(100vh - 64px)',
      }}
    >
      {icon}

      {img && (
        <div>
          <img src={img} alt="empty icon" width={100} />
        </div>
      )}
      <Typography component="h2" variant="h4">
        {title}
      </Typography>
    </Box>
  );
}
