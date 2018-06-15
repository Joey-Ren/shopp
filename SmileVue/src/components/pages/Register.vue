<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"></van-nav-bar>
    <div class="register-panel">
      <van-field v-model="user.username" label="用户名" :error-message="errorName" icon="clear" placeholder="请输入用户名" required></van-field>
      <van-field v-model="user.passworld" label="密码" :error-message="errorpsd" icon="clear" placeholder="请输入密码" type="passworld"
        required></van-field>
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
        <van-button type="primary" size="large" @click="registerUser" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          username: null,
          passworld: null,
          picture: null
        },
        openLoading: false,
        errorName: null,
        errorpsd: null
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      //马上注册按钮
      async registerUser() {

        if (!this.user.username) {
          this.errorName = '请输入用户名'
          return
        } else {
          this.errorName = null
        }
        if (!this.user.passworld) {
          this.errorpsd = '请输入密码'
          return
        } else {
          this.errorpsd = null
        }
        let params = {
          userName: this.user.username,
          passworld: this.user.passworld
        }
        this.openLoading = true
        // let {data} =  this.$http.register(params)

        try {
          let {
            data: {
              code,
              msg
            }
          } = await this.$http.register(params)
          if (code == 200) {
            this.$toast.success(msg)
          } else {
            this.$toast.fail('注册失败')
          }
          this.openLoading = false
        } catch (err) {
          this.openLoading = false
          this.$toast.fail('注册失败')
        }



      },
      onRead(file) {
        this.user.picture = file.content

      }

    },
    components: {
   
    }

  }

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
