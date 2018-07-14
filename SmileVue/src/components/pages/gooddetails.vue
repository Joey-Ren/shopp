<template>
    <div>
        <div class="navbar-div" sticky>
            <van-nav-bar  title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />

        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" />
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE|money}}元</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL">

                    </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>

        </div>
        <div class="goods-bottom">

            <div>
                <van-button size="large" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  created() {
    this.goodsId = this.$route.params.goodId;
    this.getGoods();
  },
  methods: {
    async getGoods() {
      try {
        let { data, msg, status } = await this.$http.getGoodsInfo({
          goodsId: this.goodsId
        });
        this.goodsInfo = data.message;
      } catch (err) {
        Toast("服务器错误，数据取得失败");
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.detail {
  /* 解决图片间隙问题 */
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
  font-size: 16px;
}
.goods-price {
  background-color: #fff;
  font-size: 16px;
}
 .goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom div {
  flex: 1;
  padding: 5px;
}
</style>