import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore'
import VueTextAreaAutosize from 'vue-textarea-autosize';
import DatetimePicker from 'vuetify-datetime-picker';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.use(VueTextAreaAutosize);
Vue.use(DatetimePicker);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtp2sFkBDWL1QcaiI1IU4MQh5PUzzTv3s",
  authDomain: "eko-webpage.firebaseapp.com",
  databaseURL: "https://eko-webpage.firebaseio.com",
  projectId: "eko-webpage",
  storageBucket: "eko-webpage.appspot.com",
  messagingSenderId: "608060444228",
  appId: "1:608060444228:web:84d2b992ead20832813611",
  measurementId: "G-GYCGND981Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});
