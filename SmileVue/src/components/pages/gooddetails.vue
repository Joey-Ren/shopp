<template>
    <div>
        <myalert :showAlert='t'></myalert>
       <button @click="bb"> 我是商品详情路由</button>
        <div>商品id是:{{goodId}}</div>
        <router-link to="/">返回首屏</router-link>
        <div>
            computed{{gm}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'gooddetails',
  data() {
    return {
        goodId:'',
        cm:1,
        t:true
    };
  },
  mounted(){
      this.goodId = this.$route.params.goodId
  },
  methods:{
      bb(){
          console.log('dfaafdd');
          
          this.alertShow()
           this.gm = 8   //设置computed计算属性的set的方法
      }
  },
  computed:{
      gm:{
          get:function(){
            
              return this.cm = `我是${this.cm}`
          },
          set:function(val){
              console.log(val,'val')
             this.cm = val
          }
      }
  }
};
</script>

<style scoped>

</style>