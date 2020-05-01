import Vue from 'vue';
import Vuex from 'vuex';
import Home from './Home';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		loading:false,
	},
	mutations: {
		setLoading(state,bool) {
			state.loading=bool
		},
	},
	actions: {
		
	},
	getters: {},
	modules: {
		Home,
	},
});