import firebase from "firebase"

var config = {
  apiKey: "AIzaSyCVR_bVvaJ5WP7T-jmRIiNExrmM2bcfl8A",
  authDomain: "my-flix-7b243.firebaseapp.com",
  databaseURL: "https://my-flix-7b243.firebaseio.com",
  projectId: "my-flix-7b243",
  storageBucket: "my-flix-7b243.appspot.com",
  messagingSenderId: "807919013658",
  appId: "1:807919013658:web:e62f9f0e1a9ad9a32e26a3"
  };
  // Initialize Firebase
  export default firebase.initializeApp(config);