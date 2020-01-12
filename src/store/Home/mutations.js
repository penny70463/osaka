import { updateField } from 'vuex-map-fields';

export const state = {
	passCategory: '1',
	queryString: '',
	tempQueryString: '',
	markUrl: '',
	currentPosition: {},
	queryDistance: 500,
	destinations: [],
};
export const mutations = {
	updateField,
	
	setPassCategory(state, category) {
		state.passCategory = category;
	},
	setQueryString(state, string) {
		state.queryString = string;
	},
	setMarkUrl(state, url) {
		state.markUrl = url;
	},
	setCurrentPosition(state, position) {
		//state.currentPosition = position;
		state.currentPosition = { lat: 34.4, lng: 135.3 };
	},
	setQueryDistance(state, value) {
		state.queryDistance = value;
	},
	setDestinations(state, location) {
		state.destinations[location.idx]=location.location
	},
};