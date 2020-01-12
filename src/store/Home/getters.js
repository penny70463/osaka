import { getField } from 'vuex-map-fields';
import  { osakaPass }  from '../../dummy_data/dataList';
export default {
	getField,
	convertOsakaPass(state) {
		let tempList = [];
		let { passCategory, queryString } = state;
		
		if(passCategory != 4 ) {
			osakaPass[passCategory].forEach(elm=>{
				tempList.push( 
					{ queryObj: {
						query: elm,
						fields: ['name', 'geometry', 'formatted_address'],
					},
					//0為一般type
					type: 0 });
			});
			return tempList;
		} else if(queryString != '' && passCategory == 4){
			tempList.push( 
				{ queryObj: {
					query: queryString,
					fields: ['name', 'geometry', 'formatted_address'],
				},
				//1為query type
				type: 1  });
			osakaPass['1'].forEach(elm=>{
				tempList.push( 
					{ queryObj: {
						query: elm,
						fields: ['name', 'geometry', 'formatted_address'],
					},
					//0為一般type
					type: 0 });
			});
			
			return tempList;
		} else {
			return tempList;
		}
	},
};