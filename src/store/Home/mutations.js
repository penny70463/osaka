import { updateField } from 'vuex-map-fields';

export const state = {
	lang:'tc',
	passCategory: '4',
	queryString: '',
	tempQueryString: '',
	markUrl: '',
	currentPosition: { lat: '', lng: '',type:1,name: 'your location',address:'' },
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
	mapLoading:false,
	registerDialog: {
		visible:false,
		//type: 0 log in, 1 register, 2 updateUserInfo
		type:0 },
	userInfo: {
		email:'',
		password:'',
		name:''
	},
	tempUserInfo: {
		email:'',
		password:'',
		name:''
	},
	logInStatus:false,
};
export const mutations = {
	updateField,
	setLang(state,lang) {
		state.lang=lang
	},
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
	setMapLoading(state, bool) {
		state.mapLoading=bool
	},
	setRegisterDialog(state, {visible,type}) {
		//register: 0 log in, 1 register,2 update
		state.registerDialog.type = type
		state.registerDialog.visible = visible
	},
	setUserInfo(state, info) {
		state.userInfo = info
	},
	resetTempUserInfo(state) {
		state.tempUserInfo.name = ''
		state.tempUserInfo.password = ''
		state.tempUserInfo.email = ''
	},
	setLogInStatus(state,bool) {
		state.logInStatus = bool
	}
}