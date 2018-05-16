<template>
  <div class="keditor">
        <quill-editor v-model="mycontent" ref="myQuillEditor"  
            @blur="onEditorBlur($event)"  
            @focus="onEditorFocus($event)"  
            @ready="onEditorReady($event)"  
            @change="onEditorChange($event)"
            :options="editorOption"
             >  
        </quill-editor>  
  </div>
</template>

<script>
import {quillRedefine} from 'vue-quill-editor-upload'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


export default {

  name: 'KEditor',

  data () {
    return {
      mycontent:this.content,
      myactionurl:this.uploadurl
    };
  },

  props:{
        content:{
          type:String
        },
        uploadurl:{
          type:String
        },

    },
   watch: {
        content(val) {
            this.mycontent = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
        },
        mycontent(val){
            //xxcanghai 小小沧海 博客园
          this.$emit("onEditor",val);//③组件内对myResult变更后向外部发送事件通知
        }
    },
  methods:{
     onEditorBlur(quill) {
        console.log('editor blur!', quill)  
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.mycontent = html
      }
   },

    created () {
      this.editorOption = quillRedefine(
        {
          // 图片上传的设置
          uploadConfig: {
            action: this.myactionurl,  // 必填参数 图片上传地址
            accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
            // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
            // 你必须把返回的数据中所包含的图片地址 return 回去
            res: (res) => {
              if(res.code==200){
                return res.data;
              }
             
            },
            name: 'editor'  // 图片上传参数名
          }
        }
      )
      console.log(this.editorOption)
    },
    components:{
      
    }

};
</script>

<style lang="css" scoped>
.quill-editor {
 height: 600px;
 }
</style>