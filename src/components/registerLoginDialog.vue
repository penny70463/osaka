<template>
<ValidationObserver v-slot="{handleSubmit,errors,reset}">
    <el-dialog 
        :visible="visible"
        :close-on-click-modal="true"
        :show-close="false">
        <div>
            <div v-if="registerDialog.type == 1">
                 name
            <ValidationProvider
                name="name"
                :rules="{required:true}"
                tag="div"
                class="validator"
                >
                <el-input
                :class="{'err':errors.name && errors.name}"
                v-model="name"
                >
                </el-input>
            </ValidationProvider>
            </div>
           
            e-mail
            <ValidationProvider
                name="email"
                :rules="{required:true,email:true}"
                tag="div"
                class="validator"
                >
                <el-input
                :class="{'err':errors.email && errors.email.length}"
                v-model="email"
                >
                </el-input>
            </ValidationProvider>
            password
             <ValidationProvider
                name="password"
                :rules="{required:true}"
                tag="div"
                class="validator"
                >
            <el-input v-model="password">

            </el-input>
            </ValidationProvider>
        </div>
        <div>
            <el-button 
                @click="registerDialog.type ? register() : logIn()"
                >
                Confirm
            </el-button>
            <el-button 
             @click="setRegisterDialog({visible:false});reset()">
                Cancel
            </el-button>
            <div @click="forgetPassword()">Forget password</div>
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
            'userInfo.email',
            'userInfo.password',
            'userInfo.name'
        ]),
        ...mapState('Home',[
            'registerDialog',
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations('Home',[
            'setRegisterDialog'
        ]),
        ...mapActions('Home',[
            'register',
            'logIn',
            'forgetPassword'
        ]),
        
    },
    mounted() {
        
    },
}
</script>