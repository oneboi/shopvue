<template>
	<div class="login">
		
<el-row class="content">
  <el-col :span="8" :offset="8" >
  	<div class="grid-content bg-purple">

  		<h2 style="text-align: center; padding:20px;">VUE后台管理系统</h2>
      <el-form ref="form" :model="form" label-width="80px">
	  <el-form-item >
	    <el-input v-model="form.username"  placeholder="请输入工号"></el-input>
	  </el-form-item>

	  <el-form-item >
	    <el-input v-model="form.password"  type="password" placeholder="请输入密码"></el-input>
	  </el-form-item>

	   <el-form-item>
	    <el-button type="primary"  style="width:100%" @click="login">登陆</el-button>
	  </el-form-item>
	</el-form>
  </div>

  </el-col>

</el-row>

	</div>
</template>

<script>

import axios from '../util/request.js'
export default {

  name: 'Login',

  data () {
    return {

    	form:{
    		username:"1041288",
    		password:"1041288"
    	}

    };
  },
  methods:{
  	login(){
     axios.post("Login/index",this.form).then((data)=>{

         if (data.state.code==200) {

                localStorage.setItem('access_token', data.data.token)   // 用户登录token
                // localStorage.setItem('users', JSON.stringify(data.data))   // 用户信息
                // this.$store.dispatch('userlogin', data.data)    // 把用户信息存入state
                this.$router.push({ path: '/info' })
              } else {
                this.$message.error(data.state.info)
              }

     	console.log(data);
     });
  	}
  }
};
</script>

<style >
.login{
	height: 100%;
	width: 100%;

}
.content{
  padding: 200px 0px;
}
</style>