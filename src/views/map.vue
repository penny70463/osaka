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

export default {
	props: {
		center: {
			type: Object,
			default: () => ({ lat: 34.669203, lng: 135.503570 }),
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
		restaurants: {
			type: Array,
			default: () => [
			],
		},
		requests: {
			type: Array,
			default: () => [
			],
		},
	},
	computed: {
		...mapState('Home', [
			'markUrl',
			'passCategory',
			'queryString',
			'currentPosition',
			'queryDistance',
			'destinations',
		]
		),
		...mapMutations('Home',[
			'setDestinations',
		]),
		...mapGetters('Home', [
			'convertOsakaPass',
		]),
		queryStringChange() {
			return this.queryString;
		},
		currPosition() {
			return this.currentPosition;
		},
	},
	data() {
		return {
			map: null,
			infowindow: null,
			markers: [],
			locations: [],
			osakaPass,
		};
	},
	watch: {
		center(val) {
			this.resetCenter();
		},
		// requests() {
		// 	console.log('watchReq')
		// 	this.initMap();
		// 	this.passReq();
		// },
		// queryStringChange() {
		// 	console.log('querystring')
		// 	this.passReq();
		// },
		// currPosition() {
		// 	this.initMap();
		// 	this.currMarker();
		// },
	},
	mounted() {
		 this.initMap();
		// this.passReq();
		this.defaultSetting();
	},
	methods: {
		...mapActions('Home', [
			
		]),
		initMap() {
			this.map = new google.maps.Map(document.getElementById('map'), {
				center: this.center,
				zoom: this.zoom,
				maxZoom: 20,
				minZoom: 3,
				streetViewControl: this.streetViewControl,
				mapTypeControl: this.mapTypeControl,
				fullscreenControl: this.fullscreenControl,
				zoomControl: this.zoomControl,
			});
		},
		resetCenter(lat, lng) {
			// set center
			this.map.panTo({ lat: lat || this.center.lat, lng: lng || this.center.lng });
		},
		clearMarkers() {
			this.markers.forEach(marker => marker.setMap(null));
			this.markers = [];
		},
		
		async getPlaces(req, type) {
			await this.$store.commit('Home/setMarkUrl', type, { root: true });
			let service = new google.maps.places.PlacesService(this.map);
			let map2 = this.map;
			
			service.findPlaceFromQuery(req.queryObj, function(results, status) {
				if(status == 'OK') {
					let marker = new google.maps.Marker({
          				map: map2,
				  		position: results[0].geometry.location,
				 		 icon: {
							url: 'http://maps.google.com/mapfiles/kml/pushpin/' + type,
							size: new google.maps.Size(50, 50),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(17, 34),
							scaledSize: new google.maps.Size(50, 50),
						},
					});

					google.maps.event.addListener(marker, 'click', function() {
						let infowindow = new google.maps.InfoWindow({
						});
						infowindow.setContent(`${results[0].name} : ${results[0].formatted_address}`);
						infowindow.open(this.map, marker);
					});
				}
				//若為搜尋結果,resetCenter
				if(type === 'red-pushpin.png') {
					map2.panTo(results[0].geometry.location);
				}
			});
		},
		async passReq() {
			function test(val) {
				if(val.type) {
					return 'red-pushpin.png';
				} else {
					return 'wht-pushpin.png';
				}
			}
			for(let req of this.requests) {
				await this.getPlaces(req, test(req));
			}
		},
		getInfoFromQuery(elm, idx) {
			console.log('getInfoFromQuery')
			let service = new google.maps.places.PlacesService(this.map);
			service.findPlaceFromQuery({ query: elm,
				fields: ['name', 'geometry', 'formatted_address'] }, this.fieldResult(idx));
		},
		fieldResult(idx) {
			return async (results, status)=>{
				console.log(idx,results,status)
				await status==='OK' ? 
				this.$store.commit('Home/setDestinations',{ idx, location:results[0].geometry.location}): 
				this.$store.commit('Home/setDestinations',{ idx, location:null})	
				this.getDistance();
			};
		},
		getDistance() {
			console.log(this.destinations,'destinations')
			//let service = new google.maps.DistanceMatrixService();
			
			// service.getDistanceMatrix({
				   
			// 	// origins: this.destinations.filter(elm=>elm!=null),
			// 	// destinations: this.destinations.filter(elm=>elm!=null),
			// 	travelMode: 'DRIVING',
			// 	// transitOptions: TransitOptions,
			// 	// drivingOptions: DrivingOptions,
			// 	// unitSystem: UnitSystem,
			// 	// avoidHighways: Boolean,
			// 	// avoidTolls: Boolean,
			// },(response,status)=>{console.log('getdistance',response,status)})
			
		},
		distanceResults(response,status) {
			console.log('distanceResults',response,status)
		},
		//經緯度create Marker
		async currMarker() {
			let temp = [];
			//all places
			Object.values(this.osakaPass).forEach(elm=>{
				elm.forEach(el=>{
					temp = temp.concat(el);
				});
			});
			//current marker
			// let marker = new google.maps.Marker({
          	// 			map: this.map,
			// 	  		position: new google.maps.LatLng(this.currPosition.lat, this.currPosition.lng),
			// });
			// google.maps.event.addListener(marker, 'click', function() {
			// 	let infowindow = new google.maps.InfoWindow({
			// 	});
			// 	infowindow.setContent(`your position`);
			// 	infowindow.open(this.map, marker);
			// });
			// this.resetCenter(this.currPosition.lat, this.currPosition.lng);
			// let originPosition = new google.maps.LatLng(this.currPosition.lat, this.currPosition.lng);
			
			//query for all places
			await temp.forEach((elm, idx)=>{
				this.getInfoFromQuery(elm, idx);
			});
			await this.getDistance();
		},
		async defaultSetting() {
			//取得各地點資訊
			let temp = [];
			Object.values(this.osakaPass).forEach(elm=>{
				elm.forEach(el=>{
					temp = temp.concat(el);
				});
			});
			await temp.forEach((elm, idx)=>{
				this.getInfoFromQuery(elm, idx);
			});
			
		},
	},
};
</script>
<style>
#map{
	height:500px;
	width:100%;
}
</style>