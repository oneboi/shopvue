<template>
  <!-- <el-col :span="24" class="header">
    <el-form>

      <el-form-item>
        <el-input v-model="querydata.data" placeholder="名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add" v-show="querydata.showadd">新增</el-button>
      </el-form-item>
    </el-form>
  </el-col>
 -->

 <el-row>
  <el-col :span="24" class="header">

    <el-form ref="form" :model="querydata" label-width="80px">
                <el-form-item>
                  <el-input v-model="querydata.data"></el-input>
                </el-form-item>
                 
             <el-form-item>
                <el-button type="primary" @click="query">查询</el-button>
                <el-button type="primary" @click="add" v-show="querydata.showadd">新增</el-button>
              </el-form-item>
                 
    </el-form>

  </el-col>
</el-row>


</template>

<!--    <HeaderView :headerData="headerData" @queryList="query" @add="dialogShow"></HeaderView> -->
  <!-- 父组件中接受属性和事件 -->
<!--    headerData: {   // 给子组件的数据,用于Header
        filters: '',
        showAdd:true
      },
       -->
<script>
  export default{
    data () {
      return {

      }
    },
    props: ['querydata'],    // 父组件给过来的数据
    methods: {
      query () {
        //子组件传递父组件 //触发事件
        this.$emit('queryList')
      },
      add () {
        //子组件传递父组件
        this.$emit('add')
      }
    }
  }
</script>

<style scoped >
  .header{
    background-color: #f2f2f2;
    float: left;
    height: 56px;
    padding: 10px;
    margin-bottom: 10px;
    // margin-top: 10px;
  }
  .header .el-form-item {
    display: inline-block;
    margin-bottom: 0px;
    margin-right: 10px;
  }
</style>
