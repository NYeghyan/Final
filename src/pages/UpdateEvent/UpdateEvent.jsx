/* eslint-disable object-shorthand */
import { React, useState } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import useGetEvent from '../../hooks/useGetEvent';
// import { SimpleCardForUpdateEvent as SimpleCard } from '../../components/StyleComponents/InputProvide';
import ControlledAccordions from '../../components/StyleComponents/StyleUpdatePage';
import Search from '../../components/Search/Search';
import styles from './UpdateEvent.module.css';

function UpdateEvent() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const [eventImg, setEventImg] = useState();

  const [startTime, setStartTimeTest] = useState(new Date().toLocaleString());
  const [endTime, setEndTimeTest] = useState(new Date().toLocaleString());

  const postsCollectionRef = collection(db, 'event');

  const { eventLists, setEventList } = useGetEvent();

  const updetePostAction = async (id) => {
    const updateRef = doc(db, 'event', id);

    updateDoc(updateRef, {
      name: name,
      description: description,
      startTime: startTime,
      endTime: endTime,
      imgUrl: eventImg,
    });

    const data = await getDocs(postsCollectionRef);
    const result = data.docs.map((alldocs) => ({
      ...alldocs.data(),
      id: alldocs.id,
      isEditable: false,
    }));
    setEventList(result);
  };

  const hangleimageUploade = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `EventImg/${e.target.name}`);
    await uploadBytes(storageRef, file);
    const imgUrl = (
      await getDownloadURL(ref(storage, `EventImg/${e.target.name}`))
    ).toString();

    setEventImg(imgUrl);
  };

  const updatePost = (itemid) => {
    const editedList = eventLists.map((item) =>
      item.id === itemid ? { ...item, isEditable: true } : item
    );
    const setState = eventLists.find((x) => x.id === itemid);
    setName(setState.name);
    setDescription(setState.description);
    setEventImg(setState.imgUrl);
    setEventList(editedList);
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, 'event', id);
    await deleteDoc(postDoc);
    const desertRef = ref(storage, `EventImg/${doc.name}`);
    deleteObject(desertRef);
  };

  return (
    <>
      <Search />
      <div>
        <h1>All Events</h1>
      </div>
      <div className={styles.updateEvent}>
        {eventLists &&
          eventLists.map((post) => (
            <div
              key={post.id}
              style={{ width: '20%' }}
              sx={{ bgcolor: '#cfe8fc', minHeight: '50%' }}
            >
              <form>
                <ControlledAccordions
                  name={
                    post.isEditable ? (
                      <TextField
                        variant="outlined"
                        name="name"
                        required
                        id="standard-required"
                        label="name"
                        defaultValue={post.name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <Typography variant="body2" component="h1">
                        {post.name}
                      </Typography>
                    )
                  }
                  description={
                    post.isEditable ? (
                      <TextareaAutosize
                        name="description"
                        required
                        minRows={7}
                        variant="outlined"
                        id="standard-required"
                        label="Required"
                        defaultValue={post.description}
                        style={{ width: '100%' }}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    ) : (
                      post.description
                    )
                  }
                  startTime={
                    post.isEditable ? (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="Date&Time picker"
                          name="startTime"
                          value={post.startTime.seconds}
                          onChange={(newValue) => {
                            setStartTimeTest(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          setStartTimeTest
                        />
                      </LocalizationProvider>
                    ) : (
                      post.startTime.seconds
                    )
                  }
                  endTime={
                    post.isEditable ? (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="Date&Time picker"
                          name="endTime"
                          value={endTime}
                          onChange={(newValue) => {
                            setEndTimeTest(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          setStartTimeTest
                        />
                      </LocalizationProvider>
                    ) : (
                      post.startTime.seconds
                    )
                  }
                  eventImage={
                    post.isEditable ? (
                      <TextField
                        variant="outlined"
                        accept="image/*"
                        id="raised-button-file"
                        name="image"
                        multiple
                        type="file"
                        onChange={hangleimageUploade}
                      />
                    ) : (
                      <LazyLoadImage
                        src={post.imgUrl}
                        alt="user name"
                        className={styles.img}
                      />
                    )
                  }
                  updateButton={
                    post.isEditable ? (
                      <Button
                        className={styles.btn}
                        variant="outlined"
                        type="button"
                        onClick={() => {
                          updetePostAction(post.id);
                        }}
                      >
                        Sbmit
                      </Button>
                    ) : (
                      <Button
                        className={styles.btn}
                        variant="outlined"
                        type="button"
                        onClick={() => {
                          updatePost(post.id);
                        }}
                      >
                        Update
                      </Button>
                    )
                  }
                  deleteButton={
                    <Button
                      className={styles.btn}
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Delete
                    </Button>
                  }
                />
              </form>
            </div>
          ))}
      </div>
    </>
  );
}
export default UpdateEvent;
