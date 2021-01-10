import React, {useState} from 'react';
import {signUpEmail} from "./Auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  function matchPasswords(e, email, password) {
    if (password === passwordMatch) signUpEmail(e, email, password);
  }

  return (
    <>
      <form onSubmit={e => matchPasswords(e, email, password)}>
        <label>
          email
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required={true}/>
        </label>
        <label>
          password
          <input type="password" name="password" minLength="8" value={password} onChange={e => setPassword(e.target.value)} required={true}/>
        </label>
        <label>
          confirm password
          <input type="password" name="passwordMatch" pattern={password} value={passwordMatch} onChange={e => setPasswordMatch(e.target.value)} required={true}/>
        </label>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default Signup;