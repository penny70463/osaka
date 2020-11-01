import bus from '../../assets/scripts/eventBus'
import { MessageBox, Message } from 'element-ui'
import {auth } from '../../../firestore'
export default {
	
	async queryStringLocations({ commit, state}) {
		commit('setLoading',true, {root:true})
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
						MessageBox.alert('sorry, positioning failed','hint',{
							callback:()=>{
								commit('setLoading',false, {root:true})
							}
						});
					  });
				
			} else {
				MessageBox.alert('sorry, your device doesn\'t support for positioning','hint',{
					callback:()=>{
						commit('setLoading',false, {root:true})
					}
				});
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
	async register({state,commit}) {
		let {userInfo} = state
           auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(
                async function(){
                    await auth.currentUser.updateProfile({
                    displayName: userInfo.name,
                    })
            .then(function() {
				commit('setUserInfo',{name:auth.currentUser.displayName})
				commit('setRegisterDialog',{visible:false})
				})
            .catch(function(error) {
                console.log(error)
            // An error happened.
            })
            }
            )
            .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
            });

	},
	logIn({state,commit}) {
		let {userInfo} = state
		auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
		.then(
			
			async function(){
				commit('setRegisterDialog',{visible:false});
				if(auth.currentUser) {
					commit('setUserInfo',{name:auth.currentUser.displayName})
				}
				commit('setLogInStatus',true)
				
			
			}
			
			)
		.catch(function(error) {
			console.log(error)
			MessageBox.alert('sorry, wrong user information ! Please try again!','error',{
				callback:()=>{
					
				}
			});
			// ...
});
	},
	logOut({commit}){
		auth.signOut()
		  .then(function(){
			commit('setLogInStatus',false)
			commit('setUserInfo',{
				name:'',
				email:'',
			   password:''})
		  }
			
		  )
		  .catch(function(error) {
			  console.log(error)
			// An error happened.
		  });

	},
	checkUserStatus({commit}) {
		auth.onAuthStateChanged(function(user) {
			if (user) {
				commit('setUserInfo',{name:user.displayName})
				commit('setLogInStatus',true)
			} else {
			  commit('setLogInStatus',false)
			}
		  });
		
		
		
	},
	async resetPassword({state}) {
		let {userInfo} = state
		await auth.sendPasswordResetEmail(userInfo.email,{
				url: window.location.href,
				handleCodeInApp: true,
			}).then(()=> Message.success(`Please Check your email：${userInfo.email} to reset password!`))
			.catch((error)=>Message.error(error.message))

	}

};