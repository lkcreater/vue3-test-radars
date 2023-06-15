<template>
    <a-card 
        class="sign-up-path"
        style="margin: 50px auto; width: 500px;"
        :bordered="false">

            <div class="box-icon">
                <comment-outlined />
            </div>

            <h1>Sign Up</h1>

            <div id="btn-open-signup" style="text-align: center;">
                <a-button type="primary" @click="openSignup">Click Sign Up</a-button>
            </div>
            
            <a-form
                ref="formModels"
                id="form-sigup"
                :model="formState"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 14 }"
                autocomplete="off">

                <a-form-item
                    id="io-firstname"
                    v-bind="validateInfos.firstname"
                    :label="Labels.Firstname" >
                    <a-input v-model:value="formState.firstname" />
                </a-form-item>

                <a-form-item
                    id="io-lastname"
                    v-bind="validateInfos.lastname"
                    :label="Labels.Lastname" >
                    <a-input v-model:value="formState.lastname" />
                </a-form-item>

                <a-form-item
                    id="io-tel"
                    v-bind="validateInfos.tel"
                    :label="Labels.Tel">
                    <a-input v-model:value="formState.tel" />
                </a-form-item>

                <a-form-item
                    id="io-email"
                    v-bind="validateInfos.email"
                    :label="Labels.Email" >
                    <a-input v-model:value="formState.email" />
                </a-form-item>

                <a-form-item
                    id="io-ref"
                    v-bind="validateInfos.ref"
                    :label="Labels.Ref">
                    <a-input v-model:value="formState.ref" />
                </a-form-item>

                <a-form-item
                    id="btn-submit"
                    :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" @click.prevent="onSubmit">Submit</a-button>
                    <a-button type="primary" danger @click.prevent="resetFields" style="margin-left: 20px;">Reset</a-button>
                </a-form-item>

            </a-form>
    </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, h } from 'vue';
import { useRoute } from 'vue-router';
import { Form, Modal } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { CommentOutlined } from '@ant-design/icons-vue';

import { gsap } from "gsap";
import { CSSPlugin } from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin);

const useForm = Form.useForm;
let validateTel = async (_rule: Rule, value: string) => {
    let regExp = /^0[0-9]{9}$/i;
    if (!regExp.test(value)) {
        return Promise.reject('phone number invalid');
    } else {
        return Promise.resolve();
    }
};

interface FormState {
  firstname: string;
  lastname: string;
  tel: string;
  email: string;
  ref: string;
}
const formModels = ref(); 
const formState = reactive<FormState>({
    firstname: '',
    lastname: '',
    tel: '',
    email: '',
    ref: '',
});

const rulesRef = reactive({
    firstname: [
        { required: true },
    ],
    lastname: [
        { required: true },
    ],
    tel: [
        { required: true }, { validator: validateTel, trigger: 'change' }
    ],
    email: [
        { required: true }, { type: 'email'}
    ],
    ref: [
        { required: true },
    ],
});
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);
const onSubmit = () => {
    validate()
        .then(() => {
            Modal.success({
                title: 'Sign Up Success',
                content: h('div', {}, [
                    h('p', 'Thanks for signing up'),
                ]),
            })
        })
        .catch(err => {
            console.log('error', err);
        });
};
const Labels = computed(() => {
    return {
        Firstname: 'Firstname',
        Lastname: 'Lastname',
        Tel: 'Tel',
        Email: 'Email',
        Ref: 'Ref',
    }
})

onMounted(() => {
    setQueryUrl();
    gsap.set('.sign-up-path', { height: 350 })
    gsap.set("#io-firstname, #io-lastname, #io-tel, #io-email, #io-ref, #btn-submit", { x: 80, opacity: 0 });
})

const setQueryUrl = async () => {
    const route = useRoute().query;
    let isOpen = false;
    if(route?.firstname){
        formState.firstname = route.firstname as string
        isOpen = true;
    }
    if(route?.lastname){
        formState.lastname = route.lastname as string
        isOpen = true;
    }
    if(route?.tel){
        formState.tel = route.tel as string
        isOpen = true;
    }
    if(route?.email){
        formState.email = route.email as string
        isOpen = true;
    }
    if(route?.ref){
        formState.ref = route.ref as string
        isOpen = true;
    }

    if(isOpen){
        openSignup();
    }
}

const openSignup = () => {
    gsap.to('#btn-open-signup', {
        opacity: 0,
        y: -50,
        duration: 1,
    });
    gsap.to('.sign-up-path', {        
        height: 700,
        duration: 1,
        delay: .7
    });
    gsap.to('#io-firstname', { opacity: 1, x: 0, duration: 1, delay: 1.5 });
    gsap.to('#io-lastname', { opacity: 1, x: 0, duration: 1, delay: 2 });
    gsap.to('#io-tel', { opacity: 1, x: 0, duration: 1, delay: 2.5 });
    gsap.to('#io-email', { opacity: 1, x: 0, duration: 1, delay: 3 });
    gsap.to('#io-ref', { opacity: 1, x: 0, duration: 1, delay: 3.5 });
    gsap.to('#btn-submit', { opacity: 1, x: 0, duration: 1, delay: 4 });
}
</script>

<style lang="scss" scoped>
.sign-up-path{

    h1{
        color: aliceblue;
        font-size: 36px;
        text-align: center;
    }
    .box-icon{
        text-align: center;
        margin-top: 40px;
        margin-bottom: 30px;
        .anticon{
            font-size: 100px;        
        }
    }
}
</style>