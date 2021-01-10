// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";
// import firebase from "./config/firebase";
// function App() {
//   const [test, setTest] = useState(0);

//   const testServer = () => {
//     axios.get("http://localhost:3001/").then((resp) => {
//       console.log(resp.data);
//     });
//   };

//   const addTestData = () => {
//     axios.post("http://localhost:3001/add", { test: test }).then((res) => {
//       console.log(res.data);
//     });
//   };
//   const onClick = () => {
//     firebase
//       .auth()
//       .signInWithPopup(new firebase.auth.GoogleAuthProvider())
//       .then((response) => {
//         console.log(response);
//       });
//   };

//   return (
//     <div className="App">
//       <input
//         type="text"
//         value={test}
//         onChange={(event) => setTest(event.target.value)}
//       />
//       <button value="" onClick={addTestData}>
//         Click here!
//       </button>
//       <button onClick={onClick}>sign in </button>
//     </div>
//   );
// }

// export default App;
import Router from './Router';
import React from 'react'
import  configureStore  from './redux';
import { Provider } from 'react-redux';


const store = configureStore();


const App = () => {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  )

}

export default App
