import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from './firebase';

import styles from "./Login.module.css";

export const Login:React.FC = (props:any) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(()=> {
        const unSub = auth.onAuthStateChanged((user) => {
            user && props.history.push("/");
        })
        return ()=>unSub();
    },[props.history]);

    return (
        <div className={styles.login_root}>
            <h1>{isLogin ? "Login" : "Register"}</h1>
            <br />
            <FormControl>
                <TextField 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    name="email"
                    label="E-mail"
                    value={email}
                    onChange={(e)=> {
                        setEmail(e.target.value);
                    }}
                />
            </FormControl>
            <br />
            <FormControl>
                <TextField 
                    InputLabelProps={{
                        shrink: true,
                    }} 
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e)=> {
                        setPassword(e.target.value);
                    }}
                />
            </FormControl>
            <br />
            <Button variant="contained" color="primary" size="small" onClick={
                isLogin ? async () => {
                    try {
                        await signInWithEmailAndPassword(auth, email, password);
                        props.history.push("/");
                    } catch (error:any) {
                        alert(error.message);
                    }
                } : async () => {
                    try {
                        await createUserWithEmailAndPassword(auth, email,password);
                        props.history("/");
                    } catch (error:any) {
                        alert(error.message);
                    }
                }
            } >
                {isLogin ? "login":"register"}
            </Button>
            <br />
            <Typography align="center">
                <span onClick={()=>setIsLogin(!isLogin)}>
                    {isLogin ? "Create new account ?" : "Back to login"}
                </span>
            </Typography> 
        </div>
    )
}
