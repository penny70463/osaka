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
			
		]),
		
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
		
	},
	mounted() {
		this.initMap();
		this.defaultSetting();
		bus.$on('queryString',event=>{
			this.initMap();
			this.getInfoFromQuery(this.queryString,undefined)
		})
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
		
		getInfoFromQuery(elm, idx) {
			let service = new google.maps.places.PlacesService(this.map);
			service.findPlaceFromQuery({ query: elm,
				fields: ['name', 'geometry', 'formatted_address'] }, this.fieldResult(idx));
		},
		fieldResult(idx) {
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
					if( status==='OK' ) {
						this.$store.commit('Home/setCurrentPosition', {lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng(), name: results[0].name, address:results[0].formatted_address})
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
					for(let i=0;i<this.$store.state.Home.placesQty; i++) {
					if( status==='OK' && i==idx ) {
						this.$store.commit('Home/setDestinations',{info: { idx, location:{lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()}, name: results[0].name, address:results[0].formatted_address},idx:idx})
					} else if (status!=='OK') {
						this.$store.commit('Home/setDestinations',{info:{ idx, location:null, name: null, address: null,},idx:idx})
					}
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
			
			this.destinations.forEach(elm=>{
				elm.distance=getDistanceFromLatLonInKm(elm.location.lat,elm.location.lng,this.currentPosition.lat,this.currentPosition.lng)
				if(elm.distance <= this.queryDistance) {
					this.marker(elm)
				}
			})
			this.marker(this.currPosition)
		},
		async marker(elm) {
			console.log(elm)
			let markerLat,markerLng,markerType
			if(elm.type) {
				markerLat=elm.lat;
				markerLng=elm.lng;
				markerType='https://image.flaticon.com/icons/svg/1329/1329665.svg'
			} else {
				markerLat=elm.location.lat;
				markerLng=elm.location.lng;
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
			
			google.maps.event.addListener(marker, 'click', function() {
				let infowindow = new google.maps.InfoWindow({
				});
				infowindow.setContent(`<span>${elm.name,elm.address}</span>`);
				infowindow.open(this.map, marker);
			});
			 this.resetCenter(this.currPosition.lat, this.currPosition.lng);	
		},
		async defaultSetting() {
			//取得各地點資訊
			let temp = [];
			Object.values(this.osakaPass).forEach(elm=>{
				elm.forEach(el=>{
					temp = temp.concat(el);
				});
			});
			await this.$store.commit('Home/setPlacesQty',temp.length)
			await temp.forEach((elm, idx)=>{
				this.getInfoFromQuery(elm, idx);
			});
			
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