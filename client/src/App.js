import React, {useState} from 'react';

import RemarkSet from './components/RemarkSet';
import './styles/styles.scss';

import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider, FirebaseAuthConsumer} from '@react-firebase/auth';
import {firebaseConfig} from "./components/config/FirebaseConfig.js";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";

function App() {
  /* STATES ID's
   * 0 -> Home
   * 1 -> Favourites
   * 2 -> Log In
   * 3 -> Sign Up
   */
  const [state, setState] = useState(0);
  function setAppState(e, id) {
    e.preventDefault();
    setState(id);
  }

  const elementList = [];

  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div className='App'>
        <FirebaseAuthConsumer>
          {({isSignedIn, user}) => {
            elementList.length = 0;
            elementList.push(<Navbar key="nav" signedIn={isSignedIn} state={state} onClick={setAppState}/>)

            state === 0 ?
              elementList.push(
                <div key="remarks">
                  <RemarkSet />
                </div>
              )
              :
              state === 1 && isSignedIn ?
                elementList.push(
                  <Favourites key="favourites" userId={user.uid}/>
                )
                :
                state === 3 && !isSignedIn ?
                  elementList.push(
                    <Signup key="signup" onClick={setAppState}/>
                  )
                  :
                  elementList.push(
                    <Login key="login" onClick={setAppState}/>
                  )

            return (<>
              {elementList}
            </>)
          }}
        </FirebaseAuthConsumer>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
