import Vue from 'vue';
import axios from 'axios';

/**
 * 處理登入狀態，回傳axios結果，處理錯誤機制
 * @param method crud方法
 * @param url route
 * @param extra permission
 * @param options params/data...
 */

export const axiosRestful = async (method, url, options = {})=>{
	// call api
	await axios({
		method,
		url,
		...options,
	})
		.then(({ data }) => {
			console.log(data);
		});
};

Vue.prototype.$axiosRestful = axiosRestful;
export default axiosRestful;