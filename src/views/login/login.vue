<template>
    <div id='loginPage' v-show="state.show">
        <!-- <loginBg></loginBg> -->
        <div class='formBox'>
            <h1 class="formHeader">后台管理系统</h1>
            <el-form :model="state.user" :rules="state.rules" ref="ruleFormRef" label-width="80px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="state.user.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="state.user.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginBtn" type="primary" size="large" :loading="state.loginLoading"
                        @click="handleLogin(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
// import loginBg from "./loginBg.vue"
import { login } from "@api/user/user"
import { ref, reactive } from 'vue';
import Router from "@router/router"
import storage from "@utils/storage";
const state = reactive({
    show: true,
    loginLoading: false,
    user: {
        userName: "",
        password: "",
    },
    rules: {
        userName: [{ required: true, message: '请输入您的账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }
})

const ruleFormRef = ref();

function handleLogin(form) {
    form.validate((valid) => {
        if (!valid) return;
        state.loginLoading = true;
        login(state.user).then(res => {
            const token = res.token;
            storage.setItem("token", token);
            Router.replace('/');
            state.show = false;
            state.loginLoading = false;
        }).catch((err) => {
            state.show = false;
            state.loginLoading = false;
        })
    })
}

</script>

<style lang='scss' scoped>
#loginPage {
    width: 100%;
    height: 100%;
    position: relative;



    .formBox {
        width: 460px;
        padding: 0 30px 16px 10px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .formHeader {
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .loginBtn {
            width: 100%;
        }
    }
}
</style>