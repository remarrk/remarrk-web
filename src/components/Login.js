import React, {useState} from 'react';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form className="form">
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
        <button className="btn-rect btn-dark">Sign In With Google</button>
      </form>
      <br/>
      <button className="btn-text btn-text-blue">Sign Up</button>
    </>
  );
}

export default Login;