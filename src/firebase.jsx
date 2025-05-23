// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1xFPIAq7VnOQcdKIzJxz86Gd82dwXtO0",
    authDomain: "flash-food-2789b.firebaseapp.com",
    projectId: "flash-food-2789b",
    storageBucket: "flash-food-2789b.firebasestorage.app",
    messagingSenderId: "448178826462",
    appId: "1:448178826462:web:ef3026e6a5259368c2e64f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");

export { auth, providerGoogle, providerGithub, microsoftProvider };
