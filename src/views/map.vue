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
		requests() {
			this.initMap();
			this.passReq();
		},
		queryStringChange() {
			this.passReq();
		},
		currPosition() {
			this.initMap();
			this.currMarker();
		},
	},
	mounted() {
		this.initMap();
		this.passReq();
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
		test(elm, idx) {
			let service = new google.maps.places.PlacesService(this.map);
			service.findPlaceFromQuery({ query: elm,
				fields: ['name', 'geometry', 'formatted_address'] }, this.test2(idx));
		},
		test2(idx) {
			//destinations.push(results[0].geometry.location);
			return (results, status)=>{
				console.log(results[0].geometry.location, idx);
			};
		},
		//經緯度create Marker
		async currMarker() {
			let temp = [];
			Object.values(this.osakaPass).forEach(elm=>{
				elm.forEach(el=>{
					temp = temp.concat(el);
				});
			});

			let marker = new google.maps.Marker({
          				map: this.map,
				  		position: new google.maps.LatLng(this.currPosition.lat, this.currPosition.lng),
			});
			google.maps.event.addListener(marker, 'click', function() {
				let infowindow = new google.maps.InfoWindow({
				});
				infowindow.setContent(`your position`);
				infowindow.open(this.map, marker);
			});
			this.resetCenter(this.currPosition.lat, this.currPosition.lng);
			let originPosition = new google.maps.LatLng(this.currPosition.lat, this.currPosition.lng);
			
			
			temp.forEach((elm, idx)=>{
				this.test(elm, idx);
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