(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f7208ca"],{"7bca":function(t,s,i){},8224:function(t,s,i){"use strict";i("7bca")},a8bf:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"address"},[i("div",{staticClass:"address-top"},[i("div",{staticClass:"address-top-box",on:{click:t.back}},[i("i",{staticClass:"iconfont icon-fanhui"})]),i("div",{staticClass:"address-top-box"},[t._v("地址管理")])]),i("div",{staticClass:"address-box"}),t._l(t.addresist,(function(s,a){return i("div",{key:a,staticClass:"address-lsit"},[i("div",{staticClass:"lsit-text"},[i("div",{staticClass:"item-text"},[t._v(" 收货人："+t._s(s.real_name)+" ")]),i("div",{staticClass:"item-text"},[t._v(" 电话号码："+t._s(s.phone)+" ")]),i("div",{staticClass:"item-mon"},[t._v("收货地址："+t._s(s.province+s.city+s.district))])]),i("div",{staticClass:"del",on:{click:function(i){return t.del(s.id)}}},[t._v("删除")])])}))],2)},e=[],n={name:"address",data:function(){return{addresist:[]}},methods:{back:function(){this.$router.go(-1)},del:function(t){this.$http.post("/api/address/del",{id:t}).then((function(t){console.log(t),window.location.reload()}))}},mounted:function(){var t=this;this.$http.get("/api/address/list?page=1&limit=20").then((function(s){console.log(s),t.addresist=s.data.data}))}},d=n,c=(i("8224"),i("2877")),o=Object(c["a"])(d,a,e,!1,null,"bb92186a",null);s["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2f7208ca.c8294e9d.js.map