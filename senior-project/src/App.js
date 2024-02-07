import React from "react";
import { getAuthentication } from "./signIn";
import userData from "./example.json";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js"
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"
import SignIn from "./signIn";
import { Switch } from "@mui/material";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

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

function App() {
  return (
    //This is where the sign in page will be
    //Once the user signs in, they will be sent to the home page
  <>
    <Router>
      <Switch>
        <Route path="/SignIn" Component={<SignIn/>}/>
        <PrivateRoute path="/home" Component={<Home/> }/>
        <Redirect from="/" to="/SignIn" />
      </Switch>
    </Router>
    <SignIn/>
  </>
  );
}

export default App;