// temp
import firebase from 'firebase';
firebase.initializeApp({
  apiKey: 'AIzaSyCbpIVDKY9R5m1d_FmPfUZQNmIirNdPlKg',
  authDomain: 'remarrk-ef187.firebaseapp.com',
  databaseURL: 'https://remarrk-ef187.firebaseio.com',
  projectId: 'remarrk-ef187',
  storageBucket: 'remarrk-ef187.appspot.com',
  messagingSenderId: '371405299174',
  appId: '1:371405299174:web:81cab0a924cf0e3cc88a27',
  measurementId: 'G-FKT6SCKY3P',
});
var db = firebase.firestore();

import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

app.post('/add-remark', (req, res) => {
  let remark = {
    message: req.body.message,
    tags: req.body.tags,
  };
  db.collection('remarks')
    .add(remark)
    .then(() => {
      res.end();
    });
});

app.get('/get-random-remark', (req, res) => {
  db.collection('remarks')
    .get()
    .then((snapshot) => {
      let remarks = snapshot.docs;
      let randIndex = Math.floor(Math.random() * remarks.length);
      res.send(remarks[randIndex].data());
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
