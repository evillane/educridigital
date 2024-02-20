import firebase from "firebase/compat/app";
import "firebase/compat/auth";


export const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyDAxpkfHOEr2rJf3h_Bfpb-E5R6c4tsRaY",
        authDomain: "educri-2f856.firebaseapp.com",
        projectId: "educri-2f856",
        storageBucket: "educri-2f856.appspot.com",
        messagingSenderId: "683083494882",
        appId: "1:683083494882:web:2a17d13986b5aa6461b5bb",
        measurementId: "G-6QCBKL2S3L"
  });

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();

