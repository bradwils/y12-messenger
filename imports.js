//make imported functions globally accessable
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, push, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

window.getDatabase = getDatabase; 28
window.ref = ref;
window.set = set;
window.get = get;
window.child = child;
window.push = push;
window.update = update;


window.firebaseConfig = firebaseConfig;

window.app = initializeApp(firebaseConfig);

console.log('imported') 