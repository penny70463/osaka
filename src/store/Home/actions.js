import bus from '../../assets/scripts/eventBus'
import { MessageBox, Message } from 'element-ui'
import {auth, db } from '../../../firestore'
export default {
	
	async queryStringLocations({ commit, state}) {
		commit('setLoading',true, {root:true})
		let { tempQueryString } = state;
		let eventType = tempQueryString === 'my location' ? 0 : 1
		if(tempQueryString === 'my location') {
			if(navigator.geolocation) {
				  // 跟使用者拿所在位置的權限
				  navigator.geolocation.getCurrentPosition(
					   async function(position) {
							await commit('setCurrentPosition', { lat: position.coords.latitude, lng: position.coords.longitude }); 
							bus.$emit('queryString',{ eventType:eventType, });
						}, function() {
						MessageBox.alert('sorry, positioning failed','hint',{
							confirmButtonText: 'OK',
							callback:()=>{
								commit('setLoading',false, {root:true})
							}
						});
					  });
				
			} else {
				MessageBox.alert('sorry, your device doesn\'t support for positioning','hint',{
					confirmButtonText: 'OK',
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
		let {tempUserInfo:{ email, password, name }} = state
           auth.createUserWithEmailAndPassword(email, password)
            .then(
                async function(){
                    await auth.currentUser.updateProfile({
                    displayName: name,
                    })
            	.then(function() {
				// commit('setUserInfo',{ name })
				commit('setRegisterDialog',{visible:false})
				Message.success(`success! Please log in!`)
				})
            	.catch(function(error) {
					MessageBox.alert(`${error.errorMessage}`,'error',{
						confirmButtonText: 'OK',
						callback:()=>{
							
						}
					});
            })
            }
            )
            .catch(function(error) {
            // Handle Errors here.
			var errorMessage = error.message;
			MessageBox.alert(`${errorMessage}`,'error',{
				confirmButtonText: 'OK',
				callback:()=>{
					
				}
			});
            });

	},
	logIn({state,commit}) {
		let {tempUserInfo:{email,password}} = state
		auth.signInWithEmailAndPassword(email, password)
		.then(
			async function(){
				commit('setRegisterDialog',{visible:false});
				if(auth.currentUser) {
					commit('setUserInfo',{name:auth.currentUser.displayName})
				}
				commit('setLogInStatus',true)
				Message.success(`success!`)
			}
			
			)
		.catch(function(error) {
			console.log(error)
			MessageBox.alert('sorry, wrong user information ! Please try again!','error',{
				confirmButtonText: 'OK',
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
			   Message.success(`You have log out!`)
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
		let { tempUserInfo: { email, }} = state
		await auth.sendPasswordResetEmail(email,{
				url: window.location.href,
				handleCodeInApp: true,
			}).then(()=> Message.success(`Please Check your email：${email} to reset password!`))
			.catch((error)=>Message.error(error.message))

	},
	rateCheck({dispatch}) {
		MessageBox.confirm('Are you sure to submit?','hint',{
			confirmButtonText: 'submit',
			cancelButtonText: 'cancel',
		})
		.then(()=>{
			dispatch('rating')
		})
		.catch(()=>{
			return
		})
	},
	rating({state, commit}) {
		let { ratingComments,ratingCommentsRef, ratingCommentsRefId,userInfo: { name } } = state
		ratingCommentsRef.userName = name
		db.collection(`2020-4-6`).doc(ratingCommentsRefId).update({
			ratings: [ratingCommentsRef].concat(ratingComments)})
			commit('setInfoRatingVisible',false)
			Message.success(`success! Your rating will be updated in few minutes!`)
	}

};