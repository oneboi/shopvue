
<template>
  <div class="goods">

        <section>
    <!--搜索条-->
    <el-col :span="24" class="toolbar">

      <el-form :model="where">
        <el-form-item>
          <el-input v-model="where.sn" placeholder="商品码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="dialog(1, 2,'add')">新增</el-button>
        </el-form-item>

      </el-form>
    </el-col>
    <!--table列表-->
    <el-table :data="storelist" highlight-current-row  style="width: 100%;">
     
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
          <el-form-item label="分类">
            <span>{{ props.row.cname }}</span>
          </el-form-item>
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


      <el-table-column type="index" width="60">
      </el-table-column>

      <el-table-column prop="id" label="id" sortable>
      </el-table-column>
      <el-table-column prop="sn" label="商品码" sortable>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" sortable>
      </el-table-column>
       <el-table-column prop="cname" label="分类" sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable>
      </el-table-column>
      <el-table-column prop="oldprice" label="原价" sortable>
      </el-table-column>
      </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="100"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state ==  0 ? 'danger' : 'success'"
          close-transition>{{scope.row.state == 1?'上架':'下架'}}</el-tag>
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


  </section>





   <div >
        <!-- 新增和编辑弹出面板，默认不显示 -->
          <el-dialog  :title="editorpage.title"  :visible.sync="visible" width="80%" >
              
            <Editorpage  ref="edpage" :editorpageid="editorpage.id" :categoryid="editorpage.cid" @pageclose="pageclose"></Editorpage>

           </el-dialog>
         <!-- Dialog 弹出一个对话框，适合需要定制性更大的场景。 -->
       </div>


    
  </div>
</template>

<script>
import axios from '../../util/request.js'
import Editorpage from './Editorpage.vue'

export default {

  name: 'Goods',

   data () {
    let self = this

    return {

      where: {    // 查询条件
        sn: ''
      },


      page: 1,     // 分页
      size: 5,     // 分页数量
      sizes: [10, 20, 50, 100],
      total: 0,   // 总数量
      storelist: [],    // 结果集
      sels: [],      // 选择对象
         // 表单校验
      form: {    // 表单数据
        id: '', // 门店代码
        sn: '',
        name: '',
        brief: '',
        desc: '',
        cid: '',
        oldprice: '',
        price: '',
        state: '',
      },
      visible: false,
 

 // 弹框需要的数据
      editorpage:{
         id:'0',
         cid:'1',
        title:'提示'
      }
    }

  },



  methods: {

    dialog(index,row,flag){
      if(flag=="edit"||flag=="add"){
        if(flag=="add"){
          this.editorpage.title="添加商品"
          this.editorpage.id='0';
          this.$nextTick(() => {
                this.$refs.edpage.changedata2();
            })

        }else{
           this.editorpage.title="编辑商品"
           this.editorpage.id=row.id;
           this.editorpage.cid=row.cid;

            this.$nextTick(() => {
                this.$refs.edpage.changedata(row.id,row.cid);
            })
           
           console.log(this.$refs.edpage);

           console.log(this.editorpage.id);
        }
         console.log(flag);
         this.visible = true
      }else{
          this.$message({
                message: '功能开发中...',
                type: 'warning'
              });
            return false;
  
      }
   
    
    },
    pageclose(val){
      this.visible=false;
      this.query();
    },
    query () {   

     var params = {     // POST body data
        sn: this.where.sn, // 输入查询
        page: this.page,
        rows: this.size,
        sort: 'id',
        order:'DESC'
      }
     axios.post2("Goods/select",params).then((data)=>{
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

      viewimg: function (url){
        return '<img src="'+axios.apiroot+url+'" width="200px" height="200px">' ;
      }
   
  },

     //过滤器器
   filters: {
          //过滤分类缩进
   
    },
    components:{

      Editorpage
    },
// 钩子
  mounted () {    // 页面进入默认执行方法
    this.query()
  }
};
</script>

<style lang="css" scoped>

/*   .amap-demo {
      height: 300px;
    }*/


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