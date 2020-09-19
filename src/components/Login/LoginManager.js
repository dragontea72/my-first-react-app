
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializerLoginFramework = () => {
   if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
   }

}

export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    //console.log('sign clicked');
    return firebase.auth().signInWithPopup(googleProvider).then(function(result) {
      const {displayName, photoURL, email} = result.user;
      const signedInUser = {
        isSignedIn:true,
        name:displayName, 
        email:email,
        photo:photoURL,
        success: true
      }
      return signedInUser;
      //console.log(displayName, photoURL, email);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }


  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
      //console.log('fb user afrter sign in', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(result => {
          const signedOutUser = {
            isSignedIn: false,
            name: '', 
            photo:'',
            email:''
          }
          return signedOutUser;
         // console.log(result);
    })
    .catch( error => {

    })
   // console.log('sign out')
  }

  export const createUserWithEmailAndPassword = (name , email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response =>{
      const newUserInfo = response.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      //setUser(newUserInfo);
      updatedUserInfo(name);
      return newUserInfo;
      //console.log(response);
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
     // setUser(newUserInfo);
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      // ...
    });
    //console.log('submitting');
  }
export const  signInWithEmailAndPassword = ( email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(response => {
    const newUserInfo = response.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
    // setUser(newUserInfo);
    // setLoggedInUser(newUserInfo);
    // history.replace(from);
    // console.log('sign in info' , response.user);
  })
  .catch(error => {
    // Handle Errors here.
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    // ...
  });
}

const updatedUserInfo = name => {
    const user = firebase.auth().currentUser;

  user.updateProfile({
     displayName: name,
     
    }).then(function() {
      // Update successful.
      console.log("updated sucessfullly");
    }).catch(function(error) {
       // An error happened.
       console.log(error);
    });
   }
