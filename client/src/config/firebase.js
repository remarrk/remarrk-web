import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyCbpIVDKY9R5m1d_FmPfUZQNmIirNdPlKg',
    authDomain: 'remarrk-ef187.firebaseapp.com',
    databaseURL: 'https://remarrk-ef187.firebaseio.com',
    projectId: 'remarrk-ef187',
    storageBucket: 'remarrk-ef187.appspot.com',
    messagingSenderId: '371405299174',
    appId: '1:371405299174:web:81cab0a924cf0e3cc88a27',
    measurementId: 'G-FKT6SCKY3P',
};


firebase.initializeApp(firebaseConfig);

export default firebase;