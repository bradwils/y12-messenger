demo = true;
setTimeout(() => {
    signedInUserID = 'demoUser1';
    welcomeBack(signedInUserID);
    addConvoListListener();
    document.title = 'user: ' + signedInUserID;
}, 500);