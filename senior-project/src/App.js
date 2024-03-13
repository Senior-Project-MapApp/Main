import React, {useState} from "react";
import data from "./example.json";
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js"
import {getDatabase, onValue, ref} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"
import SignIn from "./signIn";
import Home from "./home";
import Map from "./map";
import Calendar from "./calendar";
import Profile from "./profile";
import {Route, Routes} from 'react-router-dom';
import Navbar from "./navbar";

export let accessToken; //for calendar

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

  provider.addScope('https://www.googleapis.com/auth/calendar'); //See, edit, share, and permanently delete all the calendars you can access using Google Calendar
  provider.addScope('https://www.googleapis.com/auth/calendar.events'); //Calendar events
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); //See and download your contacts
  provider.addScope('https://www.googleapis.com/auth/user.addresses.read'); //View your street addresses
  provider.setCustomParameters({
    prompt: "select_account"
  })

  const [currUser, setCurrUser] = useState(auth.currentUser);
  const [task, setTask] = useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user != null) {
        setSignIn(true);
        setCurrUser(user);
        console.log("Logged in: " + user.displayName);
        getAllTasks(user, db);
      } else {
        console.log("Logged in: null");
        setSignIn(false);
        setCurrUser(null);
      }
    });
  });

  function HandleSignIn() {
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        accessToken = credential.accessToken; //for calendar
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  function HandleSignOut() {
    signOut(auth);
  }

  const getTask = (title) => {
    if (currUser != null) {
      const reference = ref(db, "users/" + currUser.uid + '/' + title);
      onValue(reference, (snapshot) => {
        const description = snapshot.val().desc;
        const endDate = snapshot.val().endDate;
        const startDate = snapshot.val().startDate;
        const loc = snapshot.val().loc;
        setTask([title + description + startDate + endDate + loc]);
      }, {
        onlyOnce: true
      });
    }
  }

  const getAllTasks = (user, db) => {
    if (user != null) {
      const reference = ref(db, "users/" + user.uid);
      onValue(reference, (snapshot) => {
        setTask(snapshot.val());
      }, {
        onlyOnce: true
      });
    }
  }

  return (
    //This is where the sign in page will be
    //Once the user signs in, they will be sent to the home page
  <>
      { sign ? <Navbar user={currUser} HandleSignOut={HandleSignOut}/> : <></>}
      <Routes>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/home" element={<Home data={data} sign={sign} db={db} user={currUser} task={task}/>}/>
        <Route path="/mapview" element={<Map data={data} sign={sign} db={db} user={currUser}/>}/>
        <Route path="calendarview" element={<Calendar data={data} sign={sign} db={db} user={currUser} getTask={getTask} getAllTasks={getAllTasks}/>}/> 
        <Route path="profile" element={<Profile user={currUser} data={data} sign={sign}/>}/>
      </Routes>

    {sign ? <></> : <SignIn HandleSignIn={HandleSignIn}/>}
  </>
  );
}

export default App;
