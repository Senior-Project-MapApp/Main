import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js"
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"
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
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/calendar'); //See, edit, share, and permanently delete all the calendars you can access using Google Calendar
provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); //See and download your contacts
provider.addScope('https://www.googleapis.com/auth/user.addresses.read'); //View your street addresses
provider.setCustomParameters({
    prompt: "select_account"
})

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log("Logged in: " + user.displayName);
    } else {
        console.log("Logged in: null");
    }
})

let user;
const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", () => {
    setPersistence(auth, browserSessionPersistence).then(() => {
        return signInWithPopup(auth, provider).then((result) => {
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
});

const signOutBtn = document.getElementById('singOutBtn');
signOutBtn.addEventListener("click", () => {
    signOut(auth);
});

const createTaskBtn = document.getElementById('createTaskBtn');
createTaskBtn.addEventListener("click", () => {
    const title = document.getElementById('setTitle').value;
    const description = document.getElementById('setDescription').value;
    const date = document.getElementById('setDate').value;
    const time = document.getElementById('setTime').value;
    const prio = document.getElementById('setPrio').value;
    if (user && title) {
        const reference = ref(db, 'testapp/users/' + user.uid + '/' + title);
        set(reference, {
            description: description,
            date: date,
            time: time,
            prio: prio
        }).catch((error) => {
            console.log(error);
        });
        console.log("End Create Task")
    } else {
        alert("You must be logged in and input a title to create a task!")
    }
});

const getTaskBtn = document.getElementById('getTaskBtn');
getTaskBtn.addEventListener("click", () => {
    const title = document.getElementById('getTitle').value
    if (user && title) {
        const reference = ref(db, 'testapp/users/' + user.uid + '/' + title);
        onValue(reference, (snapshot) => {
            const description = snapshot.val().description;
            const date = snapshot.val().date;
            const time = snapshot.val().time;
            const prio = snapshot.val().prio;
            console.log("Title: " + title + "\nDescription: " + description + "\nDate: " + date + "\nTime: " + time + "\nPrio: " + prio);
        }, {
            onlyOnce: true
        });
    } else {
        alert("You must be logged in and input a title to retrieve a task!")
    }
});
