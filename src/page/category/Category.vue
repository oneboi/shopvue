<template>

	<div class="category">

    <div class="title">母婴小程序分类数据</div>
    

 

    <div class="tree">
       
      <el-tree
      :data="treedata"
      node-key="id"
      highlight-current
      :props="defaultProps"

      accordion
      default-expand-all
      :expand-on-click-node="false">

      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"

              @click="dialog(node, data,'add')">
           添加
          </el-button>
          
          <el-button
            type="text"
           
            @click="dialog(node,data,'edit')">
            编辑
          </el-button>
           <el-button
            type="text"
           
            @click="remove(node, data)">
            禁用
          </el-button>
         
          <el-button
            type="text"
           
            @click="dialog(node, data,'del')">
            删除
          </el-button>

            
        </span>
      </span>

    </el-tree>

    </div>
  




       <div  class="diglog">
        <!-- 新增和编辑弹出面板，默认不显示 -->
          <el-dialog  title="添加分类"  :visible.sync="visible" >
              
                      <el-form :model="form"  label-width="80px">

                           

                  <el-form-item  >
                   
                   <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item >根目录</el-breadcrumb-item>
    
                    <template v-for=" item in arrlabel">
                    <el-breadcrumb-item> {{ item }}</el-breadcrumb-item>
                    </template>
                   
                   </el-breadcrumb>

                      </el-form-item>


                      <el-form-item label="分类名称" >
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                      </el-form-item>

                      <el-form-item label="排序"  >
                        <el-input v-model="form.sort" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="visible = false">取 消</el-button>
                  <el-button type="primary" @click="postdata">确 定</el-button>
                </div>

           </el-dialog>
         <!-- Dialog 弹出一个对话框，适合需要定制性更大的场景。 -->
       </div>




	</div>
</template>

<script>

import axios from '../../util/request.js'

  
    // const treedata = [{
    //     id: 0,
    //     label: '根目录',
    //   }]; //原始的根目录

  export default {
    data() {
     
    
      return {
        // data5: JSON.parse(JSON.stringify(this.treedata)),
        visible: false,  // dialog是否展示
        tmpdata:[],
        form:{
            id:"",
            name:"",
            sort:100,
            pid:"",
            img:"",
            ico:null,
            state:1
            },//提交数据库
        arrlabel:[],//面包屑导航,
        treedata:[
         {id:0,
         name:"根目录",
         }
        ],
         defaultProps: {
          children: 'children',
          label: 'name',

        }
      }

    },

    methods: {
      append(data) {
         //添加出现弹框 
         

        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

       //新增和编辑操作
        dialog(node, data,index){ 
         
          var that=this;
          
         this.arrlabel=[];
          var arr=findParent(node);
           this.arrlabel=arr;
            console.log(this.arrlabel);

         

     

          this.tmpdata=data;
          //删除逻辑
          if(index=='del'){
             this.$message({
                message: '添加之后就不可删除哦，你可以试着编辑一下',
                type: 'warning'
              });
            return false;
          }
         
         //新增操作
          if(index=='add'){
         //显示弹窗
          this.visible = true
         //获得当前的id
         //获得祖先的label
          this.form={
            id:"",
            name:"",
            sort:100,
            pid:"",
            img:"",
            ico:null,
            state:1
            }//提交数据库
         
          
         console.log("查找父级id");
         console.log(node);
         console.log(data);
          let pid=data.id 
          console.log(pid);
          this.form.pid=pid;
         
          }

          //新增操作
          if(index=='edit'){
            if(node.data.id==0){
              return  false;
            }

            console.log(node);
            console.log(data);
            console.log(index);
            this.visible = true
            this.form=data;
          }




        },
      postdata(){

        if(!this.form.id){

         axios.post2("Category/add",this.form).then((data)=>{
        this.form.id=data.data;
        const newChild = { id: this.form.id, name:this.form.name , children: [] };
        console.log("新添加的节点数据：");
        console.log(newChild);
        if (!this.tmpdata.children) {
          this.$set(this.tmpdata, 'children', []);
        }
        this.tmpdata.children.push(newChild);
        console.log(this.tmpdata);

        this.form={
            id:"",
            name:"",
            sort:100,
            pid:"",
            img:"",
            ico:null,
            state:1
            }//提交数据库
          this.tmpdata=null;

        this.visible = false;
     });
        }else{

          //编辑操作
        axios.post2("Category/edit",this.form).then((data)=>{
      
          this.tmpdata.name=this.form.name;
          this.tmpdata.state=this.form.state;
          console.log(this.tmpdata);
         this.visible = false;
          this.tmpdata=null;

        })


     

      }},

      remove(node, data) {

        this.$message({
                message: '功能开发中...',
                type: 'warning'
              });
            return false;
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
      },


      // watch:{

      //   treedata(curVal,oldVal){

      //     console.log(curVal);
      //     console.log();
      //   }
      // },


      query(){
     console.log(this.treedata[0].name);
     axios.get("Category/select").then((data)=>{
      console.log("查到到的数据：");
      console.log(data.data);
     this.$set(this.treedata[0], 'children', data.data);
    

     });
    



      }
    },


  mounted () {
     this.query();
   }

   

  };
</script>


<style>

 .category{
  /*background: #7e57c2;*/
  color: #7e57c2;
  display: flex;
  flex-direction: column;
 }

 .category .title{

  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;


 }
 .category .tree{
  flex: 1;
  margin-top: 20px;
  margin: 0 100px;
  height: 9000px;
 }
  
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding-right: 8px
  }
</style>