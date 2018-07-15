<template>
    <VueCoreImageUpload class="btn" crop="local" :cropRatio="cropRatio" :cropBtn="cropBtn" :data="data" :text="text" :isXhr="false" 
      :max-file-size="maxFileSize" :compress="compress" @imagechanged="handlerImageChanged">
    </VueCoreImageUpload>
</template>
<script>
  //2.4.2有bug
  //找到 包目录 vue-core-image-upload/dist/vue-core-image-upload.vue
  //把这个文件用vue-core-image-upload/src/vue-core-image-upload.vue 替换下 就好了
  //但是切割图片时候无法拖动
  //可以使用降低版本使用2.3.10
  //https://github.com/Vanthink-UED/vue-core-image-upload/issues/183
  import VueCoreImageUpload  from 'vue-core-image-upload'
  export default{
    components: {
        VueCoreImageUpload
    },
    props: {
      cropRatio: {
        type: [String],
        default: '1:1',
      },
      text: {
        type: [String],
        default: '上传图片'
      },
      compress: {
        type: [Number],
        default: 50
      },
      maxFileSize: {
        type: [Number],
        default: 10485760 //10M
      }
    },
    data(){
      return {
        cropBtn: {ok:'保存',cancel:'取消'},
        data: {}
      }
    },
    methods: {
      handlerImageChanged(data,files){
        this.$emit('dropImageChanged', data,files)
      }
    }
  }
</script>
<style lang="scss" scoped>
.btn{
  padding: 6px 18px 7px;
  border-radius: 4px;
  color: #409eff;
  border: 1px solid #b3d8ff;
  background-color: #ecf5ff;
}
</style>
