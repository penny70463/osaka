<template>
<ValidationObserver v-slot="{handleSubmit,errors,reset}">
    <el-dialog 
        :visible.sync="visible"
        :close-on-click-modal="true"
        :show-close="true"
        class="dialog"
        @closed="reset();resetTempUserInfo()">
        <div 
            slot="title"
            class="dialog__header">{{registerDialog.type ? 'Register' : 'Log In'}}</div>
        <div class="dialog__body">
            <div v-if="registerDialog.type == 1" class="dialog__body--column">
                 name
            <ValidationProvider
                name="name"
                :rules="{required:true}"
                tag="div"
                class="validator dialog__body--column"
                >
                <el-input
                :class="{'err':errors.name && errors.name.length}"
                v-model="name"
                >
                </el-input>
            </ValidationProvider>
            </div>

           <div class="dialog__body--column">
                e-mail
            <ValidationProvider
                name="email"
                :rules="{required:true,email:true}"
                tag="div"
                class="validator dialog__body--column"
                >
                <el-input
                :class="{'err':errors.email && errors.email.length}"
                v-model="email"
                >
                </el-input>
            </ValidationProvider>
           </div>
           
           <div class="dialog__body--column">
               password
           </div>
           
            <ValidationProvider
            name="password"
            :rules="{required:true}"
            tag="div"
            class="validator dialog__body--column"
            >
            <el-input 
                v-model="password"
                :show-password="true"
                :class="{'err':errors.password && errors.password.length}"
                @keydown.13.native="handleSubmit(()=>registerDialog.type ? register() : logIn())">
                
            </el-input>
        </ValidationProvider>
           
        </div>
        <div class="dialog__footer">
            <div class="btn-wrap">
                <el-button 
                @click="handleSubmit(()=>registerDialog.type ? register() : logIn())"
                >
                Confirm
            </el-button>
            <el-button 
             @click="setRegisterDialog({visible:false});reset()">
                Cancel
            </el-button>
            </div>
            
            <span @click="resetPassword()" class="operate" v-if="!registerDialog.type">
                reset password
                </span>
        </div>
    </el-dialog>
    </ValidationObserver>
</template>
<script>
import {mapFields} from 'vuex-map-fields'
import { mapState,mapMutations, mapActions } from 'vuex'
import { ValidationProvider,ValidationObserver, extend } from 'vee-validate';
import { email,required } from 'vee-validate/dist/rules';
extend('email', email);
extend('required', required);

export default {
        components: {
		ValidationProvider,
		ValidationObserver,
	},
    computed: {
        ...mapFields('Home',[
            'registerDialog.visible',
            'tempUserInfo.email',
            'tempUserInfo.password',
            'tempUserInfo.name'
        ]),
        ...mapState('Home',[
            'registerDialog',
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations('Home',[
            'setRegisterDialog',
            'resetTempUserInfo'
        ]),
        ...mapActions('Home',[
            'register',
            'logIn',
            'resetPassword'
        ]),
        
    },
    mounted() {
        
    },
}
</script>