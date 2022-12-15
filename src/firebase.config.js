import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsJmEdqHJf5iwsK3asY4xBiQUOpGmwkGQ",
    authDomain: "realtor-4828d.firebaseapp.com",
    projectId: "realtor-4828d",
    storageBucket: "realtor-4828d.appspot.com",
    messagingSenderId: "138961019334",
    appId: "1:138961019334:web:bfc5493dd284c44d1352c7"
};

initializeApp(firebaseConfig);
export const db = getFirestore();