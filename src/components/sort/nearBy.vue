<template>
<ValidationObserver v-slot="{handleSubmit,errors,reset}">
	<div class="wrap">
		<h1 class="wrap__title">
			Osaka Amazing Pass Free Facilites Information
		</h1>
		
		<!-- <div class="wrap__buttons">
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
		</div> -->
		<div class="wrap__map">
			<div
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
			<div class="info-area">
				<div class="info-area__tip"><img src="https://image.flaticon.com/icons/svg/1329/1329665.svg"/><p>The location you've searched</p></div>
				<div class="info-area__tip"><img src="https://image.flaticon.com/icons/svg/684/684908.svg"/><p>The free facilites around your target</p></div>
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
import { required,numeric } from 'vee-validate/dist/rules';
extend('required', required);
extend('numeric', numeric);
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