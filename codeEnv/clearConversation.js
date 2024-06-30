//div with id messagesConversationContentContainer can be deleted to clear all chats. then, we can create the div again (with the same ID so it inherits css), before then rendering all elements within that div. so we can delete the div every time we're done with it.


var view;
//elements struct 
    //DIV-ID: messagesContainer (do not touch)
        //DIV-ID: messagesConversationContentContainer this is the one that gets deleted for new conversations
            //DIV-CLASS: incomingMessageContainer OR outgoingMessageContainer
                //DIV-CLASS: incomingMessage OR outgoingMessage
                    //P: text
                //DIV-CLASS: clearFloat
                //P-CLASS: messageAuthor
            


                var participants; //just for testing within func()
                var messages; //just for testing within func()


function func(convoID) { //maybe make into a loop later?
// function insertNewMessagesConversationContentContainer(convoID) {

    //create div called messagesConversationContentContainerDiv
    
    var newMCCC = document.createElement("div"); //creates a div
    newMCCC.id = 'messagesConversationContentContainer';
    // newDiv.appendChild(document.createTextNode("textherhere"));

    let messagesContainer = document.getElementById("messagesContainer") //identifies the mesasgescontainer
    messagesContainer.insertAdjacentElement('afterbegin', newMCCC) //and inserts the new contentcontainer after it
    console.log('inserted MCCCC')



    // position can be: beforebegin, afterbegin, beforeend, afterend.







    //for every message we need to create a div element.
    //at the moment, let's user userID 1 is the client and anything else is someone else.

    const userID = 'user0'; //this will be dynamic later, but for now is this FOR TESTING
    // const userID = UUID; //for later

    //create a div called placeholder which sits in place telling the user that it's loading


    // readDB('conversations/' + convoID).then((conversationData) => {
        readDB('conversations/1').then((conversationData) => {
            messageNumber = Object.keys(conversationData.messages);
            //array with each value for each of the entries in messages (so the folder names).

            participants = conversationData.participants; //array (write let infront of both later)
            messages = conversationData.messages;
            messagesLen = Object.keys(messages).length;
            console.log(messagesLen) //messages is an object, each entry is a message, and within is it's data.
            var i;
            for (i=0; i < messagesLen; i++) { //for each messages

                //create div(s) for each message and stack them under each other and then render at the very end (outside of this loop)
                var messagesContainer = document.getElementById('messagesConversationContentContainer'); //this is the container for everything to be placed
                //incoming or outgoing message container
                if (messages[messageNumber[i]].Owner == userID) { //if it's the user's messages 
                    //this if statement works!
                    console.log('matching ' + userID + 'with ' + messages[messageNumber[i]].Owner) 



                    //create outgoingElement
                    var newOutgoingMessageContainer = document.createElement("div");
                    newOutgoingMessageContainer.className = "outgoingMessageContainer";

                    //place at the end of messagesConversationContentContainer
                    existingMCCC = document.getElementById("messagesConversationContentContainer")
                    messagesContainer.insertAdjacentElement('beforeend', newOutgoingMessageContainer) //and inserts the new contentcontainer after it
                    console.log('inserted')


                    //now for the outgoingMessage (class)

                    mcccContainer = document.getElementById("messagesConversationContentContainer");
                    
                    var newOutgoingMessage = document.createElement("div");
                    newOutgoingMessage.className = "outgoingMessage";

                    var allOutgoingMessageContainers = document.querySelectorAll('.outgoingMessageContainer');
                    view = allOutgoingMessageContainers
                     //needs dot to signify class. also remember; this is an array!

                    if (allOutgoingMessageContainers.length > 0) { //if there are previous outgoing messages
                        allOutgoingMessageContainers[allOutgoingMessageContainers.length-1].insertAdjacentElement('afterbegin', newOutgoingMessage) //for the last outgoingMessageContainer, insert the newOutgoingMessage at the start within it. 
                    } else { //there are no existing outgoingMessageContainers (no outgoing messages at all), so we'll just add it to the end of the messagesConversationContentContainer.
                        allOutgoingMessageContainers[0].appendChild(newOutgoingMessage) //and inserts the new contentcontainer after it
                        //i believe this is wrong; this shouldn't happen; we only get to this spot in the code if the current message = our message.
                    }   //for 

                    // //now for the text & clearfloat
                    // var newP = document.createElement("p");
                    // try {
                    //     newP.innerHTML = messages[messageNumber[i]].Content;
                    // } catch (error) {
                    //     newP.innerHTML = 'error' + error;
                    // }
                    // var newClearFloat = document.createElement("div");
                    // newClearFloat.className = "clearFloat";

                    // var allOutgoingMessages = document.querySelectorAll('outgoingMessage');






                    //not sure which placement position it needs to be
                } else {

                }



            }
      });   



    // newMessagesConversationContentContainer
    // under messagesContainer
}


function removeElements(type, id) { //just for use, we want to be remoing the ID 'messagesConversationContentContainer' between conversations, leaving the overarching 'messagesContainer alone.
    if (type == 'class') {
        if (id) {
            console.log(' yeah')
        } else {
            console.log('nah')
        }
        var elements = document.getElementsByClassName(id);
        while(elements.length > 0){
            console.log('element length: ' + elements.length)
            elements[0].parentNode.removeChild(elements[0]);
        }
    } else if (type == 'id') {
        var element = document.getElementById(id);
        try {
            element.remove(); //removes the element
        } catch(error) {
            console.error('element not found: \n' + error)
        }
    }
}

var orderedMessagesReference;
var temp;
async function createConversationOrderedMessagesReference(data) {
    //create a reference to the conversation's messages
    console.log(data)
     //




    //within this data, all we need to look at is the conversations property.
    //this data IS ALREADY ORDERED BY TIMESTAMP, so it's in ascending (?) order.
}


function run() {
    removeElements('id', 'messagesConversationContentContainer');
    func('1')
}