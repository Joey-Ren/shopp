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
              <li v-for="(item,index) in category" @click="activeClick(index,item.ID)" :class="{categoryActive:categoryIndex===index}" :key="index">{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col :span="18">
          <div class="tabCategorySub">
            <van-tabs @click="sub" v-model="active">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" v-for="item in list" :key="item">
                  {{item}}
                </div>
              </van-list>
            </van-pull-refresh>
          </div>

        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: [], //保存大类类别
      categoryIndex: "",
      paramsId: {
        categoryId: "" //保存大类id
      },
      categorySub: [], //保存小类类别
      active: "",
      list: [],
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      isRefresh: false //下拉加载
    };
  },
  mounted() {
    this.getCategoryList();
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 67 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 + "px";
  },
  methods: {
    //获取大类别列表
    async getCategoryList() {
      let { data, msg, status } = await this.$http.getCategoryList();
      if (data.code == 200) {
        console.log("数据请求成功");
        this.category = data.message;
        this.paramsId.categoryId = this.category[0].ID;
        this.getCategorySubList();
      } else {
        console.log("数据请求失败");
      }
    },
    activeClick(index, id) {
      this.categoryIndex = index;
      this.paramsId.categoryId = id;
      this.getCategorySubList();
    },
    //根据大类别id获取小类别
    async getCategorySubList() {
      let { data, status, msg } = await this.$http.getCategorySubList(
        this.paramsId
      );
      this.categorySub = data.message;
    },
    //点击小类触发事件
    sub(id, title) {},
    //上拉加载
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    //下拉加载
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.list = [];
        this.onLoad();
      }, 500);
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 0.8rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 1px;
  font-size: 0.16rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
</style>
