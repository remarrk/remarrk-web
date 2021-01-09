// temp
import firebase from 'firebase';
firebase.initializeApp({
  apiKey: "AIzaSyCbpIVDKY9R5m1d_FmPfUZQNmIirNdPlKg",
  authDomain: "remarrk-ef187.firebaseapp.com",
  databaseURL: 'https://remarrk-ef187.firebaseio.com',
  projectId: "remarrk-ef187",
  storageBucket: "remarrk-ef187.appspot.com",
  messagingSenderId: "371405299174",
  appId: "1:371405299174:web:81cab0a924cf0e3cc88a27",
  measurementId: "G-FKT6SCKY3P"
});
var db = firebase.firestore();

import express from 'express';
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
  db.collection('test').add({
    "my-test": 1,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
