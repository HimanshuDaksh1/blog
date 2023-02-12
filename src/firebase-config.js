import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBi3D-gEZ509eSEypak0XymHAnJr-FqNHE",
  authDomain: "blogprojact.firebaseapp.com",
  projectId: "blogprojact",
  storageBucket: "blogprojact.appspot.com",
  messagingSenderId: "418501645973",
  appId: "1:418501645973:web:b2b3520604da37197fad9c"
};
 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const auth = getAuth(app);
 export const storage = getStorage(app)

 export const provider = new GoogleAuthProvider();