import React, {useState} from 'react';

import Remark from './components/Remark';
import './styles/styles.scss';

import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider, FirebaseAuthConsumer} from '@react-firebase/auth';
import {firebaseConfig} from "./components/config/FirebaseConfig.js";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

function App() {
  /* STATES ID's
   * NOT LOGGED IN:
   * 0 -> Home
   * 1 -> Log In
   * 2 -> Sign Up
   * LOGGED IN:
   * 0 -> Home
   * 1 -> Favourites
   */
  const [state, setState] = useState(0);

  function setAppState(e, id) {
    e.preventDefault();
    setState(id);
  }

  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div className='App'>
        <FirebaseAuthConsumer>
          {({isSignedIn}) => {
            if (isSignedIn) {
              return (
                <>
                  <Navbar signedIn={isSignedIn} onClick={setAppState}/>
                  {
                    state === 0 ?
                      <>
                        <Remark editable={true}/>
                        <Remark editable={false}/>
                      </>
                      :
                      <>
                        <h1>Favourites</h1>
                      </>
                  }
                </>
              );
            } else {
              return (
                <>
                  <Navbar signedIn={isSignedIn} onClick={setAppState}/>
                  {
                    state === 0 ?
                      <h1>You are not logged in</h1>
                      :
                      state === 1 ?
                        <Login/>
                        :
                        <Signup/>
                  }
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
