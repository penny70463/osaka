<template>
	<div class="wrap">
		<lang />
		<h1 class="wrap__title">
			Osaka Amazing Pass Free Facilites Information
		</h1>
		<div class="wrap__map">
			<query />
			<div class="info-area">
				<div class="info-area__tip"><img src="https://image.flaticon.com/icons/svg/1329/1329665.svg"/><p>The location you've searched</p></div>
				<div class="info-area__tip"><img src="https://image.flaticon.com/icons/svg/684/684908.svg"/><p>The free facilites around your target</p></div>
			</div>
			<mapUnit  />
		</div>
	</div>
</template>
<script>

import mapUnit from './map';
import query from'./query';
import lang from './lang';
export default {
	name: 'NearBy',
	components: {
		mapUnit,
		query,
		lang,
	},
	data() {
		return {
			
		};
	},
	mounted() {
		
	},
	computed: {
		
	},
	methods: {
	
		
	},
};
</script>