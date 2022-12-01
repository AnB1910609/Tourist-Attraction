import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyBDCrglasNyyhOLk8EJAShbAG843uJ1YbM",
  authDomain: "tourist-attraction-57ff7.firebaseapp.com",
  projectId: "tourist-attraction-57ff7",
  storageBucket: "tourist-attraction-57ff7.appspot.com",
  messagingSenderId: "26734881519",
  appId: "1:26734881519:web:0d70af68da4aad1769091a",
};

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
