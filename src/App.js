import React from 'react';
import Navbar from "./components/Navbar";

import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed
} from "@react-firebase/auth";
import "firebase/firestore"
import {
  FirestoreCollection, FirestoreProvider
} from "@react-firebase/firestore";
import {config} from "./firebaseConfig";

import './styles/styles.scss';
import Login from "./components/Login";

function App() {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <Navbar/>
      <div>
        This is the Firebase auth provider
        {
          // THINGS THAT DISPLAY AT ANY TIME
        }
      </div>
      <FirebaseAuthConsumer>
        {({isSignedIn}) => {
          if (isSignedIn) {
            return (
              <p>SIGNED IN 🎉</p>
            );
            // YOU CAN PASS A BOOLEAN TO OTHER COMPONENTS
          } else {
            return (
              <>
                <p>NOT SIGNED IN 👎</p>
                <Login/>
              </>
            )
          }
        }}
      </FirebaseAuthConsumer>
      <div>
        <IfFirebaseAuthed>
          {() => {
            // THINGS THAT DISPLAY IF AUTHENTICATED
            return (
              <>
                <button onClick={() => firebase.auth().signOut()}>sign out</button>
                <FirestoreProvider {...config} firebase={firebase}>
                  <FirestoreCollection path="/remarks/" limit={5}>
                    {a => {
                      return (
                        <p>
                          {
                            a.isLoading ? "Loading" : JSON.stringify(a.value, null, 2)
                          }
                        </p>
                      )
                    }}
                  </FirestoreCollection>
                </FirestoreProvider>
              </>
            )
          }}
        </IfFirebaseAuthed>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
