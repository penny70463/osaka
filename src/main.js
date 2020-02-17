import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './style/main.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from 'vue-router';


Vue.use(router);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;


export default new Vue({
	store,
	//router,
	render: h => h(App),
}).$mount('#app');
