import { updateField } from 'vuex-map-fields';
import { MessageBox } from 'element-ui'
export const state = {
	lang:'tc',
	passCategory: '4',
	queryString: '',
	tempQueryString: '',
	markUrl: '',
	currentPosition: { lat: '', lng: '',type:1,name: 'my location',address:'' },
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
	infoRatingVisible:false,
	infoRatingType:0,
	ratingComments:[
		{
			userName:'',
			comment:'',
			rate:0,
		}
	],
	//user go rating info
	ratingCommentsRef:{
			userName:'',
			comment:'',
			rate:0,
		}
	,
	ratingCommentsRefId:'',
	rateSum:{
		count:0,
		ave:0,
	},
	locationInfo:{
		name:'',
		address:'',
		content:'',
	}
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
	},

	setInfoRatingVisible(state,bool) {
		state.infoRatingVisible = bool
	},

	setInfoRatingType(state,val){
		if(val) {
			if(!state.logInStatus) {
				MessageBox.alert('Please Log in!','hint',{
					confirmButtonText: 'OK',
				})
				return
			} else if(state.ratingComments.some(elm=>{
				return elm.userName == state.userInfo.name
			})) {
				MessageBox.alert('You have comment alredy!','hint',{
					confirmButtonText: 'OK',
				})
				return
			}
		}
		state.infoRatingType = val
	},

	resetRatingComments(state){
		state.ratingComments= [
			{
				comment:'',
				rate:0,
			}
		]
	},

	setRatingComments(state,list) {
		state.ratingComments = list
	},
	setRatingCommentsRef(state,list) {
		state.ratingCommentsRef = list
	},

	setRatingCommentsRefId(state,id) {
		state.ratingCommentsRefId = id
	},
	setRateSum(state, data) {
		state.rateSum = data
	},
	setLocationInfo(state, info) {
		state.locationInfo = info
	},
	resetRatingCommentsRef() {
		state.ratingCommentsRef = {
			userName:'',
			comment:'',
			rate:0,
		}
	}
}