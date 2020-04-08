<template>
	<div>
		<h2>map here</h2>
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
		this.initMap();
		bus.$on('queryString',event=>{
			this.initMap();
			this.getInfoFromQuery(this.queryString,undefined)
		})
	},
	methods: {
		...mapActions('Home', [
			'initMap',
		]),
		// initMap() {
		// 	this.map = new google.maps.Map(document.getElementById('map'), {
		// 		center: this.initialMapSetting.center.default,
		// 		zoom: this.initialMapSetting.zoom.default,
		// 		maxZoom: 20,
		// 		minZoom: 3,
		// 		streetViewControl: this.initialMapSetting.streetViewControl.default,
		// 		mapTypeControl: this.initialMapSetting.mapTypeControl.default,
		// 		fullscreenControl: this.initialMapSetting.fullscreenControl.default,
		// 		zoomControl: this.initialMapSetting.zoomControl.default,
		// 	});
		// },
		resetCenter(lat, lng) {
			// set center
			this.map.panTo({ lat: lat || this.center.lat, lng: lng || this.center.lng });
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
				console.log(results, status)
				//取得搜尋位置
				if(status=='OVER_QUERY_LIMIT') {
					MessageBox.alert('system is busy ! Please try again!','hint',{
							callback:()=>{
								
							}
						})
				}
				if(idx===undefined) {
					//undefined即現正位置
					if( status==='OK' ) {
						this.$store.commit('Home/setCurrentPosition', {lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng(), name: results[0].name, address:results[0].formatted_address})
					}
					if(status==='ZERO_RESULTS') {
						MessageBox.alert("Can't find this place, please try again!",'hint',{
							callback:()=>{
								this.initMap()
								return;
							}
						})
					}
					if( osakaString.every( el => checkString(el, this.currPosition.address))) {
						MessageBox.alert('not in osaka ! PLEASE SEARCH AGAIN!','hint',{
							callback:()=>{
								this.initMap()
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
			// this.destinations.forEach(elm=>{
			// 	let info=elm.dm.proto.fields.info
			// 	elm.distance=getDistanceFromLatLonInKm(info.location.lat,info.location.lng,this.currentPosition.lat,this.currentPosition.lng)
			// 	if(elm.distance <= this.queryDistance) {
			// 		this.marker(elm)
			// 	}
			// })
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
			this.$store.commit('Home/setInitialMapSetting',{name:'zoom',data:15})
		},

		//經緯度create Marker
		async markerInfo(marker,elm) {
			google.maps.event.addListener(marker, 'click', function() {
				let infowindow = new google.maps.InfoWindow({
				});
				infowindow.setContent(`<span>${elm.dm.proto.fields.name.stringValue}<br>${elm.dm.proto.fields.info.mapValue.fields.address.stringValue}</span>`);
				infowindow.open(this.map, marker);
			});
			 this.resetCenter(this.currPosition.lat, this.currPosition.lng);	
		},
		async defaultSetting() {
			//取得各地點資訊
			// let temp = [];
			// Object.values(this.osakaPass).forEach(elm=>{
			// 	elm.forEach(el=>{
			// 		temp = temp.concat(el);
			// 	});
			// });
			// await this.$store.commit('Home/setPlacesQty',temp.length)
			// await temp.forEach((elm, idx)=>{
			// 	this.getInfoFromQuery(elm, idx);
			// });
			
		},
		dbImport() {
			
			
			// db.collection(`2020-4-6`).get().then((doc)=>{
			// 		doc.docs.forEach((elm,i)=> {
			// 			//若無info , call map API補齊
			// 			if(!elm.dm.proto.fields.info) {
			// 				console.log(elm.dm.proto.fields.info,elm)
			// 				this.getInfoFromQuery(elm,i)
			// 			}
					
			// 	})
			// })
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