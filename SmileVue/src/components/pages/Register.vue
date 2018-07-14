<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"></van-nav-bar>
    <div class="register-panel">
      <van-field v-model="user.username" label="用户名" :error-message="errorName" icon="clear" placeholder="请输入用户名" required></van-field>
      <van-field v-model="user.passworld" label="密码" :error-message="errorpsd" icon="clear" placeholder="请输入密码" type="password"
        required></van-field>
      <div class="imgs">
        <div v-if="user.picture">
          <img :src="user.picture" v-if="user.picture" title="点击放大" style="border-radius: 4px;margin-right: 20px" width="90">
        </div>

        <span class="red">*</span>
        <label>头像</label>
        <img :src="imgSrc" alt="" v-if="imgSrc">
        <input type="file" name="imgFile" ref="imgFile" @change="imgFileChange">
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
      errorpsd: null,
      imgSrc: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //马上注册按钮
    async registerUser() {
      if (!this.user.username) {
        this.errorName = "请输入用户名";
        return;
      } else {
        this.errorName = null;
      }
      if (!this.user.passworld) {
        this.errorpsd = "请输入密码";
        return;
      } else {
        this.errorpsd = null;
      }
      let params = {
        userName: this.user.username,
        password: this.user.passworld
      };
      this.openLoading = true;
      // let {data} =  this.$http.register(params)

      try {
        let { data: { code, msg } } = await this.$http.register(params);
        if (code == 200) {
          this.$toast.success(msg);
          this.$router.push({
            name: "login"
          });
        } else {
          this.$toast.fail("注册失败");
        }
        this.openLoading = false;
      } catch (err) {
        this.openLoading = false;
        this.$toast.fail("注册失败");
      }
    },
    imgFileChange() {
      let file = this.$refs.imgFile.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = res => {
        this.imgSrc = res.target.result;
        this.putb64(res.target.result.split('data:image/jpeg;base64,')[1],`images/${file.name}`)
      };
    },
    putb64(base64Path,fileName) {
      var pic = base64Path;
      let fName = this.$base64.encode(fileName)
      var url = "http://upload.qiniup.com/putb64/-1/key/"+fName; //非华东空间需要根据注意事项 1 修改上传域名
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.setRequestHeader(
        "Authorization",
        "UpToken EJSMfaW17JqEKSXvq3qnwBGrL3udouIqBlRl5Xpy:cSZeIR93wQ65sCEsk5evxRyXMyc=:eyJzY29wZSI6ImltYWdlcyIsImRlYWRsaW5lIjoxNTMxNTYzMTY3fQ=="
      );
      xhr.send(pic);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          console.log(xhr.responseText);
        }
      };
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
