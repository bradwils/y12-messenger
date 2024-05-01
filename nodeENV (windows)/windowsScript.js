import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCTrqAnNkP8OtVe0kdDQti3zT-SJwjx3JI",
  authDomain: "dev59436.firebaseapp.com",
  databaseURL: "https://dev59436-default-rtdb.firebaseio.com",
  projectId: "dev59436",
  storageBucket: "dev59436.appspot.com",
  messagingSenderId: "954332665239",
  appId: "1:954332665239:web:8f8e92aca4b61c018b60d2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function rndm() {
  return String(Math.floor(Math.random()*100));
}

//USERDB INTERACTIONS        unique  TODO      not unique    TODO
async function writeUserData(userID, key, displayName, convoIDs) {
  console.log('userID: ' + userID);
  const db = getDatabase();
  const reference = ref(db, 'users/', + String(userID) + '/'); //error here, userID is returning NaN when properly used (it's expecting a number...? not sure why)zen
  console.log('ref: ' + 'users/', + userID + '/');
    // const reference = ref(db, 'users/user2/');

await set(reference, { //await is needed here to make sure that this process fully completes before it continues (onto process.exit)
  //db name   db content
    loginKey: key,
    Name: displayName,
    Conversations: convoIDs
  });

  process.exit();
}

writeUserData('newUser', 'loginKeyStr', 'brad', ['convo1', 'convo2', rndm()]);





//MESSAGE DB INTERACTIONS
async function writeMessageData(ConvoID, name, msg) {
  //format: userID, name, <message content>
  const db = getDatabase();
  const reference = ref(db, 'users/', + userID)
//                      db (which data base i'm assuming, so always just db as there's just one
//                          pathname, so it goes db/ (already defined), then  etc 'users/' + userID + 'loginKey/
  //any data in this path will be REPLACE


  await set(reference, {
    Username: userID,
    Name: name,
    Content: msg
  });

  process.exit();
}




 function pushUpdate() {
  writeMessageData("firstUser", "bradleywilson", String(Math.floor(Math.random()*100)))
  console.log('finished writing');
}
pushUpdate();




//this code works, it sets a random number to the 'content' section of the database.