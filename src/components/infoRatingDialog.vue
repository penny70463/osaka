<template>
    <el-dialog 
    :visible.sync="infoRatingVisible"
    :close-on-click-modal="true"
    class="dialog"
    @closed="setInfoRatingType(0);resetRatingCommentsRef()"
    >
  <div 
    slot="title"
    class="dialog__header">{{locationInfo.name}}</div>

<div class="dialog__body">
    <el-rate
            v-model="rateSum.ave"
            disabled
            show-score
            :colors="colors"
            text-color="#ff9900"
            :score-template="`${rateSum.ave} points ( ${rateSum.count} Reviews )`">
    </el-rate>
    <hr>
    <div>{{`Address: ${locationInfo.address}`}}</div>
    <hr>
    <div>{{`Information: ${locationInfo.content}`}}</div>
    <div v-if="!infoRatingType">
            <div v-for="({userName, comment, rate},i) in ratingComments"
            :key="i"
            class="comments"
            >
            
            <span class="dialog__body--column">{{`${userName} : ${comment} `}}</span>
            <el-rate
                :value="ratingComments[i].rate"
                :colors="colors"
                disabled
                >
            </el-rate>
            <!-- <div class="dialog__body--column">
                <span>Comment:</span>
                <span>{{comment}}</span>
            </div> -->
        </div>
         <div class="dialog__body--column" v-if="!ratingComments.length">
        No comments yet!
        </div>
        <span class="operate" @click="setInfoRatingType(1)">{{'Go Rating >>'}}</span>
    </div>
    <div v-else class="flex-column">
         <span class="dialog__body--column">{{userInfo.name}}</span>
            <el-rate
                class="dialog__body--column"
                v-model="ratingCommentsRef.rate"
                :colors="colors"
                >
            </el-rate>
            <div class="dialog__body--column">
                <span>Comment:</span>
            </div>
            <div class="dialog__body--column">
                <el-input 
                    v-model="ratingCommentsRef.comment">
                    <el-button slot="append" @click="rateCheck()">{{ 'Rate'}}</el-button>
                </el-input>
            </div>
            <div class="dialog__body--column">
                <span class="operate" @click="setInfoRatingType(0)">{{' << Back to Comments'}}</span>
                
            </div>
            
            
    </div>
</div>
    
    <!-- <div class="dialog__footer">
        <el-button @click="infoRatingType ? Rating(): setInfoRatingVisible(false)">{{ infoRatingType ? 'Submit':'Ok'}}</el-button>
    </div> -->
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
            'infoRatingVisible',
            'ratingCommentsRef',

        ]),
        
        ...mapState('Home',[
            'ratingComments',
            'infoRatingType',
            'locationInfo',
            'rateSum',
            'userInfo'
        ])
    },

    methods: {
        ...mapMutations('Home',[
            'setInfoRatingVisible',
            'setInfoRatingType',
            'resetRatingCommentsRef'
        ]),
        ...mapActions('Home',[
            'rateCheck'
        ])
    },
}
</script>