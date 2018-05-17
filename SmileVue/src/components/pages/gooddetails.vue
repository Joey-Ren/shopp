<template>
    <div>
        <alert></alert>
        我是商品详情路由
        <div>商品id是:{{goodId}}</div>
        <router-link to="/">返回首屏</router-link>
    </div>
</template>

<script>
export default {
  name: 'gooddetails',
  data() {
    return {
        goodId:'',
    };
  },
  mounted(){
      this.goodId = this.$route.params.goodId
  }
};
</script>

<style scoped>

</style>