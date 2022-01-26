import React from 'react'
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { Grid, ListItem, TextField } from '@material-ui/core';
import { useState } from 'react';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import DeleteOutlineOutLinedIcon from "@material-ui/icons/DeleteOutlineOutlined"

import { db } from './firebase';
import styles from "./TaskItem.module.css"



interface PROPS {
    id:string;
    title:string;
}

export const TaskItem: React.FC<PROPS> = (props) => {
    const [title, setTitle] = useState(props.title);

    const editTask = async () => {
        const newTask = doc(db, "tasks",props.id);
        await setDoc(newTask,{title:title},{merge:true})
    }

    const deleteTask = async () => {
        await deleteDoc(doc(db,"tasks",props.id));
    }

    return (
        <div>
            <ListItem>
                <h2>{props.title}</h2>
                <Grid container justifyContent="flex-end">
                    <TextField InputLabelProps={{
                        shrink:true,
                    }} 
                    label="Edit task" value={title} 
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>setTitle(e.target.value)}/>
                </Grid>
                <button className={styles.taskitem_icon} onClick={editTask}><EditOutlinedIcon /></button>
                <button className={styles.taskitem_icon} onClick={deleteTask}><DeleteOutlineOutLinedIcon /></button>
            </ListItem>
        </div>
    )
}
