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
	filterTemp:[],
	map:null,
	initialMapSetting: {
		center: {
			type: Object,
			default: { lat: 34.669203, lng: 135.503570 },
		},
		zoom: {
			type: Number,
			default: 12,
		},
		streetViewControl: {
			type: Boolean,
			default: true,
		},
		mapTypeControl: {
			type: Boolean,
			default: true,
		},
		fullscreenControl: {
			type: Boolean,
			default: true,
		},
		zoomControl: {
			type: Boolean,
			default: true,
		},
	},
	
	
};
export const mutations = {
	updateField,
	
	setPassCategory(state, category) {
		state.passCategory = category;
	},
	setQueryString(state, {type, string}) {
		//type 0=>reset, type 1=>update
		if(type) {
			state.queryString = string;
		} else {
			state.tempQueryString='';
			state.queryString='';
			state.queryDistance=''
		}
		
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
	setInitialMapSetting(state,{name,data}) {
		state.initialMapSetting[name].default=data
	},
	
};