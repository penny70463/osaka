(function(t){function e(e){for(var r,o,s=e[0],c=e[1],u=e[2],p=0,f=[];p<s.length;p++)o=s[p],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={app:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/osaka/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"27dc":function(t,e,n){},"3fc4":function(t,e,n){"use strict";var r=n("bbe6"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("NearBy")],1)},i=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var r=e.handleSubmit,a=e.errors,i=e.reset;return[n("div",{staticClass:"wrap"},[n("h1",{staticClass:"wrap__title"},[t._v("\r\n\t\t\tOsaka Amazing Pass Free Facilites Information\r\n\t\t")]),n("div",{staticClass:"wrap__map"},[n("div",{staticClass:"wrap__map__query"},[n("ValidationProvider",{staticClass:"validator",attrs:{name:"queryString",rules:{required:!0},tag:"div"}},[n("div",{staticClass:"wrap__buttons"},[n("el-button",[n("img",{staticClass:"wrap__buttons__icon",attrs:{src:"https://i.ibb.co/vqKQX8W/5.png"}})])],1),n("el-input",{attrs:{placeholder:"search locations near by",clearable:!0},model:{value:t.tempQueryString,callback:function(e){t.tempQueryString=e},expression:"tempQueryString"}}),n("el-tooltip",{attrs:{content:"required"}},[n("i",{directives:[{name:"show",rawName:"v-show",value:a.queryString&&a.queryString.length,expression:"errors.queryString && errors.queryString.length"}],staticClass:"el-icon-warning"})])],1),n("ValidationProvider",{staticClass:"validator",attrs:{name:"distance",rules:{required:!0,numeric:!0},tag:"div"}},[n("div",{staticClass:"wrap__buttons"},[n("el-button",[n("img",{staticClass:"wrap__buttons__icon",attrs:{src:"https://i.ibb.co/FwgGpzq/image-1.png"}})])],1),n("el-input",{staticClass:"distance",attrs:{placeholder:"distance"},model:{value:t.queryDistance,callback:function(e){t.queryDistance=t._n(e)},expression:"queryDistance"}},[n("template",{slot:"append"},[t._v("\r\n\t\t\t\t\t\tkm\r\n\t\t\t\t\t")])],2),n("el-tooltip",{attrs:{content:"required and must be a number"}},[n("i",{directives:[{name:"show",rawName:"v-show",value:a.distance&&a.distance.length,expression:"errors.distance && errors.distance.length"}],staticClass:"el-icon-warning"})])],1),n("div",{staticClass:"button-wrap"},[n("el-button",{staticClass:"box-shadow--blue",on:{click:function(e){return r(t.queryStringLocations)}}},[t._v("\r\n\t\t\t\t\tGo!\r\n\t\t\t\t")]),n("el-button",{staticClass:"box-shadow--red",on:{click:function(e){t.setQueryString({type:0}),i(),t.initMap(12)}}},[t._v("\r\n\t\t\t\t\tReset\r\n\t\t\t\t")])],1)],1),n("div",{staticClass:"info-area"},[n("div",{staticClass:"info-area__tip"},[n("img",{attrs:{src:"https://image.flaticon.com/icons/svg/1329/1329665.svg"}}),n("p",[t._v("The location you've searched")])]),n("div",{staticClass:"info-area__tip"},[n("img",{attrs:{src:"https://image.flaticon.com/icons/svg/684/684908.svg"}}),n("p",[t._v("The free facilites around your target")])])]),n("mapUnit")],1)])]}}])})},s=[],c=(n("8e6e"),n("456d"),n("6762"),n("2fdb"),n("8615"),n("ac6a"),n("bd86")),u=n("2f62"),l=n("5935"),p=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"google-map",attrs:{id:"map"}})])}],d=(n("96cf"),n("3b8d")),m=(n("7f7f"),{1:["道頓堀ZAZA POCKET'S ZAZA現場搞笑表演"],2:["國立國際美術館 "],3:["Hard Rock Cafe 大阪 "],4:["KIMONO TEA CEREMONY MAIKOYA "]}),g={0:{tooltip:"all attactions in Osaka",iconLink:"https://i.ibb.co/GWc3mpV/1.png",iconLink2:"https://i.ibb.co/vLycdK9/1.png"},1:{tooltip:"Facilities available for free",iconLink:"https://i.ibb.co/ysWXsbB/2.png",iconLink2:"https://i.ibb.co/9yTgNRz/2.png"},2:{tooltip:"Facilities offering benefits",iconLink:"https://i.ibb.co/HpvdyQh/3.png",iconLink2:"https://i.ibb.co/V2PH8Jv/3.png"},3:{tooltip:"Great deals offered at stores",iconLink:"https://i.ibb.co/Lv0jMfm/4.png",iconLink2:"https://i.ibb.co/nLtnjt3/4.png"},4:{tooltip:"search for near by attractions",iconLink:"https://i.ibb.co/vqKQX8W/5.png",iconLink2:"https://i.ibb.co/c1tsBz9/5.png"},5:{iconLink:"https://i.ibb.co/FwgGpzq/image-1.png"}},y=new r["default"],b=y,h=n("5c96"),v=n.n(h),O=n("59ca");n("e71f");var w={apiKey:"AIzaSyCQnB2rjdsIw-sEfWG71c37sy-qoJeLjwc",authDomain:"osaka-map-1573973124960.firebaseapp.com",databaseURL:"https://osaka-map-1573973124960.firebaseio.com",projectId:"osaka-map-1573973124960",storageBucket:"osaka-map-1573973124960.appspot.com",messagingSenderId:"547081207024",appId:"1:547081207024:web:087eaeb54ebeaf3e53d635",measurementId:"G-T1RWX0JBXD"},k=(O.initializeApp(w),O.firestore());function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function S(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(n,!0).forEach((function(e){Object(c["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var j={props:{},computed:S({},Object(u["e"])("Home",["markUrl","passCategory","queryString","currentPosition","queryDistance","destinations","initialMapSetting","map"]),{},Object(u["d"])("Home",["setDestinations"]),{},Object(u["c"])("Home",[]),{currPosition:function(){return this.currentPosition}}),data:function(){return{infowindow:null,markers:[],locations:[],osakaPass:m}},watch:{},mounted:function(){var t=this;this.initMap(12),b.$on("queryString",(function(e){t.initMap(14),t.getInfoFromQuery(t.queryString,void 0)}))},methods:S({},Object(u["b"])("Home",["initMap"]),{resetCenter:function(t,e){this.map.panTo({lat:t||this.center.lat,lng:e||this.center.lng})},clearMarkers:function(){this.markers.forEach((function(t){return t.setMap(null)})),this.markers=[]},getInfoFromQuery:function(t,e){var n=new google.maps.places.PlacesService(this.map);n.findPlaceFromQuery({query:e?t.dm.proto.fields.name.stringValue:t,fields:["name","geometry","formatted_address"]},this.fieldResult(t,e))},fieldResult:function(t,e){var n=this,r=["osaka","大阪","Osaka"];function a(t,e){return!e||!e.includes(t)}return function(){var i=Object(d["a"])(regeneratorRuntime.mark((function i(o,s){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:"OVER_QUERY_LIMIT"==s&&h["MessageBox"].alert("System is busy ! Please try again!","hint",{callback:function(){}}),void 0===e?("OK"===s&&n.$store.commit("Home/setCurrentPosition",{lat:o[0].geometry.location.lat(),lng:o[0].geometry.location.lng(),name:o[0].name,address:o[0].formatted_address}),"ZERO_RESULTS"===s&&h["MessageBox"].alert("Can't find this place, please try again!","hint",{callback:function(){n.initMap(12)}}),r.every((function(t){return a(t,n.currPosition.address)}))&&h["MessageBox"].alert("This location is not in osaka ! Please search again!","hint",{callback:function(){n.initMap(12)}}),n.currPosition.lat&&n.currPosition.lng&&n.getDistance()):"OK"===s&&k.collection("2020-4-6").doc(t.id).update({info:{idx:e,location:{lat:o[0].geometry.location.lat(),lng:o[0].geometry.location.lng()},name:o[0].name,address:o[0].formatted_address}});case 2:case"end":return i.stop()}}),i)})));return function(t,e){return i.apply(this,arguments)}}()},getDistance:function(){var t=this;function e(t,e,r,a){var i=6371,o=n(r-t),s=n(a-e),c=Math.sin(o/2)*Math.sin(o/2)+Math.cos(n(t))*Math.cos(n(r))*Math.sin(s/2)*Math.sin(s/2),u=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c)),l=i*u;return l}function n(t){return t*(Math.PI/180)}k.collection("2020-4-6").get().then((function(n){n.docs.forEach((function(n){var r=n.dm.proto.fields;if(r.info){var a=e(r.info.mapValue.fields.location.mapValue.fields.lat.doubleValue,r.info.mapValue.fields.location.mapValue.fields.lng.doubleValue,t.currentPosition.lat,t.currentPosition.lng);a<=t.queryDistance&&t.marker(n)}}))})),this.marker(this.currPosition)},marker:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(e){var n,r,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.type?(n=e.lat,r=e.lng,a="https://image.flaticon.com/icons/svg/1329/1329665.svg"):(n=e.dm.proto.fields.info.mapValue.fields.location.mapValue.fields.lat.doubleValue,r=e.dm.proto.fields.info.mapValue.fields.location.mapValue.fields.lng.doubleValue,a="https://image.flaticon.com/icons/svg/684/684908.svg"),i=new google.maps.Marker({map:this.map,position:new google.maps.LatLng(n,r),icon:{url:a,size:new google.maps.Size(35,35),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(35,35)}}),this.markerInfo(i,e);case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),markerInfo:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:google.maps.event.addListener(e,"click",(function(){var t=new google.maps.InfoWindow({});t.setContent(n.name?'<div class="location-name">'.concat(n.name,"</div>"):'<div class="location-name">'.concat(n.dm.proto.fields.name.stringValue,'</div>\n\t\t\t\t\t<hr>\n\t\t\t\t\t<span class="location-address">').concat(n.dm.proto.fields.info.mapValue.fields.address.stringValue,"</span>\n\t\t\t\t\t<br>\n\t\t\t\t\t<span>").concat(JSON.parse(JSON.stringify(n.dm.proto.fields.content)).stringValue,"</span>")),t.open(this.map,e)})),this.resetCenter(this.currPosition.lat,this.currPosition.lng);case 2:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}(),dbImport:function(){}}),beforeDestroy:function(){b.$off("queryString")}},_=j,C=(n("3fc4"),n("2877")),q=Object(C["a"])(_,p,f,!1,null,null,null),M=q.exports,x=n("7bb1"),V=n("4c93");function L(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function D(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?L(n,!0).forEach((function(e){Object(c["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):L(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}Object(x["c"])("required",V["b"]),Object(x["c"])("numeric",V["a"]);var E={name:"NearBy",components:{mapUnit:M,ValidationProvider:x["b"],ValidationObserver:x["a"]},data:function(){return{buttons:[0,1,2,3,4],buttonContent:g,osakaPass:m}},mounted:function(){},computed:D({},Object(u["e"])("Home",["passCategory"]),{},Object(u["c"])("Home",[]),{},Object(l["b"])("Home",["tempQueryString","queryDistance","filterTemp"])),methods:D({},Object(u["b"])("Home",["getAttractionList","queryStringLocations","initMap"]),{},Object(u["d"])("Home",["setQueryString"]),{fetchQuerySuggestion:function(t,e){var n=[];Object.values(this.osakaPass).forEach((function(t){t.forEach((function(t){t={value:t},n=n.concat(t)}))}));var r=t?n.filter((function(e){return e.value.includes(t)})):n;clearTimeout(this.timeout),this.timeout=setTimeout((function(){e([{value:"your location"}].concat(r))}),3e3*Math.random())}})},Q=E,I=Object(C["a"])(Q,o,s,!1,null,null,null),R=I.exports,T=n("8c4f");r["default"].use(T["a"]);new T["a"]({mode:"history",routes:[{path:"",name:"",component:R}]});var z={name:"App",components:{NearBy:R},data:function(){return{routes:void 0}}},B=z,H=(n("034f"),Object(C["a"])(B,a,i,!1,null,null,null)),A=H.exports,F=(n("c5f6"),{passCategory:"4",queryString:"",tempQueryString:"",markUrl:"",currentPosition:{lat:"",lng:"",type:1,name:"your position",address:""},queryDistance:2,destinations:[],placesQty:0,filterTemp:[],map:null,initialMapSetting:{center:{type:Object,default:{lat:34.669203,lng:135.50357}},zoom:{type:Number,default:12},streetViewControl:{type:Boolean,default:!0},mapTypeControl:{type:Boolean,default:!0},fullscreenControl:{type:Boolean,default:!0},zoomControl:{type:Boolean,default:!0}}}),N={updateField:l["c"],setPassCategory:function(t,e){t.passCategory=e},setQueryString:function(t,e){var n=e.type,r=e.string;n?t.queryString=r:(t.tempQueryString="",t.queryString="",t.queryDistance="")},setMarkUrl:function(t,e){t.markUrl=e},setCurrentPosition:function(t,e){t.currentPosition.lat=e.lat,t.currentPosition.lng=e.lng,t.currentPosition.address=e.address},setQueryDistance:function(t,e){t.queryDistance=e},setDestinations:function(t,e){var n=e.info,r=e.idx;t.destinations[r]=n},setPlacesQty:function(t,e){t.placesQty=e},setInitialMapSetting:function(t,e){var n=e.name,r=e.data;t.initialMapSetting[n].default=r}},K={getField:l["a"],convertOsakaPass:function(t){var e=[],n=t.passCategory,r=t.queryString;return 4!=n?(m[n].forEach((function(t){e.push({queryObj:{query:t,fields:["name","geometry","formatted_address"]},type:0})})),e):""!=r&&4==n?(e.push({queryObj:{query:r,fields:["name","geometry","formatted_address"]},type:1}),m["1"].forEach((function(t){e.push({queryObj:{query:t,fields:["name","geometry","formatted_address"]},type:0})})),e):e}},U={getAttractionList:function(t,e){var n=t.commit;n("setPassCategory",e)},queryStringLocations:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(e){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.commit,r=e.state,a=r.tempQueryString,"your location"!==a){t.next=6;break}navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){n("setCurrentPosition",{lat:t.coords.latitude,lng:t.coords.longitude})})):alert("sorry, your device doesn't support for positioning"),t.next=10;break;case 6:return t.next=8,n("setQueryString",{type:1,string:a});case 8:return t.next=10,b.$emit("queryString");case 10:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),initMap:function(t,e){var n=t.state;n.map=new google.maps.Map(document.getElementById("map"),{center:n.initialMapSetting.center.default,zoom:e,maxZoom:20,minZoom:3,streetViewControl:n.initialMapSetting.streetViewControl.default,mapTypeControl:n.initialMapSetting.mapTypeControl.default,fullscreenControl:n.initialMapSetting.fullscreenControl.default,zoomControl:n.initialMapSetting.zoomControl.default})}},$={namespaced:!0,state:F,mutations:N,getters:K,actions:U,mudules:{}};r["default"].use(u["a"]);var G=new u["a"].Store({state:{},mutations:{},actions:{},getters:{},modules:{Home:$}}),J=n("bc3a"),W=n.n(J),Z=n("a7fe"),X=n.n(Z);n("27dc"),n("0fae");r["default"].use(T["a"]),r["default"].use(v.a),r["default"].use(X.a,W.a),r["default"].config.productionTip=!1;e["default"]=new r["default"]({store:G,render:function(t){return t(A)}}).$mount("#app")},"64a9":function(t,e,n){},bbe6:function(t,e,n){}});
//# sourceMappingURL=app.e620225d.js.map