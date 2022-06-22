
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCSwBq858CoNnMriDGWzKLLb-GoKpjviJY",
  authDomain: "recipe-app-4b2dd.firebaseapp.com",
  projectId: "recipe-app-4b2dd",
  storageBucket: "recipe-app-4b2dd.appspot.com",
  messagingSenderId: "827702839215",
  appId: "1:827702839215:web:091d6fe9e26ceb8840515a"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}