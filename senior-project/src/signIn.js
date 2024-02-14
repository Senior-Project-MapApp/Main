/*import React, { useState } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js"
import { Button } from "@mui/material";

export function getAuthentication(authenticated){
    return authenticated;
}

export default function SignIn(){
// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCHVKTXKKanaOKPR0iUnHHQ0XU3ZW3IOU0",
        authDomain: "task-map-7fc4c.firebaseapp.com",
        databaseURL: "https://task-map-7fc4c-default-rtdb.firebaseio.com",
        projectId: "task-map-7fc4c",
        storageBucket: "task-map-7fc4c.appspot.com",
        messagingSenderId: "198408367476",
        appId: "1:198408367476:web:bb58ff1690677da05a9021"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/calendar'); //See, edit, share, and permanently delete all the calendars you can access using Google Calendar
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); //See and download your contacts
    provider.addScope('https://www.googleapis.com/auth/user.addresses.read'); //View your street addresses
    provider.setCustomParameters({
        prompt: "select_account"
    })

    const [authenticated, setAuthenticated] = useState(false);
    onAuthStateChanged(auth, user => {
        if (user != null) {
            console.log("Logged in: " + user.displayName);
            setAuthenticated(true);
            getAuthentication(authenticated);
        } else {
            console.log("Logged in: null");
            setAuthenticated(false);
            getAuthentication(authenticated);
        }
    })

    let user;
    function HandleSignIn() {
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithPopup(auth, provider).then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                user = result.user;
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });

        return user;
    }

    function HandleSignOut() {
        signOut(auth);
    }

    return(
        <>
        <Button onClick={HandleSignIn}>Sign In With Google</Button>
        </>
    );
}
*/