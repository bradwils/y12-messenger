// const { set } = require("firebase/database");

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

//below is currently not in use & has errors (todo)

async function initiateNewConversation(participants) { //NOT TESTED 
                      //participants needs to be an array
  //format: userID, name, <message content>

  //when this is run, have a switch statement on the other side, which depending on what the returned value is will display error (what kind etc) or success.


  if (await checkUserValidity(participants) == false) { //make sure all invited people are real users (exist)
    return 'invaliduser'
  }
    if (await existingConversationCheck(participants) == true) { //
      console.log('conversation already exists, aborting process');
    } else { 
      //IF CONVERSATION DOESN'T EXIST


      const db = getDatabase(app);
      // var reference = ref(db, 'conversations/' + getNextAvailableConversationID() + '/' )
      convoID = await getNextAvailableConversationID();
      console.log('id: ' + convoID) //awaits for convoID before running
      var reference = ref(db, 'conversations/' + convoID)
      
      await set(reference, {
        Participants: String(participants) //in the participant section of that conversation, write all of the participants.
      });


      for (i in participants) { //for each user
        const db = getDatabase(app);
        var reference = ref(db, 'users/' + participants[i] + '/') //set reference to their section
                    // users   //   user0           // 
        await readDB('users/' + participants[i] + '/').then((response) => { //read db, when get a return parse it as 'response'
          if (response !== false) {

            currentData = JSON.parse(response) //simplify this process later into one efficient step.
            // console.log(currentData)
            currentData.push(convoID) //adds the convoID to the current data (which in this case is the array of conversations)
            //now we have updated convo list, we can write it back to the db
            var reference = ref(db, 'users/' + participants[i] + '/')

            set (reference, {
              Conversations: String(currentData)
            });
            //updated the user's data with the new conversation IDs, done! (?)
            
          }
        });        //updated conversation ID to be old convos + new

        //here, within this conversations 'users' section we're saving an array of users that are in this conversation.

      }
    }
    alert('finished')
};



function readDB(path) { //path should be used like this: 
  const db = getDatabase(app); //updates db shit (idrk waht it does)
  const reference = ref(db, path); //sets reference (based on parsed path, etc 'users/id/')
  return get(reference).then((snapshot) => { //get (data referenced) and then parse it as snapshot. the .then makes sure that data is returned BEFORE continuing or else you get a bunch of 'undefined's.
   if (snapshot.exists()) { //if snapshot does exist
    console.log('snapshot exists'); //yep
    lastDbSnapshot = snapshot.val(); //set it to lastDbSnapshot
    return snapshot.val(); //returns the data as an object to the return function that we're im, and then that return will return data to the function.

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
  var reference = ref(db, 'conversations/' + conversationID + '/messages/' + 'unique message ID');
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
  //need to sort user conversation IDs
  var lowest;
  // for (u=0; u < (Object.keys(response.conversations[u])); u++) sample for going through each part of response
  return readDB('users/').then((response) => {
    //find user with least convos
    lowest = 0;
    for (i=0; i < users; i++) {
      // for ()


        

    }
});
}

async function getNextAvailableConversationID() {
  return new Promise((resolve) => { //establish new promise which can only be returned
    const db = getDatabase(app)
    return readDB('conversations/').then((response) => { //read db, when get a return parse it as 'response'
      if (response !== false) { // if response isn't false (ie is valid)
        console.log('result: ' + JSON.stringify(lastDbSnapshot, null, 2)); //debug log
        console.log('returning (objkeys.len): ' + Object.keys(lastDbSnapshot).length) //debug log
        return(Number(resolve(Object.keys(lastDbSnapshot).length + 1))); //this returns the following: a number of the amount of entries (+1, as that's the next available convo). this RESOLVES the promise, so then the function that called it can continue to the .then part.

      } else {
        throw console.error(error); //the throw will reject the promise. 
      }
    });
  });
}


async function checkUserValidity(userID) { //MUST await checkUserValidity if calling it
  //CURRENT ISSUE: doesn't run loop cirrectly
  var validity = true;
  if (Array.isArray(userID)) { //if userId is an array
    for (i=0; i < userID.length; i++) { //for each in userID
      console.log('reading' + userID[i]);
       await readDB('users/' + userID[i] + '/').then((response) => { //attempt to read that directory
        if (response == false) { //if response is invalid
          validity = false; //is valid
        }
      });
      console.log('i: ' + i + ' userID.length: ' + userID.length)
    }
  } else { //for strings (works)
    if (typeof userID == "string") {
      await readDB('users/' + userID + '/').then((response) => { //attempt to read that directory
        if (response == false) { //if response is invalid
          validity = false; //is valid
        }
      });
    }
  }
  console.log('returned checkUserValidity');
  console.log(validity);
  return validity;//returns true or false depending on whether or not shit is good
}



//FOR TESTING, HTML CODE

document.getElementById("initiateConvoButton").addEventListener('click',function ()
{
 initiateNewConversation(((document.getElementById('initiateNewConversationParticipants').value).split(','))) //runs convo with paramter being all participants in textarea.
 //validation code to see State field is mandatory.  
}  ); 




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
    data2: data
    //IMPORTANT: this is stored like an array, and read like an array. etc, if the entire db was stored under the var 'lastDbSnapshot', then ->

    // participants: 'egawhdasd'

 
    });

  //process.exit;
  console.log('user data written');
  }



  async function setTempToData(path) //request data from database using readDB(), and set it to a data named temp
  {
    await readDB(path + '/').then((response) => { //read db, when get a return parse it as 'response'
      if (response !== false) {
        temp = response;
        console.log('temp set to data');
      }
    });
  }