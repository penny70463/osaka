import Vue from 'vue';
import router from 'vue-router';
import NearBy from './components/sort/nearBy.vue';

Vue.use(router);

export default new router({
	routes: [
		{
			path: '',
			name: '',
			component: NearBy,

		},
	],
});