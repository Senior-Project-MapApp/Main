import React, {useState} from "react";
//import { getAuthentication } from "./signIn";
import data from "./example.json";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js"
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"
import SignIn from "./signIn";
import Home from "./home";
import Map from "./map";
import Calendar from "./calendar";
import Profile from "./profile";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./navbar";
import {Button} from "@mui/material";



function App() {
  const [sign, setSignIn] = useState(false);
  // Firebase configuration
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
  const db = getDatabase(app);
  const provider = new GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/calendar'); //See, edit, share, and permanently delete all the calendars you can access using Google Calendar
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); //See and download your contacts
  provider.addScope('https://www.googleapis.com/auth/user.addresses.read'); //View your street addresses
  provider.setCustomParameters({
    prompt: "select_account"
  })

  //const [authenticated, setAuthenticated] = useState(false);
  let authenticated = false;
  onAuthStateChanged(auth, user => {
    if (user != null) {
      console.log("Logged in: " + user.displayName);
      authenticated = true;
      setSignIn(authenticated);
      if (authenticated) {
        console.log("Authenticated");
      } else {
        console.log("Not Authenticated");
      }
    } else {
      console.log("Logged in: null");
      authenticated = false;
      setSignIn(authenticated);
      if (authenticated) {
        console.log("Authenticated");
      } else {
        console.log("Not Authenticated");
      }
    }
  });

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
  return (
    //This is where the sign in page will be
    //Once the user signs in, they will be sent to the home page
  <>
    {sign ? <Button onClick={HandleSignOut}>Sign Out</Button>   : <Button onClick={HandleSignIn}>Sign In With Google</Button>}
      {sign ? <Navbar data={data}/> : <></>}
      <Routes>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/home" element={<Home data={data}/>}/>
        <Route path="/mapview" element={<Map data={data}/>}/>
        <Route path="calendarview" element={<Calendar data={data}/>}/>
        <Route path="profile" element={<Profile data={data}/>}/>
      </Routes>

    {authenticated ? <SignIn/> : <></>}
  </>
  );
}

export default App;