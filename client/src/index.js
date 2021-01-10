import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Remark from './components/Remark';
import  configureStore  from './redux';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

