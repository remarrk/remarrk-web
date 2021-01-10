import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const initialState = {
  loggedIn : false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'setLoggedIn': {
      return { ...state, ...action.data};
    }
    default:
      return state;
  }
}


export default () => createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));