<template>
  <div>
    <!-- 搜索 -->
    <div class="searchBar">
      <van-row gutter="10">
        <van-col span="3"><img :src="searchMap" alt="地图icon" class="searchMap"></van-col>
        <van-col span="16" class="searchsss"><input type="text" placeholder="查找" class="searchInput"></van-col>
        <van-col span="5">
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe :autoplay="swipeDate">

        <van-swipe-item v-for="(imgs,index) in swipeImages" :key="index">
          <router-link :to="{'name':'gooddetails',params:{goodId:imgs.goodsId}}">
            <img v-lazy="imgs.image" alt="">

          </router-link>

        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
    <div class="categorys">
      <div v-for="(item,index) in categorys" :key="index">
        <router-link to="/gooddetails">
          <img v-lazy="item.image" alt="">
          <span>{{item.mallCategoryName}}</span>
        </router-link>

      </div>

    </div>
    <!-- 提示广告 -->
    <div class="tis">
      <img v-lazy="advertesPicture.PICTURE_ADDRESS" alt="">
    </div>
    <!-- 商品推荐 -->
    <div class="recommend">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommends" :key="index">
            <div class="recommend-item">
              <router-link :to="{'name':'gooddetails',params:{goodId:item.goodsId}}">
                <img v-lazy="item.image" />
                <div :title="item.goodsName">{{item.goodsName}}</div>
                <div>{{item.price|money}} ({{item.mallPrice|money}})</div>
              </router-link>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 商品楼层 -->
    <floor :floorData="floors"></floor>
    <!-- 热卖商品goods -->
    <goods :hotGoods="goods"></goods>
  </div>
</template>

<script>
import floor from "../component/floor";
import goods from "../component/goods";
export default {
  name: "shoppingMall",
  data() {
    return {
      msg: "我是shopmailvue",
      searchMap: require("../../assets/images/searchMap.png"),
      swipeDate: 3000, //图片自动轮播时间间隔
      swipeImages: [], //轮播图
      categorys: [], //分类
      advertesPicture: "", //提示广告
      recommends: [], //商品推荐
      floors: [], //楼层内容,
      goods: [], //热卖商品
      swiperOption: {
        slidesPerView: 3,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
    };
  },
  components: {
    floor,
    goods
  },
  mounted() {
    this.$http
      .goods()
      .then(res => {
        this.swipeImages = res.data.slides; //轮播图
        this.categorys = res.data.category; //分类信息
        this.advertesPicture = res.data.advertesPicture; //提示广告
        this.recommends = res.data.recommend; //商品推荐
        this.floorName = res.data.floorName; //楼层数据
        this.goods = res.data.hotGoods; //热卖商品
        console.log(res.data, "dataaaaaaaaa-=====");
        for (const key in this.floorName) {
          this.floors.push({
            floorName: this.floorName[key],
            floor: res.data[key]
          });
        }
        console.log(this.floors);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="scss">
@function pxRem($px) {
  @return $px/16 + rem;
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
  margin: 0.3rem 0.3rem 0.3rem 0.3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 13px;
  background-color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  div {
    padding: 0.3rem;
    img {
      width: 90%;
    }
  }
}
.tis {
  text-align: center;
  img {
    width: 100%;
  }
}
//商品推荐
.recommend {
  background-color: #fff;
  margin-top: 0.3rem;

  .recommend-title {
    color: #e5017d;
    padding: 0.3rem;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
    .recommend-item {
      text-align: center;
      font-size: 14px;
      margin-bottom: 0.3rem;
      img {
        width: 80%;
      }
      div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
