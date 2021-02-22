import firebaseConfig from './config';
import firebase from 'firebase';

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, app, provider, auth };