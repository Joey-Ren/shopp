<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar left-text="返回" left-arrow title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col :span="6">
          <div id="leftNav">
            <ul>
              <li v-for="(item,index) in category" @click="activeClick(index)" :class="{categoryActive:categoryIndex===index}" :key="index">{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
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
          category:[],
          categoryIndex:'',
      }
    },
    mounted() {
      this.getCategoryList()
      let winHeight = document.documentElement.clientHeight
      document.getElementById('leftNav').style.height = winHeight-67+'px'
      
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
            this.category = data.message

            
        }else{
            console.log('数据请求失败');
            
        }
      },
      activeClick(index){
        this.categoryIndex = index
      }
    }

  }

</script>

<style scoped>
#leftNav{
  background-color: aliceblue;
}
#leftNav ul li {
    line-height: 0.8rem;
    border-bottom:1px solid #E4E7ED;
    padding:1px;
    font-size:0.16rem;
    text-align: center;
}
.categoryActive{
    background-color: #fff;
}
</style>
