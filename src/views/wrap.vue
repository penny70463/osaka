<template>
	<div class="wrap">
		<div class="wrap__title">
			<div class="wrap__title--btns" :key="userInfo.name">
				<i 
				class="el-icon-user-solid"
				v-if="userInfo.name"
				></i>
				{{userInfo.name}}
			<el-button 
			@click="logInStatus ? logOut() :setRegisterDialog({visible:true,type:0})"
			class="bg-transparent">
				{{logInStatus ? 'Log Out': 'Log In'}}
			</el-button>
			<el-button
			v-if="!logInStatus"
			class="bg-transparent"
			@click="setRegisterDialog({visible:true,type:1})"
			>
				Register
			</el-button>
			
			</div>
		<h1>
			Osaka Amazing Pass Free Facilites Information Map
		</h1>
		</div>
		<div class="wrap__map">
			<query />
			<div class="info-area">
				<div class="info-area__tip"><img src="https://image.flaticon.com/icons/svg/1329/1329665.svg"/><p>The location you've searched</p></div>
				<div class="info-area__tip"><img src="https://image.flaticon.com/icons/svg/684/684908.svg"/><p>The free facilites around your target</p></div>
				<div class="info-area__tip"><lang /></div>
			</div>
			<mapUnit  />
		</div>
		<registerDialog />
		<infoRatingDialog />
	</div>
</template>
<script>
import { mapMutations, mapState, mapActions} from 'vuex'
export default {
	name: 'NearBy',
	components: {
		mapUnit:()=>import('../components/map'),
		query:()=>import('../components/query'),
		lang:()=>import('../components/lang'),
		registerDialog:()=>import('../components/registerLoginDialog'),
		infoRatingDialog:()=>import('../components/infoRatingDialog')
	},
	data() {
		return {
			
		};
	},
	mounted() {
		// this.checkUserStatus()
	},
	computed: {
		...mapState('Home',[
			'userInfo',
			'logInStatus'
		])
	},
	methods: {
	...mapMutations('Home',[
		'setRegisterDialog'
	]),
	...mapActions('Home',[
		'checkUserStatus',
		'logOut',
		
	])
		
	},
};
</script>