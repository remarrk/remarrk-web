import firebase from "firebase/app";
import "firebase/auth";

export const signInGoogleAuth = (e) => {
  e.preventDefault();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider)
    .then((user) => {
      console.log("Logged in user successfully", user);
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
}

export const signInEmail = (e, email, password) => {
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Logged in user successfully", user);
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
}

export const signUpEmail = (e, email, password) => {
  e.preventDefault();
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("Created user successfully");
      // todo: log the user in
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
}

export const signOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut()
    .then((user) => {
      console.log("Signed out successfully");
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
}