import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsVlng-JMTu3hIkea2-2jQa-6H1dEA0_4",
  authDomain: "ccs-panel.firebaseapp.com",
  databaseURL: "https://ccs-panel-default-rtdb.firebaseio.com",
  projectId: "ccs-panel",
  storageBucket: "ccs-panel.appspot.com",
  messagingSenderId: "87670949063",
  appId: "1:87670949063:web:d50590a72e7ae4945b2ae2",
  measurementId: "G-XMHXVQFTWD",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth, db };
