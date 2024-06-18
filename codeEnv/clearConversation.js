//div with id messagesConversationContentContainer can be deleted to clear all chats. then, we can create the div again (with the same ID so it inherits css), before then rendering all elements within that div. so we can delete the div every time we're done with it.

//elements struct 
    //DIV-ID: messagesContainer (do not touch)
        //DIV-ID: messagesConversationContentContainer
            //DIV-CLASS: incomingMessageContainer OR outgoingMessageContainer
                //DIV-CLASS: incomingMessage OR outgoingMessage
                    //P: text
                //DIV-CLASS: clearFloat
                //P-CLASS: messageAuthor
            


function func() { //maybe make into a loop later?
// function insertNewMessagesConversationContentContainer() {

    //create div called messagesConversationContentContainerDiv
    const newDiv = document.createElement("messagesConversationContentContainerDiv"); //creates a div
    newDiv.id = 'messagesConversationContentContainer';
    newDiv.appendChild(document.createTextNode("textherhere"));

    let messagesContainer = document.getElementById("messagesContainer")
    messagesContainer.insertAdjacentElement('afterbegin', newDiv)

    // position can be: beforebegin, afterbegin, beforeend, afterend.



    // newMessagesConversationContentContainer
    // under messagesContainer
}

function appendNewChildMessage() {
    var newDiv = document.createElement
}

function removeElements(elementID) {
    //how to remove elements
    let element = document.getElementById(elementID)
    element.remove() //removes the element
}