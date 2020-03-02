import { updateField } from 'vuex-map-fields';

export const state = {
	passCategory: '4',
	queryString: '',
	tempQueryString: '',
	markUrl: '',
	currentPosition: { lat: '', lng: '',type:1,name: 'your position',address:'' },
	queryDistance: 2,
	destinations: [],
	placesQty:0,
	filterTemp:[]
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
		state.currentPosition.lat = position.lat;
		state.currentPosition.lng = position.lng;
		state.currentPosition.address = position.address;
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