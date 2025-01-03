// Import the functions you need from the SDKs you need
import {applicationDefault, initializeApp} from "firebase-admin/app";


// https://firebase.google.com/docs/web/setup#available-libraries
import 'dotenv/config'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.FB_API_KEY,
//     authDomain: process.env.FB_AUTH_DOMAIN,
//     projectId: process.env.FB_PROJECT_ID,
//     storageBucket: process.env.FB_STORAGE_BUCKET,
//     messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
//     appId: process.env.FB_APP_ID,
//     measurementId: process.env.FB_MEASUREMENT_ID
// };

// Initialize Firebase
const app = initializeApp({
    credential: applicationDefault()
});


export {app}