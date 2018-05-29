<template>
  <transition name="fade">
    <div class="myalert" v-show="isalert">
      <div class="myalert-mask" @click="hide"></div>
      <div class="myalert-content">
        <p>{{msg}}</p>
        <div v-show="showBtn" class="btn">
          <button class="left" @click="success">确定</button>
          <button class="right">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["message", "date", "showbutton",'showAlert'],
  data() {
    return {
      timer: null, //定时器timer
      isalert: this.showAlert||false, //是否显示弹窗布尔值  默认不显示
      alertTime: this.date || 3000, //弹窗默认显示时间
      msg: this.message || "弹窗消息", //弹窗默认显示的消息,
      showBtn: this.showbutton || false //按钮默认是不显示
    };
  },

  mounted() {
    var that = this;
    clearTimeout(that.timer);
    that.timer = setTimeout(() => {
      that.isalert = false;
    }, that.alertTime);
  },
  methods: {
    init(option) {
      /**props参数
       * props: ["message", "date","showbutton"],
       * message  //提醒文字     默认是'弹窗提示'
       * date  //弹窗消失时间  默认3000毫秒
       * showbutton //是否需要按钮 默认false 布尔值
       */
      /**alertShow方法调用参数
       * info  //提醒文字     默认是'弹窗提示'
       * time  //弹窗消失时间  默认3000毫秒
       * show_button //是否需要按钮 默认false 布尔值
       */
      /**
       * 非父子通信$emit $on
       */

      var that = this;
      if (option.info) {
        that.msg = option.info;
      }
      that.isalert = true;
      clearTimeout(that.timer);
      that.showBtn = option.show_button;
      that.timer = setTimeout(() => {
        that.isalert = false;
      }, option.time || that.alertTime);
    },
    hide() {
      this.isalert = false;
      clearTimeout(this.timer);
    },
    success() {
      console.log("chengg");
      //"test"是自定义事件名称==需要跟$on中声明的自定义名称一样，succeees是传递给$emit的参数
      this.$bus.$emit("test", "succeees");
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.myalert {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
.myalert-mask {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr=#33000000,
      endColorstr=#33000000
    );
  width: 100%;
  height: 100%;
  z-index: 100;
}
.myalert-content {
  padding: 0 10px 0 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  background-color: #4a4a4a;
  color: #fff;
  text-align: center;
  z-index: 120;
}
.myalert-content p {
  word-break: break-all;
}
.btn {
  margin-bottom: 10px;
}
.btn button {
  border-radius: 5px;
}
.btn .left {
  margin-right: 10px;
}
.btn .right {
  margin-left: 10px;
}
</style>
