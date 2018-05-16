<template>

	<div class="info">
	<!-- 	第一部分： 显示信息部分 -->

		  <section> 
	
	<el-form class="formUser" ref="formUser" :model="formUser" label-width="80px" >
        
	       <el-form-item style="text-align: center">
	         
	         <!-- 头像上传 -->
	          <el-upload
				  class="avatar-uploader"
				  :action="actionurl"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="formUser.ico" :src="formUser.ico" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>


	      </el-form-item>
	      <el-form-item label="性别">
	        <el-radio     v-model="formUser.sex"  label="1">男</el-radio>
	        <el-radio      v-model="formUser.sex" label="0">女</el-radio>
	      </el-form-item>
	      <el-form-item label="名称">
	        <el-input  v-model="formUser.username" ></el-input>
	      </el-form-item>
	      <el-form-item label="生日">
	        <el-date-picker type="date"  v-model="formUser.brithday"  placeholder="选择日期"  style="width: 100%;"></el-date-picker>
	      </el-form-item>
	      
	      <el-form-item style="text-align: center">
	        <el-button type="primary" @click="saveuser">保存修改</el-button>
	        <el-button type="warning" >密码修改</el-button>
	      </el-form-item>
       </el-form>




		  </section>

	</div>
</template>

<script>
export default {

  name: 'Info',

  data () {
    return {
        formUser: {
         ico:'',
         username:'',
         brithday:'',
         sex:'1'
        },    // 用户信息
        actionurl: this.GLOBAL.uploadImage + '?token=' + localStorage.getItem('access_token'),  // 图片上传路径,常量
    };
  },


  //方法
  methods:{
    
     //上传成功的回调
     handleAvatarSuccess(res, file) {
     	console.log(res);
     	console.log(file);
        this.formUser.ico = this.GLOBAL.imageUrl +res.data;
      },
  
   //上传之前的出
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },




      //保存用户：
     
     saveuser(){

     this.$confirm('确认要保存此数据吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {   // 确认添加
         
         //提交用户数据
         
      })

     },//saveuser
      
   

  },

  //钩子函数 
   created () {
  

  }

};
</script>

<style lang="css" scoped>

 .formUser{
  margin: 10px 0px;
  width: 30%;
  min-width: 400px;
}
.formUser img{
  width: 180px;
  height: 180px;
  border-radius: 90px;
}

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>