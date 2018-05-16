<template>

	<div>
		<div>

			<el-row>
  <el-col :span="12"><div class="grid-content bg-purple">
  	

  	总分类目录

 <div class="tree">
       
      <el-tree
      :data="treedata1"
      node-key="id"
      show-checkbox
        ref="tree1"
      highlight-current
      :props="defaultProps"

      accordion
      default-expand-all
      :expand-on-click-node="false">

    </el-tree>

    </div>

  </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light right">

      <div class="title">
        {{ $route.params.code}}  门店的分类目录
      </div>
  	 

  	  <div class="tree2">
       
      <el-tree
      :data="treedata2"
      node-key="id"
      highlight-current
      :props="defaultProps"
      accordion
        ref="tree2"
      default-expand-all
      :expand-on-click-node="false">

          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>

            <span class="delbutton">
              <el-button
                type="text"
                size="mini"
                @click="remove(node, data)">
                删除
              </el-button>
            </span>
          </span>

    </el-tree>



    </div>

  </div>

</el-col>
</el-row>



<div  class="button">
	<el-button @click="getCheckedKeys">添加选中的节点</el-button>
  <el-button @click="resetChecked">清空选择</el-button>
  <el-button @click="routerback">返回门店列表</el-button>
</div>
 


  
		</div>
	</div>
</template>

<script>

import axios from '../../util/request.js'
export default {

  name: 'StoreCategory',

  data () {
    return {

       treedata1:[
         {id:0,
         name:"根目录",
         }
        ],
         
       treedata2:[
         {id:0,
         name:"根目录",
         }
        ],
       defaultProps: {
          children: 'children',
          label: 'name',

        }

    };
  },


methods:{

      getCheckedKeys() {

      	var ids=this.$refs.tree1.getCheckedKeys(true);
      	console.log(ids);
      	 console.log("选中的节点数id: "+ids);

      	 var  code =this.$route.params.code;
      	 var postdata={
      	 	code:code,
      	 	ids:ids
      	 };
         
          console.log(this.$route.params.code);
          
      	if(ids.length<1){
      		 this.$message({
                message: '没有选中的分类...',
                type: 'warning'
              });
            return false;
      	}

      	 this.$confirm('你确认添加选中的分类么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        

        if(code){
		    
       axios.post2("StoreCategory/add",postdata).then((data)=>{
		         console.log(data);

		         this.query();
		     });
        }

        
          this.$message({
            type: 'success',
            message: '添加成成功!'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });          
        });

        

      },
    routerback(){
      this.$router.back(-1)
    },
      
      //清空选择的
      resetChecked() {
        this.$refs.tree1.setCheckedKeys([]);
      },

      remove(node, data) {

        if(node.isLeaf){
          var key =node.key;
          console.log(key);


       this.$confirm('你确认需要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          var postdata={id:key}
         axios.post2("StoreCategory/delete",postdata).then((data)=>{
             console.log(data);
               this.$refs.tree2.remove(key);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

           })

      
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


      

        }else{
          
           this.$message({
                message: '请先删除该分类下面的子分类..',
                type: 'warning'
              });
            return false;
        }
        console.log(node);
        console.log(data);
        
      

      },

      query(){
       axios.get("StoreCategory/select/code/"+this.$route.params.code).then((data)=>{
		      console.log("查到到的数据：");
		      console.log(data.data);
		     this.$set(this.treedata2[0], 'children', data.data);
		     });

      }

    
},
  



   mounted () {
    console.log(this.treedata1[0].name);

     axios.get("Category/select").then((data)=>{
      console.log("查到到的数据：");
      console.log(data.data);
     this.$set(this.treedata1[0], 'children', data.data);
 

     });

     this.query();
    

  }
};
</script>

<style lang="css" scoped>

.button{

/*	width: 500px;
	margin: 0 auto;*/
     margin-top: 20px;
}
.button button{
	width: 200px;
	color: #fff;
	background: #7e57c2;
}

.tree2{


  display: flex;
  margin-top: 20px;
  width: 100%;

}

.custom-tree-node{
  display: flex;
  flex: 1;
  width: 500px;
  align-items: center;
 justify-content: space-between;
}


</style>