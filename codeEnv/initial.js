stop = false;

if (!stop) { //for testing
    window.onload = function() {
        if (confirm('sign in?')) {
            userSignInPopupFunction();
        } else {
            user = prompt('user:') 
            if (!user) {
                console.log('aborting');
            } else {
                signedInUserID = user;
                welcomeBack(user);
                addConvoListListener();
                document.title = 'user: ' + signedInUserID;
            }
        }
    };
}