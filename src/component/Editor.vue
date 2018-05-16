<template>
    <div>
        <div ref="editor" style="text-align:left"> </div>
       
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      props:{
         content:{
          type:Object,
        },
      },
      mounted() {
        var editor = new E(this.$refs.editor);
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          this.content.content=html
        }
        editor.create()
        console.log(1111);
        this.editorContent=this.content.content;
        editor.txt.html(this.content.content);
      }
    }
</script>

<style scoped>
</style>
