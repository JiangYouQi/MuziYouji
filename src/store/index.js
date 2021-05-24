import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    token:null,
    userInfo:null
  },
  getters:{
    // 获取token
    token(state){
      //获取 vuex里面token如果这个为空 就去 localStorage取
      let token=state.token;
      if(!token){
        token=localStorage.getItem('token');
      }
      return token;
    },
    //获取登录用户信息
    userInfo(state){
      //获取 vuex里面token如果这个为空 就去 localStorage取
      let token=state.userInfo;
      if(!token){
        token=JSON.parse(localStorage.getItem('userInfo'));
      }
      return token;
    },
  },
  mutations: {
    login(state,payload){//登录存储token数据
      state.token=payload;
      localStorage.setItem('token',payload); // 把登录token存入 localStorage
      document.cookie="token="+payload // 把登录token存入 cookie
    },
    setUser(state,payload){ // 设置用户信息
      state.userInfo=payload;
    },
    loginOut(state){ // 退出登录
      state.token=null; // 清除 token
      state.userInfo=null; // 请除用户信息
      localStorage.removeItem('userInfo'); // 移除localSrorage中的用户信息
      localStorage.removeItem('token'); // 移除localStorage中的token
      document.cookie='token=""'; // 移除token 中的用户信息
    }
    
  },
  actions: { // 一些异步操作可以放到 actions 里面
    getLoginUser(contenxt,payload){
      // console.log('payload=>',payload);
      axios({
        method:"get",
        url:"http://47.115.51.185/api/userinfo",
        headers:{
          'Authori-zation':'Bearer '+payload
        }
      }).then(res=>{
        contenxt.commit('setUser',res.data.data);
        localStorage.setItem('userInfo',JSON.stringify(res.data.data));
        // console.log('获取信息==>',res);
      })
    }
  },
  modules: {
  }
})
export default store
