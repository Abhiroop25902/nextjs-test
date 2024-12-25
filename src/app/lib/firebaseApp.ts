// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import 'dotenv/config'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID
};

console.log(process.env.FB_API_KEY)
console.log(process.env.FB_AUTH_DOMAIN)
console.log(process.env.FB_PROJECT_ID)
console.log(process.env.FB_STORAGE_BUCKET)
console.log(process.env.FB_MESSAGING_SENDER_ID)
console.log(process.env.FB_APP_ID)
console.log(process.env.FB_MEASUREMENT_ID)


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export {app}