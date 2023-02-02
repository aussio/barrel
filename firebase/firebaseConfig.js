import { getApps, initializeApp } from 'firebase/app';


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwhXL3gcVLIZWV0bugxWPaJ2HqgdMjsrg",
  authDomain: "barrel-be38a.firebaseapp.com",
  projectId: "barrel-be38a",
  storageBucket: "barrel-be38a.appspot.com",
  messagingSenderId: "330254507459",
  appId: "1:330254507459:web:aa2bb61648bddcb0d9f176",
  measurementId: "G-H7W7EK0HS7"
};

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
