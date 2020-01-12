export default {
	getAttractionList({ commit }, val) {
		commit('setPassCategory', val);
	},
	queryStringLocations({ commit, state }) {
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
			commit('setCurrentPosition', { });
			commit('setQueryString', tempQueryString);
		}
	},
	
};