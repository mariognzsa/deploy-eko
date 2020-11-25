import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBtp2sFkBDWL1QcaiI1IU4MQh5PUzzTv3s",
    authDomain: "eko-webpage.firebaseapp.com",
    databaseURL: "https://eko-webpage.firebaseio.com",
    projectId: "eko-webpage",
    storageBucket: "eko-webpage.appspot.com",
    messagingSenderId: "608060444228",
    appId: "1:608060444228:web:84d2b992ead20832813611",
    measurementId: "G-GYCGND981Z"
  };

  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);