<template>
	<div
		v-loading="loading"
		element-loading-text="loading"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
		<div
			id="map"
			class="google-map"
		/>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { osakaPass } from '../dummy_data/dataList';
import bus from '../assets/scripts/eventBus';
import {MessageBox} from 'element-ui'
import  { db } from '../../firestore'
export default {
	props: {
		
		
	},
	computed: {
		...mapState('Home', [
			'markUrl',
			'passCategory',
			'queryString',
			'currentPosition',
			'queryDistance',
			'destinations',
			'initialMapSetting',
			'map',
			'lang',
		]
		),
		...mapState( [
			'loading',
		]
		),
		...mapMutations('Home',[
			'setDestinations',
		]),
		...mapGetters('Home', [
			
		]),
		
		currPosition() {
			return this.currentPosition;
		},
	},
	data() {
		return {
			// map: null,
			infowindow: null,
			markers: [],
			locations: [],
			osakaPass,
		};
	},
	watch: {
		
	},
	mounted() {
		this.initMap(12);
		bus.$on('queryString',event=>{
			this.initMap(14);
			//eventType 是否為查詢字串
			if(event.eventType) {
				this.getInfoFromQuery(this.queryString,undefined)
			} else {
				this.getDistance();
			}
			
		})
	},
	methods: {
		...mapActions('Home', [
			'initMap',
		]),
	
		resetCenter() {
				this.map.setOptions({ 
				center: {
					lat: this.initialMapSetting.center.default.lat, 
					lng: this.initialMapSetting.center.default.lng
					}});
		},
		clearMarkers() {
			this.markers.forEach(marker => marker.setMap(null));
			this.markers = [];
		},
		//搜尋更新景點及使用者搜尋字串
		getInfoFromQuery(elm, idx) {
			 let service = new google.maps.places.PlacesService(this.map);
			service.findPlaceFromQuery({ query: idx ? elm.dm.proto.fields.name.stringValue :elm,
				fields: ['name', 'geometry', 'formatted_address'] }, this.fieldResult(elm,idx));
		},
		fieldResult(elm,idx) {
			let osakaString=['osaka','大阪', 'Osaka']
			function checkString(string,address) {
				if(address && address.includes(string)) {
					return false
				} else {
					return true
				}
			}
			return async (results, status)=>{
				//取得搜尋位置
				if(status=='OVER_QUERY_LIMIT') {
					MessageBox.alert('System is busy ! Please try again!','hint',{
							callback:()=>{
								
							}
						})
				}
				if(idx===undefined) {
					//undefined即現正位置
					if( status==='OK' ) {
						this.$store.commit('Home/setCurrentPosition', 
						{
							lat:results[0].geometry.location.lat(), 
							lng:results[0].geometry.location.lng(), 
							name: results[0].name, 
							address:results[0].formatted_address,})
					}
					if(status==='ZERO_RESULTS') {
						MessageBox.alert("Can't find this place, please try again!",'hint',{
							callback:()=>{
								this.initMap(12)
								return;
							}
						})
					}
					if( osakaString.every( el => checkString(el, this.currPosition.address))) {
						MessageBox.alert('This location is not in osaka ! Please search again!','hint',{
							callback:()=>{
								this.initMap(12)
								return;
							}
						})
					}
					
					if(this.currPosition.lat && this.currPosition.lng ) {
						this.getDistance();
					}
				}else {
					//取得景點列表位置
					if(status==='OK') {
						db.collection(`2020-4-6`).doc(elm.id).update({
							info: { 
								idx, location:{lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()}, name: results[0].name, address:results[0].formatted_address}
						})
					}

				}
				} 
				
		},
		getDistance() {
			function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
			var R = 6371; // Radius of the earth in km
			var dLat = deg2rad(lat2-lat1);  // deg2rad below
			var dLon = deg2rad(lon2-lon1); 
			var a = 
				Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
				Math.sin(dLon/2) * Math.sin(dLon/2)
				; 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c; // Distance in km
			return d;
			}

			function deg2rad(deg) {
			return deg * (Math.PI/180)
			}
			db.collection(`2020-4-6`).get().then((doc)=>{
				doc.docs.forEach( elm =>{
				let fields=elm.dm.proto.fields
				if(fields.info) {
					let distance=getDistanceFromLatLonInKm(
					fields.info.mapValue.fields.location.mapValue.fields.lat.doubleValue,
					fields.info.mapValue.fields.location.mapValue.fields.lng.doubleValue,
					this.currentPosition.lat,
					this.currentPosition.lng)
				if(distance <= this.queryDistance) {
					this.marker(elm)
				}
				}
				})
			})
			this.marker(this.currPosition)
		},
		async marker(elm) {
			let markerLat,markerLng,markerType
			if(elm.type) {
				markerLat=elm.lat;
				markerLng=elm.lng;
				markerType='https://image.flaticon.com/icons/svg/1329/1329665.svg'
			} else {
				markerLat=elm.dm.proto.fields.info.mapValue.fields.location.mapValue.fields.lat.doubleValue;
				markerLng=elm.dm.proto.fields.info.mapValue.fields.location.mapValue.fields.lng.doubleValue;
				markerType='https://image.flaticon.com/icons/svg/684/684908.svg';
			}
			//current marker
			let marker = new google.maps.Marker({
          				map: this.map,
						position: new google.maps.LatLng(markerLat, markerLng),
						icon: {
						//url: 'http://maps.google.com/mapfiles/kml/pushpin/' + type,
						url:markerType,
						size: new google.maps.Size(35, 35),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(35, 35),
						},
			});
			this.markerInfo(marker,elm)
			
		},
		
		//經緯度create Marker
		async markerInfo(marker,elm) {
			let language=this.lang
			let store = this.$store
			await google.maps.event.addListener(marker, 'click', function() {
				let infowindow = new google.maps.InfoWindow({
				});
			let langName = language == 'tc' ? 'name' : `${language}Name`	
			let langContent = language == 'tc' ? 'content' : `${language}Content`
			let infoDiv = document.createElement('div')
			infoDiv.innerHTML = elm.name ? `<div class="location-name">${elm.name}</div>`:
				`<div class="location-name">${elm.dm.proto.fields[langName].stringValue}</div>
				<div class="operate-wrap">
					<div id="rating" class="operate">Go Rating</div>
					<div id="comments" class="operate">View Comments</div>
				</div>
				
				<hr>
				<span class="location-address">${elm.dm.proto.fields.info.mapValue.fields.address.stringValue}</span>
				<br>
				<span>${JSON.parse(JSON.stringify(elm.dm.proto.fields[langContent])).stringValue}</span>`
			
			google.maps.event.addListener(infowindow, 'domready',function( ){
				let rating = document.getElementById('rating')
				let comments = document.getElementById('comments')

				let temp=[]
				if(elm.dm.proto.fields.ratings && elm.dm.proto.fields.ratings.arrayValue.values) {
					elm.dm.proto.fields.ratings.arrayValue.values.forEach(elm=>{
						temp.push({
							userName:elm.mapValue.fields.userName.stringValue,
							rate:Number(elm.mapValue.fields.rate.integerValue),
							comment:elm.mapValue.fields.comment.stringValue,
						})
					})
				}
				store.commit('Home/setRatingCommentsRef',temp)
				store.commit('Home/setRatingCommentsRefId',elm.id)
				rating.onclick = function() {
					store.dispatch('Home/goRating',1)
			}
				comments.onclick = function() {
					store.commit('Home/setRatingComments',temp)
					store.dispatch('Home/goRating',0)
				}
			})
				
			 infowindow.setContent(infoDiv);
			infowindow.open(this.map, marker);
			
			});
			
			
				
			
			
			this.$store.commit('Home/setInitialMapSetting', {name:'center',data:{ lat:this.currPosition.lat, lng:this.currPosition.lng}})
			 this.resetCenter();	
			 this.$store.commit('setLoading',false)
		},
		
		dbImport() {
			db.collection(`2020-4-6`).get().then((doc)=>{
					doc.docs.forEach((elm,i)=> {
						//若無info , call map API補齊
						if(!elm.dm.proto.fields.ratings) {
							db.collection(`2020-4-6`).doc(elm.id).update({ratings: []})
							console.log(elm.dm.proto.fields.name)
						}
					
				})
			})
		},
	},
	beforeDestroy() {
		bus.$off('queryString')
	},
};
</script>
<style>
#map{
	height:500px;
	width:100%;
}
</style>