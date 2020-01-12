<template>
	<div id="app">
		<NearBy />
	</div>
</template>

<script>
import NearBy from './components/sort/nearBy';
import { routes } from './router';


export default {
	name: 'App',
	components: {
		NearBy,
	},
	data() {
		return {
			routes,
		};
	},
};

</script>

<style>
@import './style/main.scss';
 
</style>
