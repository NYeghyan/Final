/* eslint-disable prefer-destructuring */
import { React, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { db, storage } from '../../lib/firebase';
import { SimpleCardForUpdateEvent as SimpleCard } from '../../components/StyleComponents/InputProvide';

import styles from './CreateEvent.module.css';

function CreatePost() {
  const [loadingEffect, setLoadingEffect] = useState(false);
  const [allValues, setAllValues] = useState({
    name: '',
    description: '',
  });
  const [startTime, setStartTimeTest] = useState(
    new Date('2022-04-18T21:11:54')
  );
  const [endTime, setEndTimeTest] = useState(new Date('2022-04-18T21:11:54'));

  const [eventImg, setEventImg] = useState();

  const postsCollectionRef = collection(db, 'event');
  const navigate = useNavigate();

  const sbmitEvent = async () => {
    setLoadingEffect(true);
    const description = allValues.description;
    const name = allValues.name;
    const storageRef = ref(storage, `EventImg/${name}`);

    await uploadBytes(storageRef, eventImg);
    const imgUrl = (
      await getDownloadURL(ref(storage, `EventImg/${name}`))
    ).toString();
    await addDoc(postsCollectionRef, {
      description,
      endTime,
      name,
      startTime,
      imgUrl,
    });
    setLoadingEffect(false);
    navigate('/updateEvent');
  };

  const handleSubmit = (e) => {
    sbmitEvent();
    e.preventDefault();
  };

  const handleChangeForInputs = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const hangleimageUploade = (e) => {
    const file = e.target.files[0];
    setEventImg(file);
  };

  return (
    <div className={styles.createPostPage}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingEffect}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit}>
        <SimpleCard
          name={
            <TextField
              required
              id="standard-required"
              label="Name"
              variant="outlined"
              name="name"
              value={allValues.name}
              onChange={handleChangeForInputs}
            />
          }
          description={
            <TextareaAutosize
              required
              id="standard-required"
              label="Name"
              variant="outlined"
              minRows={7}
              name="description"
              value={allValues.description}
              onChange={handleChangeForInputs}
              style={{ width: '100%' }}
            />
          }
          startTime={
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date&Time picker"
                name="startTime"
                value={startTime}
                onChange={(newValue) => {
                  setStartTimeTest(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                setStartTimeTest
              />
            </LocalizationProvider>
          }
          endTime={
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date&Time picker"
                name="endTime"
                value={endTime}
                onChange={(newValue) => {
                  setEndTimeTest(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          }
          eventImage={
            <TextField
              variant="outlined"
              accept="image/*"
              id="raised-button-file"
              name="image"
              multiple
              type="file"
              onChange={hangleimageUploade}
            />
          }
          updateButtonForCreateEvent={
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          }
        />
      </form>
    </div>
  );
}

export default CreatePost;
