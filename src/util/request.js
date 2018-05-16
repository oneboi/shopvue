import axios from 'axios'
import Vue from 'vue'

// axios.defaults.baseURL = 'https://pt.yxtmart.cn/hxshop/index.php?s=/King/'   //API请求地址
axios.defaults.baseURL = 'https://pt.yxtmart.cn/hxshop/index.php?s=/King/'   //API请求地址


//request拦截器
axios.interceptors.request.use(config=>{


  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {   // post提交方式修改Content-Type
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'


  }

  
  return config
},error=>{
  return Promise.reject(error)
})

// {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
//response拦截器
axios.interceptors.response.use(response=>{
  // store.dispatch('showLoading',false)
  if (response.status === 200) {
    // if (!response.data.success && (response.data.msg === 'token失效' || response.data.msg === '没有找到token信息')) {

    //   router.replace({path: '/Login'})

    // } else {
    //   return response
    // }
    console.log(response);
    return  response;
  }
},error =>{
  // store.dispatch('showLoading',false)
  return Promise.reject(error) 
})



//GET请求方法
function get(url,params){
  return new Promise((resolve,reject)=>{
    axios.get(url,params).then(res=>{
      resolve(res.data)
    },err =>{
      reject(err)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

//POST请求方法
 function post(url,params){
  return new Promise((resolve,reject)=>{
    // axios.post(url,'data='+JSON.stringify(params)).then(res=>{
    axios.post(url,params).then(res=>{
      resolve(res.data)
    },err =>{
      reject(err)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}



 function post2(url,params){

   var newparams=JSON.parse(JSON.stringify(params))
console.log("POST提交的数据：");
console.log(newparams);
return new Promise((resolve,reject)=>{
  axios({
    method:"post",
    url:url,
    headers:{
        'Content-type': 'application/x-www-form-urlencoded'
    },
    data:newparams,
    transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
}).then((res)=>{
     resolve(res.data)
}).catch((error)=>{
      reject(error)
    })


  })


}





//PUT请求方法
 function put(url,params){
  return new Promise((resolve,reject)=>{
    axios.put(url,'data='+JSON.stringify(params)).then(res=>{
      resolve(res.data)
    },err =>{
      reject(err)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

//DELETE请求方法
 function del(url,params){
  return new Promise((resolve,reject)=>{
    axios.delete(url,{"data":'data='+JSON.stringify(params)}).then(res=>{
      resolve(res.data)
    },err =>{
      reject(err)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}


var uploadurl="https://pt.yxtmart.cn/hxshop/index.php?s=/King/Upload/upload"
var uploadsurl="https://pt.yxtmart.cn/hxshop/index.php?s=/King/Upload/uploads"
var apiroot="https://pt.yxtmart.cn/hxshop"
var editorupload = 'https://pt.yxtmart.cn/hxshop/index.php?s=/King/Upload/editorupload'    // 默认头像
export default{

  get,
  post,
  del,
  post2,
  put,
  apiroot,
  uploadurl,
  uploadsurl,
  editorupload,
}