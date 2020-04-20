<template>
	<div id="app">
		<Wrap />
	</div>
</template>

<script>
import Wrap from './views/wrap';
import { routes } from './router';


export default {
	name: 'App',
	components: {
		Wrap,
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
