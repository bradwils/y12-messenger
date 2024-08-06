//make imported functions globally accessable
//persistant storage (firebase)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, off, push, ref, set, get, child, update, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

//SET writes new data to a directory and wipes EVERYTHING ELSE OUT; like deleting everything at a location then writing whatever it has been set to di.
//UPDATE writes new data to a directory, only overwriting data that it's changing.

//USE UPDATE, NOT SET

const firebaseConfig = { //paste your own
  apiKey: "AIzaSyCTrqAnNkP8OtVe0kdDQti3zT-SJwjx3JI",
  authDomain: "dev59436.firebaseapp.com",
  databaseURL: "https://dev59436-default-rtdb.firebaseio.com",
  projectId: "dev59436",
  storageBucket: "dev59436.appspot.com",
  messagingSenderId: "954332665239",
  appId: "1:954332665239:web:8f8e92aca4b61c018b60d2"
};

//by attatching all of these functions to the window object, they can be accessed from anywhere in the code. global scope. can be used as ref, set, etc (not need for window.ref, window.set) )
window.initializeApp = initializeApp; 

window.getDatabase = getDatabase;
window.ref = ref;
window.set = set;
window.get = get;
window.child = child;
window.push = push;
window.off = off;
window.update = update;
window.onValue = onValue;
window.getAuth = getAuth;
window.signInWithPopup = signInWithPopup;
window.GoogleAuthProvider = GoogleAuthProvider;


window.firebaseConfig = firebaseConfig;

window.app = initializeApp(firebaseConfig);
window.Auth = getAuth(app) //auth works

// alert('please sign in to use the website!') //this will run when the file is imported
// userSignInPopupFunction();


