import bus from '../../assets/scripts/eventBus'

export default {
	getAttractionList({ commit }, val) {
		commit('setPassCategory', val);
	},
	async queryStringLocations({ commit, state }) {
		let { tempQueryString } = state;
		commit('setCurrentPosition', { lat:'', lng:''});
		commit('setQueryString', '');
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
			await commit('setQueryString', tempQueryString);
			await bus.$emit('queryString')
			
		}
	},
	
};