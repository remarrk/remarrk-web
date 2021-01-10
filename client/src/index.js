import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Remark from './components/Remark';

ReactDOM.render(
  <React.StrictMode>
    <Remark />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
