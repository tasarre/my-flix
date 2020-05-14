import firebase from "firebase"

var config = {
  apiKey: "*****************************",
  authDomain: "**********************************",
  databaseURL: "**************************************",
  projectId: "******************",
  storageBucket: "**********************",
  messagingSenderId: "***********",
  appId: "**********************"
  };
  // Initialize Firebase
  export default firebase.initializeApp(config);