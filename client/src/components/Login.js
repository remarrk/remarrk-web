import React, {useState} from 'react';
import {signInEmail, signInGoogleAuth} from './Auth';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function signInWithEmail(e, email, password) {
    signInEmail(e, email, password)
      .then(process => {
        props.onClick(e, 0);
      })
      .catch(error => {
        setError(error.code);
      })
  }

  function signInWithGoogle(e) {
    signInGoogleAuth(e)
      .then(process => {
        props.onClick(e, 0);
      })
  }

  return (
    <>
      <form className="form" onSubmit={e => signInWithEmail(e, email, password)}>
        <h1>login</h1>
        <h4 className="error">{error}</h4>
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
        <button className="btn-rect btn-dark" onClick={e => signInWithGoogle(e)}>Sign In With Google</button>
      </form>
      <br/>
      <button className="btn-text btn-text-blue" onClick={e => props.onClick(e, 3)}>Sign Up</button>
    </>
  );
}

export default Login;