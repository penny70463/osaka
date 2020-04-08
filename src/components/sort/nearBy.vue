<template>
<ValidationObserver v-slot="{handleSubmit,errors}">
	<div class="wrap">
		<h1 class="wrap__title">
			Osaka Amazing Pass Info
		</h1>
		
		<div class="wrap__buttons">
			<el-tooltip 
				v-for="(btn,idx) in buttons"
				:key="idx"
				:content="buttonContent[btn].tooltip"
			>
				<el-button
					@click="getAttractionList(btn)"
				>
					<img
						:src="buttonContent[btn].iconLink"
						class="wrap__buttons__icon"
					>
					<img
						:src="buttonContent[btn].iconLink2"
						class="wrap__buttons__icon2"
					>
				</el-button>
			</el-tooltip>
		</div>
		<div class="wrap__map">
			<div
				v-if="passCategory==4"
				class="wrap__map__query"
			>
				<!-- <el-select 
				v-model="filterTemp"
				multiple
				clearable>
					<el-option 
					v-for="(item,idx) in buttonContent"
					:key="idx"
					:value="idx"
					:label="item.tooltip">
						
					</el-option>
				</el-select> -->
				<ValidationProvider
					name="queryString"
					:rules="{required:true}"
					tag="div"
					class="validator"
					>
					
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
					:rules="{required:true}"
					tag="div"
					class="validator"
					>
				<el-input  
					v-model="queryDistance"
					class="distance"
				>
					<template slot="append">
						km
					</template>
				</el-input>
				<el-tooltip content="required">
					<i class="el-icon-warning" v-show="errors.distance && errors.distance.length"></i>
				</el-tooltip>
				</ValidationProvider>
				<el-button @click="handleSubmit(queryStringLocations)">
					Go!
				</el-button>
				<el-button @click="setQueryString('');initMap()">
					Reset
				</el-button>
			</div>
			
			<mapUnit  />
		</div>
	</div>
	</ValidationObserver>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import mapUnit from '../../views/map';
import { buttonContent, osakaPass } from '../../dummy_data/dataList';
import { ValidationProvider,ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
extend('required', required);

export default {
	name: 'NearBy',
	components: {
		mapUnit,
		ValidationProvider,
		ValidationObserver,
	},
	data() {
		return {
			buttons: [0, 1, 2, 3, 4],
			buttonContent,
			osakaPass,
		};
	},
	mounted() {
		
	},
	computed: {
		...mapState('Home', [
			'passCategory',
			
		]),
		...mapGetters('Home', [
			
		]),
		...mapFields('Home', [
			'tempQueryString',
			'queryDistance',
			'filterTemp',
		]),
	},
	methods: {
		...mapActions('Home', [
			'getAttractionList',
			'queryStringLocations',
			'initMap',
		]),
		...mapMutations('Home',[
			'setQueryString',
		]),
		//下拉提示選單
		fetchQuerySuggestion(string, cb) {
			let temp = [];
			Object.values(this.osakaPass).forEach(elm=>{
				elm.forEach(el=>{
					el = { value: el };
					temp = temp.concat(el);
				});
			});
			let result = string ? temp.filter(elm=>elm.value.includes(string)) : temp;
			 clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				cb([{ value: 'your location' }].concat(result));
			}, 3000 * Math.random());
		},
		
		
	},
};
</script>