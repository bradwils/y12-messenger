
var lastDbSnapshot;
var dbChange = true; //starts as true so the first use calls an update


function rndm(max) {
  return String(Math.floor(Math.random()*max));
}

async function writeUserData(userID, displayName) {
  /**
  when writing data:
  - gets the requested userID (unique) and display name (add more parameters to deal with later)
  - the UserID is the folder (so db/users/<userID>/conversations, data ->/(info goes here))
  - checks if user already exists, if so it won't write and returns 'user exists' (or someting idk it doesnt run and thats what matters)
  - perfect!
    
  **/


  const db = getDatabase(app);
  const reference = ref(db, 'users/' + userID + '/data/');
  // console.log(reference)

  
  checkUserValidity(userID).then(async (response) => { //read db, when get a return parse it as 'response'
    if (response == false) {

      await set(reference, { //await is needed here to make sure that this process fully completes before it continues (onto process.exit)
        //db name   db content
        Name: displayName,
        loginKey: rndm(10000)
        });
    
      //process.exit;
      console.log('user data written');
      
    } else {
      return ('user already exists');
    }
  });
}
//            userID        key       displayname        convoIDs
// writeUserData('user3', 'loginKeyStr', 'pete', ['convo1', 'convo2', rndm()]);



//below is currently not in use & has errors (todo)

async function initiateNewConversation(participants) { //NOT TESTED 
                      //participants needs to be an array
  //format: userID, name, <message content>

  //when this is run, have a switch statement on the other side, which depending on what the returned value is will display error (what kind etc) or success.


  if (await checkUserValidity(participants) == false) { //make sure all invited people are real users (exist)
    return 'invaliduser'
  }
    if (await existingConversationCheck(participants) == true) {
      console.log('conversation already exists, aborting process');
    } else { //write new conversation data
      console.log('convo does not exist')

      const db = getDatabase(app);
      // var reference = ref(db, 'conversations/' + getNextAvailableConversationID() + '/' )
      id = await getNextAvailableConversationID();
      console.log('id: ' + id)
      var reference = ref(db, 'conversations/' + id)

      //write participant IDs  
      
      await set(reference, {
        Participants: [participants] //in the participant section of that conversation, write all of the participants.
      });


      for (i in participants) { //for each user
        const db = getDatabase(app);
        var reference = ref(db, 'users/' + participants[i] + '/conversations/') //set reference to their section
        
        //write participant IDs    
    
        await set(reference, { //need to append to the array, not overwrite it
          Conversations: 'newconvo' + id //for the conversation reference write this convo (FOR TESTING, needs to append array to add new convos)
        });

      }
    }
};


var temp;

function readDB(path) { //path should be used like this: 
  const db = getDatabase(app); //updates db shit (idrk waht it does)
  const reference = ref(db, path); //sets reference (based on parsed path, etc 'users/id/')
  return get(reference).then((snapshot) => { //get (data referenced) and then parse it as snapshot. the .then makes sure that data is returned BEFORE continuing or else you get a bunch of 'undefined's.
   if (snapshot.exists()) { //if snapshot does exist
    console.log('snapshot exists'); //yep
    lastDbSnapshot = snapshot.val(); //set it to lastDbSnapshot
    return; //returns the data as an object to the return function that we're im, and then that return will return data to the function.

    } else {
      console.log('bad path') //works!
      return false; //return false, bad path
      
    }
  })
}


//readDB, !snapshot.exists() works correctly, need to figure out how to error it or some shit.




async function sendMessage(conversationID, content, sender, timestamp) { 
  //write message data
  const db = getDatabase(app);
  var reference = ref(db, 'conversations/' + conversationID + '/messages/');
  await set(reference, {
    Content: content,
    Owner: sender,
    Time: timestamp
  });
  //process.exit;
}
// writeMessageData();

// sendMessage(<conversationID>, <content>)

async function existingConversationCheck(users) {
  return readDB('conversations/').then((response) => { //under construction
    // console.log(lastDbSnapshot[10].userbrad) //read db, when get a return parse it as 'response'
    for (i=0; i < (Object.keys(lastDbSnapshot)); i++) {
      // console.log(i)
      console.log('first loop: ' + i);
        for (u=0; u < (Object.keys(lastDbSnapshot.conversations[u])); u++) {
          console.log('second loop ' + u);
          //check if every user is in this group (and only every user)
        }
    }
    //returns the number of entries in conversations, and as it's a zero index, that number is what the next free number is.
    return false; //this remains here until the code is finalised.
  });
}

async function getNextAvailableConversationID() {
  return new Promise((resolve) => { //establish new promise which can only be returned
    const db = getDatabase(app)
    readDB('conversations/').then((response) => { //read db, when get a return parse it as 'response'
      if (response !== false) { // if response isn't false (ie is valid)
        console.log('result: ' + JSON.stringify(lastDbSnapshot, null, 2)); //debug log
        console.log('returning (objkeys.len): ' + Object.keys(lastDbSnapshot).length) //debug log
        return(resolve(String(Object.keys(lastDbSnapshot).length))); //returns the number of entries in conversations, and as it's a zero index, that number is what the next free number is.

        //with this; it returns a resolve, meaning that the promise is fulfilled, and then returns the value inside of the resolved to the function that called it. 
        //very shitty and annoying but is needed to prevent from the before code from running; will also be needed for the existingConversationCheck function.
      } else {
        console.error("error in readDB('conversations/') path")
      }
    });
  });
}


async function checkUserValidity(userID) { //
  return readDB('users/' + userID + '/').then((response) => { //read db, when get a return parse it as 'response'
    if (response !== false) { //if response has data (ie the request was valid, user exists)
      return true; //is valid
    } else {
      return false; //is not valid
    }
  });

}



//FOR TESTING, HTML CODE

document.getElementById("initiateConvoButton").addEventListener('click',function ()
{
 initiateNewConversation(((document.getElementById('initiateNewConversationParticipants').value).split(','))) //runs convo with paramter being all participants in textarea.
 //validation code to see State field is mandatory.  
}  ); 




async function addConversationToUser() {
  const db = getDatabase(app);
  const conversationsRef = ref(db, 'users/' + 'brad' + '/conversations');
  const newConversationRef = push(conversationsRef);
  await set(newConversationRef, true);
}



//DEMOF FOR HANDLING DB UPDATES
// readDB('PATH HERE/').then((response) => { //read db, when get a return parse it as 'response'
//   if (response !== false) {

//     //run code here

//   }
// });


async function writecustompath(path, data) {
  const db = getDatabase(app);
  const reference = ref(db, path);


  console.log('setting reference')
  await set(reference, { //await is needed here to make sure that this process fully completes before it continues (onto process.exit)
    //db name   db content
    dataHere: data,
 
    });

  //process.exit;
  console.log('user data written');
  }