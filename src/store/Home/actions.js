import bus from '../../assets/scripts/eventBus'

export default {
	
	async queryStringLocations({ commit, state}) {
		let { tempQueryString } = state;
		let eventType = tempQueryString === 'your location' ? 0 : 1
		if(tempQueryString === 'your location') {
			if(navigator.geolocation) {
				  // 跟使用者拿所在位置的權限
				  navigator.geolocation.getCurrentPosition(
					   async function(position) {
							await commit('setCurrentPosition', { lat: position.coords.latitude, lng: position.coords.longitude }); 
							bus.$emit('queryString',{ eventType:eventType, });
						}, function() {
						alert('sorry, positioning failed');
					  });
				
			} else {
				alert('sorry, your device doesn\'t support for positioning');
			}
		} else {
			await commit('setQueryString', {type:1,string:tempQueryString});
			bus.$emit('queryString',{ eventType:eventType, });
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