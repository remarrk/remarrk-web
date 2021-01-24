import React, {useState} from 'react';
import firebase from "firebase/app";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signInGoogleAuth(e) {
    e.preventDefault();
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then((res) => {
        console.log("SUCCESS");
      })
      .catch((err) => {
        console.log("ERROR");
      });
  }

  function signInEmailPassword(e, email, password) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("SUCCESS:", res);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  return (
    <>
      <form className="form" onSubmit={(e) => signInEmailPassword(e, email, password)}>
        <h1>login</h1>
        <label>
          email
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} required={true}/>
        </label>
        <br/>
        <label>
          password
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} required={true}/>
        </label>
        <br/>
        <button className="btn-rect btn-peach" type="submit">Sign In</button>
        <br/>
        <button className="btn-rect btn-dark" onClick={(e) => signInGoogleAuth(e)}>Sign In With Google</button>
      </form>
      <br/>
      <button className="btn-text btn-text-blue">Sign Up</button>
    </>
  );
}

export default Login;