/* eslint-disable no-undef */
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useGetEvent from '../../hooks/useGetEvent';
import ControlledAccordions from '../StyleComponents/StyleUpdatePage';
import styles from './Search.module.css';

function Search() {
  const [searchValue, setSearchValue] = useState('99');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const { eventLists } = useGetEvent();
  const post = eventLists.find((x) => x.name.includes(searchValue));
  return (
    <div>
      <section className="garamond">
        <div className="navy georgia ma0 grow">
          <h2 className="f2">Search your course</h2>
        </div>
        <div className="pa2">
          <input
            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            type="search"
            placeholder="Search People"
            onChange={handleChange}
          />
        </div>
      </section>
      <section>
        <div>
          {post && (
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
                    // onChange={(e) => setDescription(e.target.value)}
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
                      //   value={startTime}
                      //   onChange={(newValue) => {
                      //     setStartTimeTest(newValue);
                      //   }}
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
                      //   onChange={(newValue) => {
                      //     setEndTimeTest(newValue);
                      //   }}
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
                    // onChange={hangleimageUploade}
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
                    // onClick={() => {
                    //   updetePostAction(post.id);
                    // }}
                  >
                    Sbmit
                  </Button>
                ) : (
                  <Button
                    // className={styles.btn}
                    variant="outlined"
                    type="button"
                    // onClick={() => {
                    //   updatePost(post.id);
                    // }}
                  >
                    Update
                  </Button>
                )
              }
              deleteButton={
                <Button
                  //   className={styles.btn}
                  type="button"
                  variant="outlined"
                  //   onClick={() => {
                  //     deletePost(post.id);
                  //   }}
                >
                  Delete
                </Button>
              }
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Search;
