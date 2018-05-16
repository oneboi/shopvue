
<template>
	<div class="goods">

<el-form :model="form" label-width="100px" :rules="formRules" ref="form1">
	<el-tabs v-model="activeName" @tab-click="handleClick">

    <el-tab-pane label="基本信息" name="base">
    		
				
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				  <el-form-item label="商品分类" prop="cid">
				 <el-select v-model="form.cid"  clearable  filterable placeholder="请选择" style="width:100%" >
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label|html"
						      :value="item.value">
						    </el-option>
						  </el-select>
		      </el-form-item>


				<el-form-item label="商品码" prop="sn">
					<el-input v-model="form.sn" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="商品简单描述" prop="brief">
					<el-input v-model="form.brief" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品原价" prop="oldprice">
					<el-input v-model="form.oldprice" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品现价" prop="price">
					<el-input v-model="form.price" auto-complete="off"></el-input>
				</el-form-item>

				  <el-form-item label="商品图片" prop="img">
				     <el-upload
					  class="avatar-uploader"
					  :action="uploadurl"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  name="goodsimg"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

		        </el-form-item>

				<el-form-item label="商品状态" prop="state">

					<el-radio-group v-model="form.state">
			            <el-radio label="1">上架</el-radio>
			            <el-radio label="0">下架</el-radio>
			         </el-radio-group>
				</el-form-item>
             
 <!--             <el-form-item >
             <el-button type="success"  @click="onadd()">保存信息</el-button>
              </el-form-item> -->
		    
	

    </el-tab-pane>

    <el-tab-pane label="详细信息" name="second">
      
       <KEditor  :content="form.desc" :uploadurl="editorurl" @onEditor="onEditor"></KEditor>

    </el-tab-pane>

        

    <el-tab-pane label="轮播图" name="third">

		 
		 <el-upload
		  :action="uploadsurl"
		  list-type="picture-card"
		  :on-preview="handlePictureCardPreview"
		  :on-success="uploadssuccess"
		   name="carousel"

		  :file-list="filelist"
		   :limit="limit"
		  :on-remove="handleRemove">
		  <i class="el-icon-plus"></i>
		</el-upload>

		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
     
     <div style="margin: 100px;">
        <el-button type="primary"  @click="onadd()">{{addname}}</el-button>
     </div>
    

    </el-tab-pane>
    <el-tab-pane label="其他" name="fourth">其他</el-tab-pane>
  </el-tabs>
  
      </el-form>
	</div>
</template>

<script>
import axios from '../../util/request.js'
import KEditor from '../../component/KEditor.vue'
export default {

  name: 'Goods',

  data () {
    return {
       activeName: 'base',
       addname:"添加商品",
       form:{
         id:0,
       	 name:'',
       	 sn:'',
       	 brief:'',
       	 cid:1,
       	 oldprice:'10',
       	 price:'5',
       	 img:'',
         desc:'',
       	 state:'1',
         carousel:''

       },
        picture:[],
        options:[],//商品分类
        uploadurl:axios.uploadurl,//图片上传路径
        uploadsurl:axios.uploadsurl,//图片上传路径
        imageUrl: '',//商品图片

         //富文本编辑器
         editorcontent:"",
         editorurl:axios.editorupload,

        //轮播图
        dialogImageUrl: '',
        dialogVisible: false,
        limit:5,
        filelist:[],
        imgarr:[],

       // 表单验证规则
        formRules: {          // 表单校验
        name: [
          { required: true, message: '商品的名称', trigger: 'blur' }
        ],
        sn: [
          { required: true, message: '请输入商品码', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
         cid: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
       
      },
      //双向数据,页面的显示和隐藏
   


    };
  },


   props:{
       
      },

   watch: {
        
    },

   methods: {

      //tab 切换，不涉及逻辑
      handleClick(tab, event) {
        console.log(tab, event);
      },
         
        pageshow(){
          this.$emit("pageclose",null);//③组件内对myResult变更后向外部发送事件通知
        },

     
     //提交表单
      onadd(){

         this.$refs.form1.validate((valid) => {

          if (valid) {

           if(errorinfo(this)){
            this.$confirm('你确定检查好了了吗?, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => { 

                 // var carousel=[];

                 //   for(var ki in this.form.picture){
                 //       carousel.push(this.form.picture[ki].path)
                 //   };
                   this.form.carousel=JSON.stringify(this.filelist);
                   //提交表单操作
                   axios.post("Goods/add",this.form).then((data)=>{
                      this.form=formtgoodsform();
                      this.imageUrl="";//商品主图设为空
                      this.imgarr=[];
                      this.filelist=[];
                      this.activeName="base";

                      if(data.code==200){
                        this.$message({
                        type: 'success',
                        message: '操作成功!'
                      });
                        this.$emit("pageclose",null);//关闭弹窗


                      }else{
                        this.$message({
                        type: 'error',
                        message: data.info
                      });

                      }
                    
                      
               
                       });




                

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '操作已经取消'
                });          
              });
            



          } else {
            return false
          }

        }


     })

      
      },



    
    //主图片上传
     handleAvatarSuccess(res, file) {
     	console.log("图片上传结果：");
     	console.log(res);
        this.imageUrl = axios.apiroot+res.data;
        this.form.img = res.data;
      },
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

     //图片上传
     //图片删除
      handleRemove(file, fileList) {

        console.log(file);
         console.log(fileList);
   

         var  imgurl=file.path;
         var  tepname=file.name;

        axios.post2("Upload/delete",{url:imgurl}).then((data)=>{
         console.log("图片删除："+data);
         });

       console.log(file, fileList);
       console.log("filelist")
       console.log(this.filelist);
       console.log("picture")
       console.log(this.picture);
       console.log("imgarr")
       console.log(this.imgarr);
        this.imgarr=deleteimg(this.imgarr,tepname);
        this.filelist=deleteimg(this.filelist,tepname);
       
       // this.form.picture
       // this.filelist
       // this.imgarr

      },
      //图片预览
      handlePictureCardPreview(file) {
      	//预览图片
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;

      },
      //图片上传
       uploadssuccess(res, file) {
     	 console.log("图片上传结果：");

       //构建数组
     	 this.imgarr.push(res.data);
       //保存数据到列表
     	 this.filelist=this.imgarr;
  

      },

      //富文本
      onEditor(val){
        this.form.desc=val;
      },

      changedata2(){
                      //添加前重新赋值为空
                      this.form=formtgoodsform();
                        this.imageUrl="";//商品主图设为空
                        this.imgarr=[];
                        this.filelist=[];
      },


      changedata(id,cid){

        this.form.cid=cid;
        this.addname="保存商品"
        console.log(id,cid);
        console.log('进入页面，变换id和cid');
        if(this.form.id==id){
          return true;
        }else{

          axios.get('Goods/find/id/'+id).then((data)=>{
            console.log("查找单条数据：");
            console.log(data);

            this.form.id=data.data.id;
            this.form.name=data.data.name;
            this.form.sn=data.data.sn;
            this.form.cid=data.data.cid;
            this.form.brief=data.data.brief;
            this.form.price=data.data.price;
            this.form.oldprice=data.data.oldprice;
            this.form.desc=data.data.desc;
            this.form.state=data.data.state;
            this.form.carousel=data.data.carousel;
            this.form.img=data.data.img;
            this.imageUrl = axios.apiroot+this.form.img;
            

            var carousel=JSON.parse(data.data.carousel)
             this.filelist=carousel;
             this.imgarr=[];
             this.imgarr=carousel;

            
          })
        }

      }


    },

   //过滤器器
   filters: {
   	      //过滤分类缩进
		  html: function (html) {
		    return html.replace(/\&nbsp;/g, '-');
		  }
		},

  components:{
    KEditor
  },
   


   
   //钩子函数
   mounted () { 
   	//查询所有分类
     axios.get("Category/getcategory").then((data)=>{
      console.log("查到所有分类的数据：");
      var arr=data.data;
      this.options=data.data;

     });

 

     }
};
</script>

<style lang="css" scoped>

  .el-icon-plus  {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-icon-plus:hover {
    border-color: #409EFF !important;
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