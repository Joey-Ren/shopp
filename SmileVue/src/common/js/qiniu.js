var Base64 = require('js-base64').Base64;

function install(Vue) {

  Vue.prototype.$qiniu64 =function (base64Path, fileName)  {
      var _this = this
    var pic = base64Path.split("data:image/jpeg;base64,")[1];
    if (fileName) {
      let fName = Base64.encode(fileName);
      var url = "http://upload.qiniup.com/putb64/-1/key/" + fName; //非华东空间需要根据注意事项 1 修改上传域名
    } else {
      var url = "http://upload.qiniup.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader(
      "Authorization",
      "UpToken EJSMfaW17JqEKSXvq3qnwBGrL3udouIqBlRl5Xpy:MT2bOmAZCnGV_lfXdSZ_LyhR0aA=:eyJzY29wZSI6ImltYWdlcyIsImRlYWRsaW5lIjoxNTMxNjI4MjQ4fQ=="
    );
    xhr.setRequestHeader(
      "Authorization",
      "UpToken 你的七牛云token"
    );
    xhr.send(pic);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        _this.$Bus.$emit('complete',JSON.parse(xhr.responseText))
      }
    };
  }
  //不使用vuex的情况下，非父子组件增加全局的Event bus,使得$on,$emit可以使用
  const EventBus = new Vue() //Eventbus
  //添加到全局的 Vue 对象
  Object.defineProperties(Vue.prototype, {
    $Bus: {
      get: function () {
        return EventBus
      }
    }
  })
}

export default install
