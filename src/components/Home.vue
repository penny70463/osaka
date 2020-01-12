<template>
	<div>
		<div id="map" />
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
	components: {
		
	},
	computed: {
		...mapState('Chess', [
			'randomArray',
		]),
		...mapState([
			'defaultTeams',
		]),
	},
	async mounted() {
		await this.getTeams();
	},
	methods: {
		async click() {
			await this.axios.post(
				'https://meetupdimashirokovv1.p.rapidapi.com/getCities',
				{ headers: {
					'x-rapidapi-host': 'MeetupdimashirokovV1.p.rapidapi.com',
					'x-rapidapi-key': 'c49dfc3f3cmshc1c1efbdc793d17p17b4c0jsnb30d722e5885',
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: {
					accessToken: {},
				} },
			).then(responese=>{
				console.log(responese.data);
			});
		},
		...mapActions('Chess', [
			'getTeams',
		]),
		
	},
	
};
</script>
