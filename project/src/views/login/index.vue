<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" :show-password=true v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login-btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
 import { User, Lock } from '@element-plus/icons-vue';
 import { reactive, ref } from 'vue';
 import { useUserStore } from '../../store/modules/user';
 import { useRouter, useRoute } from 'vue-router';
 import { ElNotification } from 'element-plus';
 import { getTime } from '../../utils/time';

 //引入用户相关的小仓库
 let userStore = useUserStore();
 //定义加载变量
 let loading = ref(false);
 //收集账号和密码数据
 let loginForm = reactive({ username: 'admin', password: '111111' });
 //获取el-form组件
 let loginForms = ref();
 //获取路由器对象
 const $router = useRouter();
 //获取路由对象
 const $route = useRoute(); 
 //登录方法
 
 const login = async() => {
  //保证全部表单验证通过再提交
  await loginForms.value.validate();
  //加载效果开始
  loading.value = true;
  userStore.userLogin(loginForm).then(() => {
    //登录成功,编程式导航跳转到真实数据首页
    //判断登录是是否有query参数
    let redirect :any  = $route.query.redirect;
    $router.push({ path: redirect || '/' });
    //登陆成功信息提示
    ElNotification({
      type:'success',
      title: `Hi~ ${loginForm.username} ${getTime()}好！`,
      message: '欢迎回来'
    })
    //登陆成功，加载效果消失
    loading.value = false;
  }).catch((error) => {
    //登录失败
    //加载效果消失
    loading.value = false;
    //登陆失败信息提示
    ElNotification({
      type: 'error',
      title: '登录失败',
      message: (error as Error).message
    })
  });  
 }
 //自定义校验规则函数
 //@ts-ignore
 const validatorUserName = (rule:any, value:any, callback:any) => {
    //rule:即为校验规则
    //value:即为输入值
    //callback:校验成功后的回调函数
    if (value.trim().length >= 3 && value.trim().length <= 15) {  //此处可以使用正则表达式进行更精确的校验
      callback();
    } else {
      callback(new Error('用户名长度在 3 到 15 个字符'));
   };
 }
 //定义表单验证规则
 const rules = {
   username: [
     { required: true, message: '请输入用户名', trigger: 'blur' },
    // { required: true, min: 5, max: 10, message: '用户名长度在 5 到 10 个字符', trigger: 'change' },
    //自定义校验规则
     { validator: validatorUserName, trigger: 'change' },
   ],
   password: [
     { required: true, message: '请输入密码', trigger: 'blur' },
     { required: true, min: 5, max: 20, message: '密码长度在 5 到 20 个字符', trigger: 'change' },
   ],
 }
</script>

<style scoped lang="scss">
  .login_container {
    width: 100%;
    height:100vh;
    background :url('@/assets/images/login/background.jpg') no-repeat;
    background-size: cover;
  }
  .login-form {
    display: block;
    position: relative;
    width: 70%;
    top: 30vh;
    background: url('@/assets/images/login/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
  }
  h1 {
    font-size: 40px;
    color: #fff;
  }
  h2 {
    font-size: 20px;
    color: #fff;
    margin: 20px 0;
  }
  .login-btn {
    width: 100%;
  }
</style>