//在vue的src目录下建立api文件夹,在api文件夹下建立api.js
//api.js中写
import axios from 'axios';
import qs from 'qs'
import store from '../store'
import config from '../config'
axios.interceptors.request.use(config => {
  // store.dispatch('showLoading', true)
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  // store.dispatch('hideLoading',false)
  return response
}, error => {
  return Promise.reject(error)
})

const _ajax = (type, url, data) => {
  let Public = { //公共参数  
    'srAppid': ""
  }

  let httpDefaultOpts = { //axios的配置项---可以添加更多的配置  
    method: type,
    url: config.baseUrl + url,
    params: qs.stringify(data),
    data: qs.stringify(data),
  }

  //判断是get还是post,从而删除httpDefaultOpts中的params或者data中的一个,从而符合axios的配置项
  if (type == 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {

        if (res.status == '200') {
          resolve(qs.parse(res))
        } else {
          reject({
            'err': '状态码不是200'
          })
        }
      }
    ).catch(
      (err) => {
        store.dispatch('hideLoading', false)
        console.log('ajax请求出错', err);
        reject(qs.parse({
          "err": "ajax请求出错"
        }))
      }
    )

  })
  return promise
}


var fetch = (function () {
  var get = function (url, data) {
    return _ajax('get', url, data)
  }
  var post = function (url, data) {
    return _ajax('post', url, data)
  }
  return {
    get: get,
    post: post
  }
})()



export default {
  goods: function (data) {
    return axios.get("https://www.easy-mock.com/mock/5ae26ea500247c2aa1efe478/shopp/api/floor", data)
  },
  //用户注册接口
  register(data) {
    return fetch.post('/user/register', data)
  },
  //用户登录接口
  login(data){
      return fetch.post('/user/login',data)
  },
  //获取商品详情
  getGoodsInfo(data){
      return fetch.post('/good/getDetailGoodsInfo',data)
  },
  //读取大类别列表
  getCategoryList(data){
      return fetch.get(`/good/getCategoryList`,data)
  },
  //根据大类别id来读取小类别
  getCategorySubList(data){
      return fetch.post(`/good/getCategorySubList`,data)
  }
}
