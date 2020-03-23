import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './style/main.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from 'vue-router';
// import * as json from '../freeFacilities.json'

// let firebase = require('firebase/app');
// require('firebase/firestore');
// // Your web app's Firebase configuration
// let firebaseConfig = {
//     apiKey: "AIzaSyCQnB2rjdsIw-sEfWG71c37sy-qoJeLjwc",
//     authDomain: "osaka-map-1573973124960.firebaseapp.com",
//     databaseURL: "https://osaka-map-1573973124960.firebaseio.com",
//     projectId: "osaka-map-1573973124960",
//     storageBucket: "osaka-map-1573973124960.appspot.com",
//     messagingSenderId: "547081207024",
//     appId: "1:547081207024:web:087eaeb54ebeaf3e53d635",
//     measurementId: "G-T1RWX0JBXD"
//   };
//   // Initialize Firebase
//   let app=firebase.initializeApp(firebaseConfig);
//   const db=firebase.firestore();

//  //json.default.forEach(elm=>{
// 	// db.collection("freeFacilities").add({
// 	// 	id: elm.id,
// 	// 	name: elm.name,
// 	// 	content: elm.content,
// 	// })
//  //})
//  db.collection("freeFacilities").get().then((doc)=>{
//    console.log(doc.docs[0].dm.proto.fields.name.stringValue)
//  })

Vue.use(router);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;


export default new Vue({
	store,
	//router,
	render: h => h(App),
}).$mount('#app');
