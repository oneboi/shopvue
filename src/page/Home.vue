<!-- 布局布局页面 ，决定整个后台的布局 其他页面在此此渲染 -->

<template>

 <el-row class="container">

         

 	<!-- 页面头部 通栏宽度100%高度60px-->
    <el-col :span="24" class="header">
             
           <!-- logo 展开的时候是320px,关闭的时候是60px -->
    	  <div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
    	  	{{collapsed?'':systemname}}
    	  </div>
           
          <!--  图标，点击collapse or expand  -->
    	  <div class="tools" @click="collapsed=!collapsed"> <!-- 开关按钮 -->
    	  	  <!-- 字体图标 -->
    	  <i :class="collapsed?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
          
    	  </div>
            
            <!-- user icon and loginout -->
    	  <div class="userinfo">
    	  	         <el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="userimg" />King</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item ><i class="el-icon-setting"></i>  个人信息</el-dropdown-item>
						<el-dropdown-item ><i class="el-icon-circle-cross"></i>  退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
    	  </div>
    </el-col>









   
   <!-- 页面主体 宽度100% 高度100%-60px -->
    <el-col :span="24" class="main">  
    	<!-- aside最大宽度230px;最小宽度60px; -->
    	<!-- 左侧菜单 -->
    	 <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
    	 	   

    	 	   <!-- el菜单结构 -->
    	 	  <el-menu default-active="1" :collapse="collapsed"  unique-opened router>
				 <!--  <el-submenu index="/"> -->
            

            <el-submenu index="1">
				    <template slot="title">
				      <i class="el-icon-location"></i>
				      <span slot="title">系统菜单</span>
				    </template>
             

              <el-menu-item  index="user">
               <i class="el-icon-message"></i>
              <span slot="title">用户管理</span>
            </el-menu-item >

             <el-menu-item  index="role">
               <i class="el-icon-message"></i>
              <span slot="title">角色管理</span>
            </el-menu-item >


				    <el-menu-item index="menu">
				    <i class="el-icon-message"></i>
				      <span slot="title">菜单管理</span>
				    </el-menu-item >

			     
				  
				  </el-submenu>




           <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">vue相关</span>
            </template>

            <el-menu-item  index="form">
               <i class="el-icon-message"></i>
              <span slot="title">参考文档</span>
            </el-menu-item >
           </el-submenu>


           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </template>

            <el-menu-item  index="category">
               <i class="el-icon-message"></i>
              <span slot="title">分类管理</span>
            </el-menu-item >
           </el-submenu>

             <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">商品</span>
            </template>

            <el-menu-item  index="goods">
               <i class="el-icon-message"></i>
              <span slot="title">商品管理</span>
            </el-menu-item >
           </el-submenu>

            <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">门店</span>
            </template>

            <el-menu-item  index="store">
               <i class="el-icon-message"></i>
              <span slot="title">门店管理</span>
            </el-menu-item >
           </el-submenu>

         </el-menu>
           


    	 </aside>

          

         <!-- 其他页面渲染位置 -->
    	 <article>
    	 	
    	 	<el-row>
    	 		<!-- 面包屑 -->
              <el-col :span="24" class="breadcrumb-container">
                     
                  <el-breadcrumb separator-class="el-icon-arrow-right">
        					  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        					  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        					  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        					  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        					</el-breadcrumb>  
			      </el-col>
       



		       <!-- page页面渲染出口， -->
			     <el-col :span="24" class="content-wrapper">
             <!--  菜单页面都是home的子页面,渲染出口在这 -->

             <router-view></router-view>


		        </el-col>


           </el-row>
    	 </article>


    </el-col>

</el-row>


</template>

<script>
export default {

  name: 'Home',
  data () {
    return {

    	collapsed:false ,//侧边栏默认是expanded
        systemname:"母婴小程序",//系统的名称，当做logo显示
        userimg:'/shopvue/image/63885668tw1dtxtodpk6ej.jpg'
    };
  },
  mounted:function(){
   this.$nextTick(function () {
   console.log(this.$router);
  })

  },
};
</script>

<style >

.container{
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.container>.header{
	height: 60px;
	line-height: 60px;
	background: #7e57c2;
	color:#fff;
}

.container>.header>.logo{
      height: 60px;
      text-align: center;
      font-size: 20px;
      border-right: solid #fff 1px;
      color: #fff;
      line-height: 60px;
    }
    
 .container>.header>div{
 	display: inline-block;
 }
  /*  expand width*/
.container>.header> .logo-width{
      width:230px;
    }

    /*collapse wdith*/
.container>.header>.logo-collapse-width{
      width:60px;
      height: 0px;/*按钮掉落问题*/
    }

.container>.header>.tools{
      padding: 0px 10px;
      width:25px;
      position: relative;
      font-size: 20px;
}


    .userinfo{
      float: right;
    }
    .userinfo .el-dropdown{
      float: right;
    }
    .userinfo-inner{
      float: right;
      color: #fff;
    }
    .userinfo-inner img{
      width: 40px;
      height:40px;
      border-radius: 20px;
      margin: 10px 30px 10px 10px;
      float: right;
    }
/*header结束*/


/*flex布局*/
.main{
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

  }
/* 左侧菜单砍断*/
 aside.menu-collapsed{
      flex: 0 0 60px;/*不放大缩小，宽度为60px;*/
      width: 60px;
    }
 aside.menu-expanded{
      flex: 0 0 230px;
      width: 230px;
    }
 aside{
 	background: #ccc;
 }

 article{   
      flex: 1; /*占据剩余位置*/
      overflow-y: scroll; /*出现滚动条*/
      padding: 20px 30px;
 }



.breadcrumb-container{
  	padding: 0 20px;
     height: 35px;
     line-height: 35px;
   }
      
</style>