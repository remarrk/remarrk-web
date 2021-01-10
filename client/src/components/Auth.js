import firebase from "firebase/app";
import "firebase/auth";

export const signInGoogleAuth = (e) => {
  e.preventDefault();
  return new Promise(((resolve, reject) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then((user) => {
        console.log("Logged in user successfully", user);
        resolve(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        reject(error);
      });
  }));
}

export const signInEmail = (e, email, password) => {
  e.preventDefault();
  return new Promise(((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Logged in user successfully", user);
        resolve(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        reject(error);
      });
  }));
}

export const signUpEmail = (e, email, password) => {
  e.preventDefault();
  return new Promise(((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Created user successfully");
        resolve(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        reject(error);
      });
  }));
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