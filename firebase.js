import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5fbf_XZ3kyHIiTjT7NMVgbtSKHCurGuw",
    authDomain: "gdocs-shakthi.firebaseapp.com",
    projectId: "gdocs-shakthi",
    storageBucket: "gdocs-shakthi.appspot.com",
    messagingSenderId: "572517478755",
    appId: "1:572517478755:web:c7b95805e549b8e89be356"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export { db };