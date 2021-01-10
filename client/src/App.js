import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [remark, setRemark] = useState();
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState([]);

  const addRemark = () => {
    axios.post('http://localhost:3001/add-remark', { message: message, tags: tags }).then(() => {
      console.log("Remark added. This is where we'd clear those fields and give user feedback.");
    });
  };

  const getRandomRemark = () => {
    axios.get('http://localhost:3001/get-random-remark').then((res) => {
      console.log('Received remark!');
      setRemark(res.data);
    });
  };

  return (
    <div className='App'>
      <label>Message:</label>
      <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
      <br />
      <label>Tags:</label>
      <input type='text' value={tags} onChange={(e) => setTags(e.target.value.split(',').map((x) => x.trim()))} />
      <br />
      <button onClick={addRemark}>Send remark</button>
      <hr />
      <button onClick={getRandomRemark}>Get random remark</button>
      <p>Remark: {remark ? remark.message : ''}</p>
      <p>Tags: {remark ? remark.tags.join(', ') : ''}</p>
    </div>
  );
}

export default App;
