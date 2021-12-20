import { createApp } from 'vue'
import App from './App'
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD6krnRB0F-E_NQcBY_qREXGF41nh8FzW8",
    authDomain: "mapper-51947.firebaseapp.com",
    projectId: "mapper-51947",
    storageBucket: "mapper-51947.appspot.com",
    messagingSenderId: "544616540915",
    appId: "1:544616540915:web:c366523dd13a8e4ff8a586",
    measurementId: "G-N5X3819F3E"
};

firebase.initializeApp(firebaseConfig)
const app = createApp(App)

app.mount('#app')