// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRn5QDUwSD8Bs6SaDxg1rY7N-yGmkj_lI",
  authDomain: "celetel-project.firebaseapp.com",
  databaseURL:
    "https://celetel-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "celetel-project",
  storageBucket: "celetel-project.appspot.com",
  messagingSenderId: "687273295186",
  appId: "1:687273295186:web:42d6371137c856f1fc4e8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
