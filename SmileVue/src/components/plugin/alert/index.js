import alerts from './alert'

let alert = {

}
alert.install = (Vue, option) => {
  var $vm
  Vue.component('alert', alerts)
  Vue.prototype.alertShow = function (options = {}) {
    var confi = Vue.extend(alerts)
    if (!$vm) {
      $vm = new confi({
        el: document.createElement('div')
      })
    }
    document.body.appendChild($vm.$el)
    $vm.init(options)
  }
  //不使用vuex的情况下，非父子组件增加全局的Event bus,使得$on,$emit可以使用
  const EventBus = new Vue() //Eventbus
  //添加到全局的 Vue 对象
  Object.defineProperties(Vue.prototype, {
    $bus: {
      get: function () {
        return EventBus
      }
    }
  })
}


export default alert


/**第一种使用方法：以插件的形式使用
 *  this.alertShow({
      info: "dfjsaofjdsaofdsa",
      time: 50000,
      show_button: true
    });
    /**alertShow方法调用参数
         * info  //提醒文字     默认是'弹窗提示'
         * time  //弹窗消失时间  默认3000毫秒
         * show_button //是否需要按钮 默认false 布尔值
         */

/**第二种使用方法:以组件的形式使用
 *  <!-- <alert :message="m" :date="tt" :showbutton="true"></alert> -->
 * props: ["message", "date","showbutton"],
 * message  //提醒文字     默认是'弹窗提示'
 * date  //弹窗消失时间  默认3000毫秒
 * showbutton //是否需要按钮 默认false 布尔值
 */

/**
 * 非父子通信$emit $on
 */
