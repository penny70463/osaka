import * as json from './freeFacilites.json'

let firebase = require('firebase/app');
require('firebase/firestore');
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCQnB2rjdsIw-sEfWG71c37sy-qoJeLjwc",
    authDomain: "osaka-map-1573973124960.firebaseapp.com",
    databaseURL: "https://osaka-map-1573973124960.firebaseio.com",
    projectId: "osaka-map-1573973124960",
    storageBucket: "osaka-map-1573973124960.appspot.com",
    messagingSenderId: "547081207024",
    appId: "1:547081207024:web:087eaeb54ebeaf3e53d635",
    measurementId: "G-T1RWX0JBXD"
  };
  // Initialize Firebase
  let app=firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();

 console.log(json)
