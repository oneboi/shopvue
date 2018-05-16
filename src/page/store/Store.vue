<template>
<div class="store">
  
    <div>
    <!--搜索条-->
    <el-col :span="24" class="toolbar">

      <el-form :model="where">
        <el-form-item>
          <el-input v-model="where.code" placeholder="门店代码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialog(1, 2,'edit')">新增</el-button>
        </el-form-item>

      </el-form>
    </el-col>
    <!--table列表-->
		<el-table :data="storelist" highlight-current-row  style="width: 100%;">
		 
  <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="代码">
            <span>{{ props.row.code }}</span>
          </el-form-item>
          <el-form-item label="名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="营业时间">
            <span>{{ props.row.businesshours }}</span>
          </el-form-item>
          <el-form-item label="经纬度">
            <span>{{ props.row.location }}</span>
          </el-form-item>
          <el-form-item label="配送范围">
            <span>{{ props.row.range }}</span>
          </el-form-item>
         <el-form-item label="起送费用">
            <span>{{ props.row.freeshipping }}</span>
          </el-form-item>
          <el-form-item label="员工提成">
            <span>{{ props.row.freight }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>


			<el-table-column type="index" width="60">
			</el-table-column>

      <el-table-column prop="code" label="代码" sortable>
			</el-table-column>
			<el-table-column prop="name" label="名称" sortable>
			</el-table-column>
			<el-table-column prop="address" label="地址" sortable>
			</el-table-column>
			</el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="100"
      
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state === 0 ? 'primary' : 'success'"
          close-transition>{{scope.row.state===1?'启用':'禁用'}}</el-tag>
      </template>
    </el-table-column>

      <el-table-column label="添加分类操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="category(scope.$index, scope.row)">添加分类</el-button>
        </template>
      </el-table-column>

      <el-table-column label="添加商品" >
        <template slot-scope="scope">
          <el-button size="small" type="info" @click="goods(scope.$index, scope.row)">添加商品</el-button>
        </template>
      </el-table-column>

       <el-table-column label="门店商品" >
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="look(scope.$index, scope.row)">商品</el-button>
        </template>
      </el-table-column>
      


			<el-table-column label="操作" width="300">
				<template slot-scope="scope">
					<el-button size="small" type="info" @click="dialog(scope.$index, scope.row,'edit')">编辑</el-button>
					<el-button size="small" type="danger" @click="dialog(scope.$index, scope.row,'delete')">删除</el-button>
          <el-button size="small" type="warning" @click="dialog(scope.$index, scope.row,'stop')">禁用</el-button>
				</template>
			</el-table-column>

		</el-table>
      <el-col :span="24" class="toolbar">
			<el-pagination layout="sizes, prev, pager, next, total" @size-change="sizeChange" 
      @current-change="currentChange"
           :page-size="10" :total="total" style="float:right;" >
			</el-pagination>
		</el-col>


  </div>

    <div >
        <!-- 新增和编辑弹出面板，默认不显示 -->
          <el-dialog  title="查看门店商品"  :visible.sync="visible" width="80%" >
              
           <GoodsList ref="goodlist"></GoodsList>

           </el-dialog>
         <!-- Dialog 弹出一个对话框，适合需要定制性更大的场景。 -->
       </div>


</div>
</template>

<script>

import axios from '../../util/request.js'
import GoodsList from './GoodsList.vue'
export default {
  name: 'store',

  data () {
    return {

      where: {    // 查询条件
        code: ''
      },

      visible: false,
      page: 1,     // 分页
      size: 5,     // 分页数量
      sizes: [10, 20, 50, 100],
      total: 0,   // 总数量
      storelist: [],    // 结果集
      sels: [],      // 选择对象
         // 表单校验
      form: {    // 表单数据
        code: '', // 门店代码
        name: '',
        phone: '',
        range: '',
        freight: '',
        freeshipping: '',
        log: '',
        businesshours: '',
        location: [], // 访问不到
        address: ''

      },
    }
  },


 components:{
   GoodsList
 },
  methods: {

    dialog(index,row,flag){
      this.$message({
                message: '功能开发中...',
                type: 'warning'
              });
            return false;

    },

    look(index,row){

    
          this.visible = true

           this.$nextTick(() => {
             this.$refs.goodlist.code=row.code
             this.$refs.goodlist.query()
             
            })
      
   
    },

    category(index,row){
      console.log(index);
      console.log(row);
      var code=row.code;
     this.$router.push({ name: 'storecategory', params: { code }}) // -> /user/123

    },

     goods(index,row){
      console.log(index);
      console.log(row);
      var code=row.code;
      this.$router.push({ name: 'storegoods', params: { code }}) // -> /user/123

    },


    query () {   

     var params = {     // POST body data
        code: 1, // 输入查询
        page: this.page,
        rows: this.size,
        sort: 'id',
        order:'ASC'
      }
     axios.post2("Store/select",params).then((data)=>{
      console.log("查到到的数据：");
      console.log(data.data);
      this.storelist = data.data.rows
      this.total = parseInt(data.data.total)

      console.log(this.total);
    
  
     });
  
    },
   
    sizeChange (val) {    // 每页条目数
      this.size = val
      this.query()
    },
    currentChange (val) {   // 分页
      this.page = val
      this.query()
    },


   
  },
// 钩子
  mounted () {    // 页面进入默认执行方法
    this.query()
  }

}
</script>

<style scoped>

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
