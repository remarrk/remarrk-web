import React, {useState} from 'react';
import {signInEmail, signInGoogleAuth} from './Auth';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form onSubmit={e => signInEmail(e, email, password)}>
        <label>
          email
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          password
          <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type="submit">Sign in With Email</button>
      </form>
      <button onClick={signInGoogleAuth}>Sign In With Google</button>
    </>
  );
}

export default Login;