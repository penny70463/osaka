import bus from '../../assets/scripts/eventBus'

export default {
	
	async queryStringLocations({ commit, state }) {
		let { tempQueryString } = state;
		
		if(tempQueryString === 'your location') {
			if(navigator.geolocation) {
				  // 跟使用者拿所在位置的權限
				  navigator.geolocation.getCurrentPosition(function(position) {
					commit('setCurrentPosition', { lat: position.coords.latitude, lng: position.coords.longitude }); 
				});
			} else {
				alert('sorry, your device doesn\'t support for positioning');
			}
		} else {
			await commit('setQueryString', {type:1,string:tempQueryString});
			await bus.$emit('queryString')
			
		}
	},
	initMap({state},zoom) {
		state.map = new google.maps.Map(document.getElementById('map'), {
			center: state.initialMapSetting.center.default,
			zoom: zoom,
			maxZoom: 20,
			minZoom: 3,
			streetViewControl: state.initialMapSetting.streetViewControl.default,
			mapTypeControl: state.initialMapSetting.mapTypeControl.default,
			fullscreenControl: state.initialMapSetting.fullscreenControl.default,
			zoomControl: state.initialMapSetting.zoomControl.default,
		});
	},
};