import React, {useState} from "react";
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

function App() {

  const [sign, setSignIn] = useState(false);
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCq6prs9r1LLrSalIXgRTgqQuXRqWmcecY",
    authDomain: "task-map-v2.firebaseapp.com",
    databaseURL: "https://task-map-v2-default-rtdb.firebaseio.com",
    projectId: "task-map-v2",
    storageBucket: "task-map-v2.appspot.com",
    messagingSenderId: "694269819083",
    appId: "1:694269819083:web:8cd740c6d16742b1b3434e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);
  const provider = new GoogleAuthProvider();
  const currUser = auth.currentUser;

  provider.addScope('https://www.googleapis.com/auth/calendar'); //See, edit, share, and permanently delete all the calendars you can access using Google Calendar
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); //See and download your contacts
  provider.addScope('https://www.googleapis.com/auth/user.addresses.read'); //View your street addresses
  provider.setCustomParameters({
    prompt: "select_account"
  })

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user != null) {
        console.log("Logged in: " + user.displayName);
        setSignIn(true);
      } else {
        console.log("Logged in: null");
        setSignIn(false);
      }
    });
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
      { sign ? <Navbar user={currUser} HandleSignOut={HandleSignOut}/> : <></>}
      <Routes>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/home" element={<Home data={data} sign={sign} db={db} user={user}/>}/>
        <Route path="/mapview" element={<Map data={data} sign={sign} db={db} user={user}/>}/>
        <Route path="calendarview" element={<Calendar data={data} sign={sign} db={db} user={user}/>}/>
        <Route path="profile" element={<Profile user={currUser} data={data} sign={sign}/>}/>
      </Routes>

    {sign ? <></> : <SignIn HandleSignIn={HandleSignIn}/>}
  </>
  );
}

export default App;
