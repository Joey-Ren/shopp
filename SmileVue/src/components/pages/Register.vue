<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"></van-nav-bar>
    <div class="register-panel">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required></van-field>
      <van-field v-model="passworld" label="密码" icon="clear" placeholder="请输入密码" type="passworld" required></van-field>
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
        username: null,
        passworld: null,
        openLoading:false
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      //马上注册按钮
      async registerUser() {

        if (!this.username) {
          this.$toast.fail('请输入用户名')
          return
        }
        if (!this.passworld) {
          this.$toast.fail('请输入密码')
          return
        }
        let params = {
          userName: this.username,
          passworld: this.passworld
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



      }
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

</style>
