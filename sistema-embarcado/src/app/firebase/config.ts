import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtk39EMIe1jek9-zib3DCjAm_QHjZ8nmQ",
  authDomain: "embarcado-web.firebaseapp.com",
  databaseURL: "https://embarcado-web-default-rtdb.firebaseio.com",
  projectId: "embarcado-web",
  storageBucket: "embarcado-web.firebasestorage.app",
  messagingSenderId: "96930563616",
  appId: "1:96930563616:web:23c5eb60c6cbf70b73de45"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);  