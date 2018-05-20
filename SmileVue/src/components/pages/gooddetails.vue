<template>
    <div>
        <alert></alert>
       <button @click="bb"> 我是商品详情路由</button>
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
  },
  methods:{
      bb(){
          console.log('dfaafdd');
          
          this.alertShow()
      }
  }
};
</script>

<style scoped>

</style>