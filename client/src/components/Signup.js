import React, {useState} from 'react';
import {signUpEmail} from "./Auth";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [error, setError] = useState(null);

  function matchPasswords(e, email, password) {
    if (password === passwordMatch)
      signUpEmail(e, email, password)
        .then(() => {
          props.onClick(e, 0);
        })
        .catch(error => {
          setError(error.code);
        });
  }

  return (
    <>
      <form className="form" onSubmit={e => matchPasswords(e, email, password)}>
        <h1>sign up</h1>
        <h4 className="error">{error}</h4>
        <label>
          email
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required={true}/>
        </label>
        <br/>
        <label>
          password
          <input type="password" name="password" minLength="8" value={password} onChange={e => setPassword(e.target.value)} required={true}/>
        </label>
        <br/>
        <label>
          confirm password
          <input type="password" name="passwordMatch" pattern={password} value={passwordMatch} onChange={e => setPasswordMatch(e.target.value)} required={true}/>
        </label>
        <br/>
        <button className="btn-rect btn-peach" type="submit">Sign up</button>
      </form>
    </>
  );
}

export default Signup;