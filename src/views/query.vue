<template>
<ValidationObserver v-slot="{handleSubmit,errors,reset}">
    <div
				class="wrap__map__query"
			>
				<ValidationProvider
					name="queryString"
					:rules="{required:true}"
					tag="div"
					class="validator"
					>
					<div class="wrap__buttons">
						<el-button>
					<img
						src="https://i.ibb.co/vqKQX8W/5.png"
						class="wrap__buttons__icon"
					>
					</el-button>
					</div>
				<el-input
					v-model="tempQueryString"
					placeholder="search locations near by"
					:clearable="true"
				/>
				<el-tooltip content="required">
					<i class="el-icon-warning" v-show="errors.queryString && errors.queryString.length"></i>
				</el-tooltip>
				</ValidationProvider>
				<ValidationProvider
					name="distance"
					:rules="{required:true,numeric:true}"
					tag="div"
					class="validator"
					>
					<div class="wrap__buttons">
						<el-button
					
				>
					<img
						src="https://i.ibb.co/FwgGpzq/image-1.png"
						class="wrap__buttons__icon"
					>
					</el-button>
					</div>
				<el-input  
					v-model.number="queryDistance"
					class="distance"
					placeholder="distance"
				>
					<template slot="append">
						km
					</template>
				</el-input>
				<el-tooltip content="required and must be a number">
					<i class="el-icon-warning" v-show="errors.distance && errors.distance.length"></i>
				</el-tooltip>
				</ValidationProvider>
				<div class="button-wrap">
				<el-button 
					@click="handleSubmit(queryStringLocations)"
					class="box-shadow--blue">
					Go!
				</el-button>
				<el-button 
					@click="setQueryString({type:0});reset();initMap(12)"
					class="box-shadow--red">
					Reset
				</el-button>
				</div>
			</div>
            </ValidationObserver>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { ValidationProvider,ValidationObserver, extend } from 'vee-validate';
import { required,numeric } from 'vee-validate/dist/rules';
extend('required', required);
extend('numeric', numeric);

export default {
    components: {
		ValidationProvider,
		ValidationObserver,
	},
    computed: {
		...mapFields('Home', [
			'tempQueryString',
			'queryDistance',
		]),
    },
    methods: {
    ...mapActions('Home', [
        'queryStringLocations',
        'initMap',
    ]),
    ...mapMutations('Home',[
        'setQueryString',
    ]),
    
},
}
</script>