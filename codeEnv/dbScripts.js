//REMEMBER; USERIDS ARE EMAILS, MY TEST USER 'USER0' IS FOR TESTING ONLY
var lastDbSnapshot; //data hold for database retrievals
var conversationContext; //global data hold for which conversation is being viewed
var signedInUserID; //global scope so it can be used from other areas of code.

async function writeUserData(userID, email, googleUID) {
  // console.log(userID + '\n' + email + '\n' + googleUID)
  //userID is email
  //displayName can be (by default) email w/o the @xxx, and can be changed if wanted
  //userUID is the google sign in ID, and what will be matched when someone signs in with google
  /**
  when writing data:
  - gets the requested userID (unique) and display name (add more parameters to deal with later)
  - the UserID is the folder (so db/users/<userID>/conversations, data ->/(info goes here))
  - checks if user already exists, if so it won't write and returns 'user exists' (or someting idk it doesnt run and thats what matters)
  - perfect!
    
  **/


  const db = getDatabase(app); //refreshes database instance; //refreshes database instance; //refreshes db instance
  const reference = ref(db, 'users/' + userID);



  checkUserExists(userID).then(async (response) => {
    if (response == false) { //is this user doesn't eixst then...
      writeLookupData(email, userID); //write lookup data to lookup folder
      console.log('writing user data')
      await set(reference, { //await is needed here to make sure that this process fully completes before it continues (onto process.exit)
        //db name   db content
        userID: userID,
        email: email,
        userUID: googleUID, //the userUID is taken from the google sign-in. this is what matches the user to the stored account. insecure af but idgaf (song)
      });





    } else {//if user does already exist
      console.log('user already exists');
    }
  });
  return true;
}

//below is currently not in use & has errors (todo)

async function initiateNewConversation(participants, message) { //works? needs thorough testing though
  if (Array.isArray(participants) == false) { //if array
    participants = [participants]; // //make it into an array (since this func works with an rray)
  }

    const db = getDatabase(app); //refreshes database instance; //refreshes database instance;
    convoID = undefined; //sets to undefined so it can be used in the while loop
    convoID = await getNextAvailableConversationID();

    while (convoID === undefined) { //terrible shit implementation
      setTimeout(() => {}, 100); //waits 100ms before checking if convoID is defined again
      console.log('timeout while convoID undefined')
    }
    console.log('convoID: ' + convoID)

    //write convo data to new convo : 
    try {
      writeNewConversation(participants, convoID) //write new convo to convo folder
    } catch (error) {
      console.error(error)
    }
    //now, we write the convo data to each user
    // for (i = 0; i < participants.length; i++) {
      for (const element in participants) { //for each person
      console.log('aprticipants: ' + participants)
      console.log('participantsLoop i: ' + element) //for each person, append the new convoID to their conversations list.
      const db = getDatabase(app); //refreshes database instance; //refreshes database instance;
      // users   //   user0           // 
      await readDB('users/' + participants[element] + '/').then((response) => { //read database for that person's response

        //
        //read db, when get a return parse it as 'response'
        if (response !== false) { //if it's a vlid response
          try {
            //this is being x2'd for some reason. this reason is because it's counting the amount of keys in the object, not the amount of entries in the array.
            //this means that i need to get the amount of entries in an object instead of the amount of keys.
            nextConvoSpace = (Object.keys(response.conversations).length) + 1; //if existing convos, get the amount and then add for the next convo
          } catch {
            console.error('couldnty get next convo space')
          }
          var reference = ref(db, 'users/' + participants[element] + '/conversations/');
          console.log('writing to users/' + participants[element] + '/conversations/\nparticipants is ' + participants)
          //second iteration of participants[i] is undefined; why?
          update(reference, {
            [nextConvoSpace]: convoID, //nextConvoSpace seems to always go up by two; not sure why. otherwise, works! (as far as i've tested it writes in the write spots.)
            //need to update convo folder too
          })


          //updated the user's data with the new conversation IDs, done! (?)
          console.log('finished await loop')
        } else {
          console.log('badpath')
        }
      }); //updated conversation ID to be old convos + new

      //here, within this conversations 'users' section we're saving an array of users that are in this conversation.

    } 
    userUID = signedInUserID //placeholder
    sendMessage(convoID, message, userUID, Date.now()); //send that message
  alert('conversation sucessfully created!')
};



function readDB(path) { 
  console.log('called')//path should be used like this: 
  const db = getDatabase(app); //refreshes database instance; //updates db shit (idrk waht it does)
  const reference = ref(db, path); //sets reference (based on parsed path, etc 'users/id/')
  return get(reference).then((snapshot) => {
    console.log(snapshot.val()) //get (data referenced) and then parse it as snapshot. the .then makes sure that data is returned BEFORE continuing or else you get a bunch of 'undefined's.
    if (snapshot.exists()) { //if snapshot does exist
      console.log('snapshot exists'); //yep
      lastDbSnapshot = snapshot.val(); //data saved so it can also be used in other areas simultaneously
      return snapshot.val(); //returns the data as an object to the return function that we're im, and then that return will return data to the function.

    } else {
      console.log('bad path') //works!
      return false; //return false, bad path

    }
  })
}




//readDB, !snapshot.exists() works correctly, need to figure out how to error it or some shit.


               sendMessage('0','0a1b2c3$(!*+', '----------', Date.now())
async function sendMessage(conversationID, content, sender, timestamp) {
  console.log(conversationID + ' + ' + content + ' + ' + sender + ' + ' + timestamp)
  console.log('signedinedid ' + signedInUserID + '\n' + 'conversations/' + conversationID + '/messages/' + timestamp)
  //by storing the data as a folder, with the timestamp as the name, the data is already oredered, as data is apended lower down in the structure as it's written, which will be at a time later than the previous data (since you can't go back in time).
  content = String(content) //ensure it's a string
  //what do we want this function to do?
  const db = getDatabase(app); //refreshes database instance;
  var reference = ref(db, 'conversations/' + conversationID + '/messages/' + timestamp);
  await set(reference, {
    Content: content,
    Owner: sender
  }).catch((error) => {
    console.error('error while sending message, ' + error)
  })
  //promise never gets resolved here not sure why
  console.log('sent')
  //process.exit;
}

// example use: sendMessage('1','this is my message', 'user0', Date.now())




// writeMessageData();

// sendMessage(<conversationID>, <content>)


//objects / user defined data. the api always responds with 
async function getNextAvailableConversationID() { //this works.... perfectly !?
  return new Promise((resolve) => { //establish new promise which can only be returned
    return readDB('conversations/').then((response) => { //read db, when get a return parse it as 'response'
      if (response !== false) { // if response isn't false (ie is valid)
        return (Number(resolve(Object.keys(lastDbSnapshot).length + 1))); //this returns the following: a number of the amount of entries (+1, as that's the next available convo). this RESOLVES the promise, so then the function that called it can continue to the .then part.
      }
    });
  });
}

               checkUserExists('user0DoesNotExist000--------')
               checkUserExists('user0')
async function checkUserExists(userID) { //MUST use 'await' checkUserValidity if calling it

//how does this work?

//for every userID parsed, it is checked in the db. if one is found, 

  //CURRENT ISSUE: doesn't run loop cirrectly
  exists = true;
  if (Array.isArray(userID)) { //if userId is an array
    console.log.log('userID is array, runninig array check')
    for (i = 0; i < userID.length; i++) { //for each in userID 
      await readDB('users/' + userID[i] + '/').then((response) => { //attempt to read that directory
        if (response == false) { //if anyone is invalid
          console.log('false1')
          exists = false; //then not all users exist, so just say no. invalid.
        }
      });

    }
  } else { //for strings (works)
    if (typeof userID == "string") {
      console.log('is string, running')
      await readDB('users/' + userID + '/').then((response) => { //attempt to read that directory
        if (response == false) { //if response is invalid
          console.log('false2')
          exists = false; //person exists valid
        }
      });
    } else {
      console.log('false3')
      console.error('bad input:' + typeof (userID))
    }
  }

  return exists; //returns true or false depending on whether or not shit is good
} //works!



async function writecustompath(path, dataName, data) {
  const db = getDatabase(app); //refreshes database instance;
  const reference = ref(db, path);



  await update(reference, { //await is needed here to make sure that this process fully completes before it continues (onto process.exit)
    //db name   db content
    [dataName]: data
    //IMPORTANT: this is stored like an array, and read like an array. etc, if the entire db was stored under the var 'lastDbSnapshot', then ->

    // participants: 'egawhdasd'


  });

  //process.exit;

}

async function writeNewConversation(participants, id) { //id is undefined; why?

  // console.log(participants + '\n' + id)
  //participants needs to be array, id needs to be string
  //for convo we need:
  // (d = data, f = folder, #f = made as needed
  //    overarching folder with ID
  //      f: participants -> MADE INITIALLY
  //        d: participants (array) -> SET INITIALLY
  //      f: messages -> MADE LATER (not in this func)
  //        #f: timestamp
  //          d: content
  //          d: owner
  const db = getDatabase(app); //refreshes database instance;
  var reference = ref(db, 'conversations/' + id + '/');
  console.log('setting ref')
  await set(reference, {
    participants: participants, // set participants; messages are done seperately.
  })
}


//FUNCTIONS FOR BELOW
var signupToken
var signupUser;
var errorMessage;
var email;
var userUID;
//from https://firebase.google.com/docs/auth/web/google-signin?authuser=1
//  signInWithPopup(???, GoogleAuthProvider)


var loginEmail;                                                                                                                                             
//global scope so it can be used from other areas of code.
async function userSignInPopupFunction() {
  signInWithPopup(Auth, new GoogleAuthProvider())
    .then(async (result) => {
      console.log(result.user)
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      signupUser = result.user; //this has most of the useable data
      loginEmail = result.user.email; //NEEDED
      userUID = result.user.uid; //NEEDED
      // console.log('date now: ' + Date.now() + '\n signupDate: ' + signupUser.metadata.createdAt);
      profilePhotoLink = signupUser.photoURL;


      displayName = loginEmail.split('@')[0];
      signedInUserID = displayName //split the email at the @, and take the first part (before the @) as the display name
      alert('Get help at any time with Control + h (for MacOS) and Control + h (for Windows)')

      if ((await checkUserExists(signedInUserID)) == false) { //if user doesnt exist
        //user doesnt exist; go through onboarding
        console.log('user doesnt exist')
        writeUserData(displayName, loginEmail, userUID).then((result) => {
          if (result == true) { //if the response to checkUserExists (from berfore) is true
          reloadConversationsSidebar(displayName)
          addConvoListListener();
          //TRY POPPING UP HELP WINDOW AS A WELCOME?
      } else {
        alert('failed to write user data')
      }});
      } else {
        console.log('user does already exist')
        welcomeBack(signedInUserID);
        addConvoListListener();
      }

      // ...
    }).catch((error) => {
      console.log(error)
      // Handle Errors here.
      errorCode = error.code;
      errorMessage = error.message;
      // The email of the user's account used.
      // email = error.customData.email;
      // The AuthCredential type that was used.
      credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}




function welcomeBack(userID) {
reloadConversationsSidebar(userID)
console.log('user exists, reloading sidebar')
    //popup successful login, and display sign out button on HTML
    //match userID with user's email and store in var so we can determine which messages are from that user and which are from another user.
}


function startNewConvo(inputUser, message) { //move all of this to initiatenewconvo func?
  console.log(inputUser + '\n' + message)
  allConvoParticipants = [signedInUserID, inputUser];
  checkUserExists(inputUser).then((response) => {
    if (response == true) { //if they exist, initiate.
      console.log('continuing')
     initiateNewConversation(allConvoParticipants, message)
    }
  });
}

async function writeLookupData(email, displayName) {
  const db = getDatabase(app); //refreshes database instance
  const reference = ref(db, 'lookup/');
  await set(reference, {
    [displayName]: email
  });
}




let listenForConvoChanges;
let isFirstCall;
let lastConvo; //last convo that was refreshed here, so also the one on 1st call

async function listenForChanges(id) {
  console.log('listening on ' + id)
  let db = getDatabase(app); //refreshes database instance
  let listenRef = ref(db, 'conversations/' + id); //sets reference

  listenForConvoChanges = (snapshot) => {//first run
    if (!(lastConvo == conversationContext)) {
      console.log('first run, skipping \n lastconvo' + lastConvo + ' convocontext' + conversationContext)
      lastConvo = conversationContext;      
    } else {
      loadConversation(conversationContext);
    }
  }
  onValue(listenRef, listenForConvoChanges);
}

function removeConvoListener(id) {
  console.log('removing on ' + id)
  let db = getDatabase(app); //refreshes database instance;
  let listenRef = ref(db, 'conversations/' + id);
  if (listenForConvoChanges) {
    off(listenRef, 'value', listenForConvoChanges); // Correctly remove the listener
  }
}


var listLoaded = true;
async function addConvoListListener() {
  console.log('adding conovo listener')
  let db = getDatabase(app); //refreshes database instance;
  let listListenRef = ref(db, 'users/' + signedInUserID + '/conversations');
  console.log('listListenRef: ' + listListenRef)
  listenForListChanges = (snapshot) => {
    if (listLoaded == true) {
      listLoaded = false;
      console.log('nope')
    } else {
      reloadConversationsSidebar(signedInUserID);
    }
  }
  onValue(listListenRef, listenForListChanges);
}