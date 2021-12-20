import { createApp } from 'vue'
import App from './App'
import sha256 from 'crypto-js/sha256'
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyD6krnRB0F-E_NQcBY_qREXGF41nh8FzW8",
    authDomain: "mapper-51947.firebaseapp.com",
    projectId: "mapper-51947",
    storageBucket: "mapper-51947.appspot.com",
    messagingSenderId: "544616540915",
    appId: "1:544616540915:web:1d3694473f272fddf8a586",
    measurementId: "G-0YZBN31N3Z"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);


const app = createApp(App)

app.mount('#app')