import { updateField } from 'vuex-map-fields';

export const state = {
	passCategory: '4',
	queryString: '',
	tempQueryString: '',
	markUrl: '',
	currentPosition: { lat: 34.4, lng: 135.3 },
	queryDistance: 500,
	destinations: [],
	placesQty:0,
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
		state.currentPosition = position;
	},
	setQueryDistance(state, value) {
		state.queryDistance = value;
	},
	setDestinations(state, {info,idx}) {
		state.destinations[idx]=info
	},
	setPlacesQty(state,qty) {
		state.placesQty=qty
	},
};