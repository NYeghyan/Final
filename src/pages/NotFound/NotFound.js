import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';

export default function NotFound() {
  return (
    <EmptyScreen
      title="Not Found"
      icon={<SentimentVeryDissatisfiedIcon sx={{ fontSize: '4em' }} />}
    />
  );
}
