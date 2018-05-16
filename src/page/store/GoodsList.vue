<template>

	<div class="goodslist">
		
		
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple">
		  	 <h1>门店商品</h1>


		  	    <!--搜索条-->
    <el-col :span="24" class="toolbar">

      <el-form >
        <el-form-item>
          <el-input v-model="keywords" placeholder="输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>

         <el-form-item>
           <el-button type="success" @click="del()">删除</el-button>
        </el-form-item>

     

         
      </el-form>
    </el-col>


		  	 	<div gooods>

		  		 	<!--table列表-->
			  <el-table :data="goodslistdata"   @selection-change="changeFun" highlight-current-row  style="width: 100%;">
			     
			  <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="商品码">
			            <span>{{ props.row.sn }}</span>
			          </el-form-item>
			          <el-form-item label="名称">
			            <span>{{ props.row.name }}</span>
			          </el-form-item>
			          <el-form-item label="现价">
			            <span>{{ props.row.price }}</span>
			          </el-form-item>
			          <el-form-item label="原价">
			            <span>{{ props.row.oldprice }}</span>
			          </el-form-item>
			      <!--     <el-form-item label="分类">
			            <span>{{ props.row.cname }}</span>
			          </el-form-item> -->
			          <el-form-item label="状态">
			            <span>{{ props.row.state == 1?'上架':'下架' }}</span>
			          </el-form-item>
			          <el-form-item label="商品简介">
			            <span>{{ props.row.brief }}</span>
			          </el-form-item>
			            <el-form-item label="商品主图">
			            <span v-html="viewimg(props.row.img)"></span>
			       
			          </el-form-item>
			         
			        </el-form>
			      </template>
			    </el-table-column>

			      <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>


			      <el-table-column type="index" width="60">
			      </el-table-column>

			      <!-- <el-table-column prop="id" label="id" sortable>
			      </el-table-column> -->
			      <el-table-column prop="sn" label="商品码" sortable>
			      </el-table-column>
			      <el-table-column prop="name" label="商品名称" sortable>
			      </el-table-column>
			     <!--   <el-table-column prop="cname" label="分类" sortable>
			      </el-table-column> -->
			      <el-table-column prop="price" label="价格" sortable>
			      </el-table-column>
			      <el-table-column prop="oldprice" label="原价" sortable>
			      </el-table-column>
			      </el-table-column>

			    </el-table>
		  	
			    </div>
		  

			</div>
		</el-col>



			      <el-col :span="24" class="toolbar">
			      <el-pagination layout="sizes, prev, pager, next, total" @size-change="sizeChange" 
			      @current-change="currentChange"
			           :page-size="10" :total="total" style="float:right;" >
			      </el-pagination>
			      </el-col>


		</el-row>

	</div>
</template>

<script>

import axios from '../../util/request.js'
export default {

  name: 'goodslist',

  data () {
    return {
      
       keywords:'',
       page: 1,     // 分页
       size: 5,     // 分页数量
       code: 0,
       sizes: [10, 20, 50, 100],
       total: 0,   // 总数量
       goodslistdata: [],    // 结果集
       multipleSelection:[]
     

    };
  },

  methods:{

  	 query () {  
     var params = {     // POST body data
        page: this.page,
        rows: this.size,
        code:this.code,
        sort: 'id',
        keywords:this.keywords,
        order:'DESC'
      }
     axios.post2("StoreGoods/selects",params).then((data)=>{
      console.log("查到到的数据：");
      console.log(data.data);
      this.goodslistdata = data.data.rows
      this.total = parseInt(data.data.total)
      console.log(this.total);
    
     });
  
    },

    changeFun(val) {
    console.log(val);
      this.multipleSelection = val;
    },

   sizeChange (val) {    // 每页条目数
      this.size = val
      this.query()
    },
    currentChange (val) {   // 分页
      this.page = val
      this.query()
    },

   viewimg: function (url){
        return '<img src="'+axios.apiroot+url+'" width="200px" height="200px">' ;
      },

    del(){


   		if(this.multipleSelection.length<1){
      		 this.$message({
                message: '没有选中的任何商品...',
                type: 'warning'
              });
            return false;
      	}

      	 this.$confirm('你确认删除选中的商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {


            console.log(this.multipleSelection);
          var arr=[]
          for(var  i in this.multipleSelection){
            arr.push(this.multipleSelection[i].id);
          }   
         var postdata={code:this.code,ids:arr.join("-")};
         axios.post2("StoreGoods/delete",postdata).then((data)=>{
             console.log(data);

             if(data.code==200){

                this.$message({
                    type: 'success',
                    message: '添加成成功!'
                  });
                this.query();
             }
             
         });吧VB吧b




        	

        }).catch((error) => {
        	console.log(error);
          this.$message({
            type: 'info',
            message: '添加取消'
          });          
        });

   }


  },

  // 钩子
  mounted () {    // 页面进入默认执行方法
    //this.query()
  }

};
</script>

<style lang="css" scoped>

.toolbar{
  background-color: #f2f2f2;
  float: left;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.toolbar .el-form-item {
  display: inline-block;
  margin-bottom: 0px;
  margin-right: 10px;
}


  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

   .btm-action{
        margin-top: 20px;
        text-align: center;
    }
   
    .pagination{
        display: inline-block;
    }
</style>