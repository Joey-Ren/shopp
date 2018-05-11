<template>
    <div>
        <div class="floor" v-for="(floor,index) in floorData" :key="index">
            <p>
                <span>{{index+1}}F</span> {{floor.floorName}}</p>
            <div class="floord">
                <div class="floord-h">
                    <div class="f-left">
                        <router-link :to="{'name':'gooddetails',params:{goodId:floor.floor[0].goodsId}}">
                            <img v-lazy="floor.floor[0].image" alt="">
                        </router-link>
                    </div>
                    <div class="f-right">
                        <div>
                            <router-link :to="{'name':'gooddetails',params:{goodId:floor.floor[1].goodsId}}">
                                <img v-lazy="floor.floor[1].image" alt="">
                            </router-link>

                        </div>
                        <div>
                            <router-link :to="{'name':'gooddetails',params:{goodId:floor.floor[2].goodsId}}">
                                <img v-lazy="floor.floor[2].image" alt="">
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="floord-b">
                    <div v-for="(floo,index) in floor.floor.slice(3)" :key="index">
                        <router-link :to="{'name':'gooddetails',params:{goodId:floo.goodsId}}">
                            <img v-lazy="floo.image" alt="">
                        </router-link>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
  props: ["floorData"],
  data() {
    return {
        floor:[]
    };
  },
  watch: {
    floorData: function(newV,oldV) {
        /*监听父组件传递来的数据floorData
        this.floor = newV
        * */
    }
  }
};
</script>

<style scoped lang="scss">
@function pxRem($px) {
  @return $px/16+rem;
}
.floor {
  p {
    text-align: center;
    color: #e5017d;
    margin: 5px 0;
    font-size: 14px;
    span {
      display: inline-block;
      width: 25px;
      height: 25px;
      color: #fff;
      border-radius: 50%;
      background-color: red;
      line-height: 25px;
    }
  }
  .floord-b {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    div {
      border: 1px solid #eee;
      width: 50%;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
  }
}
.floord-h {
  display: flex;
  flex-direction: row;
}
.f-left {
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  background-color: #fff;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}
.f-right {
  div {
    border-bottom: 1px solid #eee;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>