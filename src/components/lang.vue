<template>
    <el-dropdown
        class="lang"
        split-button
        @command="setLang"
        size="small"
      >
        <!-- <img :src="imgUrl(lang)"> -->
        <span class="nation">{{langLabel(lang)}}</span>
     <el-dropdown-menu>
         <el-dropdown-item
            v-for="(item,i) in langList"
            :key="i"
            :label="item.label"
            :value="item.name"
            :command="item.name"
            >
            <div 
                class="flag"
                v-if="lang!==item.name">
                <!-- <img :src="imgUrl(item.name)"> -->
                <span class="nation">{{item.label}}</span>
            </div>
         </el-dropdown-item>
     </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import { mapFields } from 'vuex-map-fields';
export default {
     data() {
         return {
            langList:[
                { name:'tc',label:'繁體中文' },
                { name:'jp',label:'日本語' },
                { name:'en',label:'English' },
            ],
         };
     },

    computed: {
        ...mapFields('Home', [
			'lang',
		]),
    },
    methods: {
        imgUrl(name) {
            return require(`../assets/images/${name}.png`)
        },
        langLabel(lang) {
            return this.langList.find(elm=>
                elm.name==lang
                ).label
        },
        ...mapActions('Home',[
            'initMap',
        ]),
        ...mapMutations('Home',[
             'setLang',
        ]),
    },
};
</script>