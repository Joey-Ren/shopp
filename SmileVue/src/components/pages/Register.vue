<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack"></van-nav-bar>
    <div class="register-panel">
      <van-field v-model="user.username" label="用户名" :error-message="errorName" icon="clear" placeholder="请输入用户名" required></van-field>
      <van-field v-model="user.passworld" label="密码" :error-message="errorpsd" icon="clear" placeholder="请输入密码" type="password" required></van-field>
      <div class="imgs">
        <div v-if="user.picture">
          <img :src="user.picture" v-if="user.picture" title="点击放大" style="border-radius: 4px;margin-right: 20px" width="90">
        </div>

        <span class="red">*</span>
        <label>头像</label>
        <viewer :images="imgSrc" style="display:inline-block">
          <img :src="src" v-for="(src,index) in imgSrc" :key="index" v-if="src" title="点击放大" style="border-radius: 4px;margin-right: 20px;" width="90" height="90">
        </viewer>
        <CropImage text="选择图片" cropRatio="4:3" style="width: 58px;padding: 0 15px;display:inline-block;" @dropImageChanged="dropImageChanged"></CropImage>
        <!-- <input type="file" name="imgFile" ref="imgFile" @change="imgFileChange"> -->
      </div>
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerUser" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import CropImage from "@/common/corp/CropImage";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component";
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
      imgSrc: []
    };
  },
  created () {
    this.$Bus.$on('complete',this.qiniuUpComplete)
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
    dropImageChanged(base64Path,files) {
      this.imgSrc.push(base64Path);
      //封装的七牛云使用方法
      this.$qiniu64(base64Path,files[0].name)
    },
    //封装的七牛云插件回调
    qiniuUpComplete(data){
     let httpImgSrc = `http://pah1tfvgs.bkt.clouddn.com/${data.key}` 
      this.$set(this.imgSrc,this.imgSrc.length-1,httpImgSrc)
      
    }
    // imgFileChange() {
    //   let file = this.$refs.imgFile.files[0];
    //   let fileReader = new FileReader();
    //   fileReader.readAsDataURL(file);
    //   fileReader.onload = res => {
    //     //this.$set(this.imgSrc,0,res.target.result) //上传一张图片
    //     this.imgSrc.push(res.target.result); //上传多张图片
    //     this.putb64(
    //       res.target.result.split("data:image/jpeg;base64,")[1],
    //       `images/${file.name}`
    //     );
    //   };
    // },
   
  },
  components: { Viewer, CropImage }
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
