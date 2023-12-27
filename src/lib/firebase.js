// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsVlng-JMTu3hIkea2-2jQa-6H1dEA0_4",
    authDomain: "ccs-panel.firebaseapp.com",
    databaseURL: "https://ccs-panel-default-rtdb.firebaseio.com",
    projectId: "ccs-panel",
    storageBucket: "ccs-panel.appspot.com",
    messagingSenderId: "87670949063",
    appId: "1:87670949063:web:d50590a72e7ae4945b2ae2",
    measurementId: "G-XMHXVQFTWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Use getAuth to obtain the authentication object

export default app;
export { auth };
