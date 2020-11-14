<template>
    <el-dialog 
    :visible.sync="infoRatingVisible"
    :close-on-click-modal="true"
    class="dialog">
    <div v-for="({userName, comment, rate},i) in ratingComments"
        :key="i"
        class="dialog__body">
        <span class="dialog__body--column">{{userName}}</span>
          <el-rate
          class="dialog__body--column"
            v-model="ratingComments[i].rate"
            :colors="colors"
            :disabled="!infoRatingType">
        </el-rate>
        <div class="dialog__body--column">
            <span>Comment:</span>
            <el-input 
                v-if="infoRatingType"
                v-model="ratingComments[i].comment"/>
            <span v-else>{{comment}}</span>
        </div>
    </div>
    <div class="dialog__footer">
        <el-button @click="infoRatingType ? Rating(): setInfoRatingVisible(false)">{{ infoRatingType ? 'Submit':'Ok'}}</el-button>
    </div>
    </el-dialog>
</template>
<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']
        }
    },
    computed: {
        ...mapFields('Home',[
            'infoRatingVisible'
        ]),
        ...mapMultiRowFields('Home',[
            'ratingComments.rate',
            'ratingComments.comment'
        ]),
        ...mapState('Home',[
            'ratingComments',
            'infoRatingType'
        ])
    },

    methods: {
        ...mapMutations('Home',[
            'setInfoRatingVisible'
        ]),
        ...mapActions('Home',[
            'Rating'
        ])
    },
}
</script>