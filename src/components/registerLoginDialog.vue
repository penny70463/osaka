<template>
<ValidationObserver v-slot="{handleSubmit,errors,reset}">
    <el-dialog :visible="visible">
        <div>
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
            <el-button>
                confirm
            </el-button>
            <el-button 
             @click="setRegisterDialog({visible:false});reset()">
                cancel
            </el-button>
        </div>
    </el-dialog>
    </ValidationObserver>
</template>
<script>
import {mapFields} from 'vuex-map-fields'
import { mapState,mapMutations } from 'vuex'
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
            'userInfo.password'
        ]),
        ...mapState('Home',[
            'registerDialog'
        ])
    },
    methods: {
        ...mapMutations('Home',[
            'setRegisterDialog'
        ])
    },
}
</script>