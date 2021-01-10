import React, { useState } from "react";
import ReactLoading from "react-loading";
import firebase from "../config/firebase";
const AuthContainer = () => {
  var [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div className="google-btn" id="google" onClick={onClick}>
      {loading ? (
        <ReactLoading
          className="loading"
          type={"spin"}
          width={"32px"}
          height={"32px"}
        />
      ) : (
        <>
          <img src="img/GoogleLogo.png" alt="GoogleLogo" />
          <div className="text">Sign in with Google</div>
        </>
      )}
    </div>
  );
};

export default AuthContainer;
