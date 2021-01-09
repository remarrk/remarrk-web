import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [test, setTest] = useState(0);

  const testServer = () => {
    axios.get('http://localhost:3001/').then((resp) => {
      console.log(resp.data);
    });
  };

  const addTestData = () => {
    axios.post('http://localhost:3001/add', { test: test }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className='App'>
      <input type='text' value={test} onChange={(event) => setTest(event.target.value)} />
      <button value='' onClick={addTestData}>
        Click here!
      </button>
    </div>
  );
}

export default App;
