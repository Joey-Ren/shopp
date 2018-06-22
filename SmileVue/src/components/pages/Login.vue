<template>
  <div class="register">
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click="goBack"></van-nav-bar>
    <div class="register-panel">
      <van-field v-model="user.username" label="用户名" :error-message="errorName" icon="clear" placeholder="请输入用户名" required></van-field>
      <van-field v-model="user.passworld" label="密码" :error-message="errorpsd" icon="clear" placeholder="请输入密码" type="password" required></van-field>
      <div class="imgs">
        <div v-if="user.picture">
          <img :src="user.picture" v-if="user.picture" title="点击放大" style="border-radius: 4px;margin-right: 20px" width="90">
        </div>

        <span class="red">*</span>
        <label>头像</label>
        <van-uploader :after-read="onRead">
          <van-icon name="photograph" />
        </van-uploader>
      </div>
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerUser" :loading="openLoading">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        passworld: "",
        picture: ""
      },
      openLoading: false,
      errorName: null,
      errorpsd: null
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.$toast.success("你已登录");
      this.$router.push({
        name: "ShoppingMall"
      });
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //马上注册按钮
    async registerUser() {
      this.yz() && this.re();
    },
    onRead(file) {
      this.user.picture = file.content;
    },
    yz() {
      let isOk = true;
      if (this.user.username.length < 5) {
        this.errorName = "用户名不能小于5位";
        isOk = false;
      } else {
        this.errorName = null;
      }
      if (this.user.passworld.length < 6) {
        this.errorpsd = "密码不能小于6位";
        isOk = false;
      } else {
        this.errorpsd = null;
      }
      return isOk;
    },
    async re() {
      let params = {
        userName: this.user.username,
        password: this.user.passworld
      };
      this.openLoading = true;
      try {
        let { data: { code, message, res } } = await this.$http.login(params);
        if (code == 200 && message) {
          new Promise((resolve, reject) => {
            localStorage.setItem("user", JSON.stringify(res));
            setTimeout(() => {
              resolve();
            }, 500);
          }).then(() => {
            this.$router.push({
              name: "ShoppingMall"
            });
          }).catch((err)=>{
              this.$toast.fail('登录状态保存失败')
          });
        } else {
          this.$toast.fail("登录失败");
        }
        this.openLoading = false;
      } catch (err) {
        this.openLoading = false;
        this.$toast.fail("登录失败");
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.register {
  height: 100%;
}

.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}

.register-button {
  padding-top: 10px;
}

.imgs {
  font-size: 14px;
  color: #333;
}
</style>
