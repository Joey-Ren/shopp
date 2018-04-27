<template>
  <div>
    <!-- 搜索 -->
    <div class="searchBar">
      <van-row gutter="10">
        <van-col span="3"><img :src="searchMap" alt="地图icon" class="searchMap"></van-col>
        <van-col span="16" class="searchsss"><input type="text" placeholder="查找" class="searchInput"></van-col>
        <van-col span="5"><van-button size="mini">搜索</van-button></van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swipe">
     <van-swipe :autoplay="swipeDate">
        <van-swipe-item  v-for="(imgs,index) in swipeImages" :key="index">
          <img v-lazy="imgs.imgUrl" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
   <div class="categorys">
    <div class="cat" v-for="(item,index) in categorys" :key="index">
     
      <span :style="{backgroundColor: item.color }">
        <img :src="item.imgs" alt="">
      </span>
      
      <p>{{item.name}}</p>
    </div>
  
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "我是shopmailvue",
      searchMap: require("../../assets/images/searchMap.png"),
      swipeDate: 3000, //图片自动轮播时间间隔
      // swipeImages: [
      //   {
      //     imgUrl: "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg"
      //   },
      //   {
      //     imgUrl: "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg"
      //   },
      //   {
      //     imgUrl: "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg"
      //   }
      // ]
      swipeImages: [
        {
          imgUrl: require("../../assets/images/simleVueDemoPic001.jpg")
        },
        {
          imgUrl: require("../../assets/images/simleVueDemoPic002.jpg")
        },
        {
          imgUrl: require("../../assets/images/simleVueDemoPic003.jpg")
        }
      ],
      categorys: [
        {
          name: "新鲜水果",
          imgs: require("../../assets/images/shuiguo.png"),
          color: "#FECC00"
        },
        {
          name: "中外名酒",
          imgs: require("../../assets/images/pijiu.png"),
          color: "#F2750A"
        },
        {
          name: "营养奶品",
          imgs: require("../../assets/images/niunai.png"),
          color:'#6EC8DF'
        },
        {
          name: "食品饮料",
          imgs: require("../../assets/images/yinliao.png"),
          color:'#CE3B15'
        },
        {
          name: "个人护理",
          imgs: require("../../assets/images/huli.png"),
          color:'#DBE369'
        }
      ]
    };
  },
  mounted() {
    this.$http.goods().then((res)=>{
      console.log(res);
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }
};
</script>

<style scoped lang="scss">
@function pxRem($px) {
  @return $px/16+rem;
}
.searchBar {
  height: pxRem(44);
  background-color: #e501ad;
  line-height: pxRem(44);
  overflow: hidden;
  .searchMap {
    width: pxRem(20);
    height: pxRem(20);
    margin-left: pxRem(15);
    margin-top: pxRem(12);
  }
  .searchInput {
    height: pxRem(30);
    width: 100%;
    padding-left: pxRem(10);
    line-height: pxRem(30);
    border: none;
    border-bottom: pxRem(1) solid black;
    background-color: #e501ad;
    color: #fff;
    border-radius: 0;
  }
}
.swipe {
  width: 100%;
  clear: both;
  img {
    width: 100%;
    max-height: pxRem(165);
    vertical-align: bottom;
  }
}
.categorys {
  height: pxRem(80);
  background-color: #fff;
  padding-top: pxRem(12);
  padding-bottom: pxRem(6);
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  span {
    display: block;
    width: pxRem(50);
    height: pxRem(45);
   
    border-radius: pxRem(10);
    line-height: pxRem(72);
    margin-bottom: pxRem(3);
    img {
      width: 80%;
      height: 80%;
    }
  }
}
.blue1 {
  width: 15%;

  background-color: blue;
}
.blue2 {
  width: 15%;

  background-color: palegreen;
}
.blue3 {
  width: 15%;

  background-color: salmon;
}
.blue4 {
  width: 15%;

  background-color: aqua;
}
</style>
