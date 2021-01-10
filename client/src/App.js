import React from 'react';

import Remark from './components/Remark';
import './styles/styles.scss';

import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider, FirebaseAuthConsumer} from '@react-firebase/auth';
import {firebaseConfig} from "./components/config/FirebaseConfig.js";

import {signOut} from './components/Auth.js';

import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div className='App'>
        <Login/>
        <Signup/>
        <button onClick={signOut}>Sign Out</button>
        <FirebaseAuthConsumer>
          {({isSignedIn}) => {
            if (isSignedIn) {
              return (
                <>
                  <Remark editable={true}/>
                  <Remark editable={false}/>
                </>
              );
            } else {
              return (
                <>
                  <h1>You are not logged in</h1>
                </>
              )
            }
          }}
        </FirebaseAuthConsumer>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
