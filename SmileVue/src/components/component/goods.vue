<template>
  <div class="goods">
    <div class="goodTitle">热卖商品</div>
    <van-list>
      <div class="goodContent">
        <div v-for="(item,index) in allGoods" :key="index">
          <router-link :to="{'name':'gooddetails',params:{goodId:item.goodsId}}">
            <img v-lazy="item.image" alt="">
            <p :title="item.name">{{item.name}}</p>
            <p>{{item.price|money}}</p>
          </router-link>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["hotGoods"],
  data() {
    return {
    
    };
  },
  watch: {
    hotGoods: function(newVal, oldVal) {
     // this.allGoods = newVal;
    },
    deep: true,
    immediate: true
  },
  computed: {
   allGoods:function (){
     return this.hotGoods
   }
  },
  methods: {
  
  }
};
</script>

<style scoped lang="scss">
@function pxRem($px) {
  @return $px/16 + rem;
}

.goodTitle {
  text-align: center;
  line-height: pxRem(30);
  width: 100%;
  color: #e5017d;
}
.goodContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: center;
    width: 49%;
    margin-bottom: pxRem(5);
    padding-bottom: pxRem(5);

    a {
      width: 100%;
      height: 100%;
      font-size: 14px;
      display: block;
      img {
        width: 100%;
        height: 80%;
      }
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  div:nth-child(odd) {
    margin-right: 1%;
  }
  div:nth-child(even) {
    margin-left: 1%;
  }
}
</style>