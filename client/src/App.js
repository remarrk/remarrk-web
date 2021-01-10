import React from 'react';

import Remark from './components/Remark';
import './styles/styles.scss';

import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd} from '@react-firebase/auth';
import {firebaseConfig} from "./components/config/firebaseConfig.js";

function App() {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div className='App'>
        <button onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
        }}>
          Sign In With Google
        </button>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}>
          Sign Out
        </button>
        <FirebaseAuthConsumer>
          {({isSignedIn}) => {
            if (isSignedIn) {
              return (
                <div>
                  <Remark editable={true}/>
                  <Remark editable={false}/>
                </div>
              );
            } else {
              return (
                <div>
                  <h1>You are not logged in</h1>
                </div>
              )
            }
          }}
        </FirebaseAuthConsumer>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
