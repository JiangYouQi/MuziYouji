import Vue from 'vue';
import axios from "axios";
import store from "../store/index"
console.log('pppp');
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL:"http://musicapi.leanapp.cn/",
  baseURL: 'http://47.115.51.185/',
  timeout: 60 * 1000
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    if (store.getters.token) {
      config.headers = {
        'Authori-zation': 'Bearer ' + store.getters.token
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 得到返回结果之后的后置处理
// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // return response.data.result;
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  // Object.defineProperty(Obj,'',{get(){}})
  // 给Vue原型对象添加属性
  Object.defineProperties(Vue.prototype, {
    axios:{
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
    $http: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin)

export default Plugin;
