demo = true;
setTimeout(() => {
    signedInUserID = 'demoUser2';
    welcomeBack(signedInUserID);
    addConvoListListener();
    document.title = 'user: ' + signedInUserID;
}, 500);