import React from 'react';
import {signOut} from './Auth.js';

import '../styles/navbar.scss';

function Navbar(props) {
  function signOutAccount(e) {
    signOut(e);
    props.onClick(e, 0);
  }

  return (
    <div className="nav-bar">
      <h2 className="nav-title" onClick={e => props.onClick(e, 0)}>remarrk.</h2>
      {
        props.signedIn ?
          <div className="nav-navigation">
            <button onClick={e => props.onClick(e, 1)}>favourites</button>
            <button onClick={signOutAccount}>sign out</button>
          </div>
          :
          <div className="nav-navigation">
            {
              props.state === 2 ?
                null
                :
                <button onClick={e => props.onClick(e, 2)}>login</button>
            }

          </div>
      }
    </div>
  );
}

export default Navbar;