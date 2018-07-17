<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar left-text="返回" left-arrow title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col :span="6">
          左侧导航
        </van-col>
        <van-col :span="18">
          右侧导航
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          category:[]
      }
    },
    mounted() {
      this.getCategoryList()
    },
    methods: {
      async getCategoryList() {
        let {
          data,
          msg,
          status
        } = await this.$http.getCategoryList()
        if(data.code==200){
            console.log('数据请求成功');
            this.category = data.data
            
        }else{
            console.log('数据请求失败');
            
        }
      }
    }

  }

</script>

<style scoped>


</style>
