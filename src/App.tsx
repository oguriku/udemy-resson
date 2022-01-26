import React, { useEffect } from 'react';
import { useState } from 'react';
import { collection, onSnapshot , addDoc} from "firebase/firestore";
import { FormControl, List, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { auth, db } from './firebase';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { TaskItem } from './TaskItem';
import styles from "./App.module.css";
import { onAuthStateChanged, signOut } from 'firebase/auth';

const useStyles = makeStyles({
  field: {
    mardinTop:30,
    mardinBottm:20,
  },
  list: {
    margin:"auto",
    width:"40%",
  }
});


const App: React.FC = (props:any) => {
  const [tasks, setTasks] = useState([{id:"", title:""}]);
  const [input, setInput] = useState("");

  const classes = useStyles();

  useEffect(() => {
    const unSub = onSnapshot(collection(db,"tasks"), (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({id: doc.id, title: doc.data().title}))
      );
    });
    return () => unSub();
  },[]);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth,(user) => {
      !user && props.history.push("login");
    })
    return ()=>unSub();
  },[])

  const newTask = () => {
    addDoc(collection(db, "tasks"), {title: input});
    setInput("");
  }

  const signOutBotton = async () => {
    try {
      await signOut(auth);
      props.history.push("login");
    } catch (error:any) {
      alert(error.message);
    }
  }

  return (
    <div className={styles.app_root}>
      <h1>Todo App by React/Firebase</h1>
      <button className={styles.app_logout} onClick={signOutBotton}><ExitToAppIcon/></button>

      <br />
      <FormControl>
        <TextField
        className={classes.field}
        InputLabelProps={{
          shrink:true,
        }} 
        label="New task ?"
        value={input}
        onChange={(e)=>{setInput(e.target.value)}}
        />
      </FormControl>
      <button className={styles.app_icon} disabled={!input} onClick={newTask}><AddToPhotosIcon/></button>
      <List className={classes.list}>
        {tasks.map((task) => <TaskItem key={task.id} id={task.id} title={task.title} />)}
      </List>
    </div>
  );
}

export default App;
