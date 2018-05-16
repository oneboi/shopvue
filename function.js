
//面包屑导航数组
function findParent(node){
var labelname=[];
   function inner(node){
		  if(node.data.id!=0){
		  
		   labelname.unshift(node.label)
		 	
		    inner(node.parent)
		   
		 }

  }
 inner(node);
 return labelname;
}
//轮播图的删除
function deleteimg(arr,name){
for(var i in arr ){
        if(arr[i].name==name){
          console.log(1);
          arr.splice(i,1);
        }
       }
 return arr;

}
//表单辅助验证
function errorinfo(obj){
       if(!obj.form.img){
              
            obj.$message({
                message: '商品主图不可以为空..',
                type: 'warning'
              });
           obj.activeName="base"
            return false;
          }

      if(!obj.form.desc){
              
            obj.$message({
                message: '详情页不可以为空..',
                type: 'warning'
              });
           obj.activeName="second"
            return false;
          }
       
        if(obj.imgarr.length<1){
               obj.$message({
                message: '轮播图呢..',
                type: 'warning'
              });
              obj.activeName="third"
              console.log("");
              console.log(obj.activeName);
              return false;
             }
          return true;
}
//添加商品后的格式化
function formtgoodsform()
{return { 
         id:0,
         name:'',
         sn:'',
         brief:'',
         cid:'',
         oldprice:'',
         price:'',
         img:'',
         desc:'',
         picture:[],
         state:'1'
  }
}