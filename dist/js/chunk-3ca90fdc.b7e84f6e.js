(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ca90fdc"],{1276:function(t,n,e){"use strict";var i=e("d784"),o=e("44e7"),r=e("825a"),a=e("1d80"),s=e("4840"),c=e("8aa5"),u=e("50c4"),l=e("14c3"),d=e("9263"),p=e("d039"),f=[].push,v=Math.min,g=4294967295,h=!p((function(){return!RegExp(g,"y")}));i("split",2,(function(t,n,e){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,e){var i=String(a(this)),r=void 0===e?g:e>>>0;if(0===r)return[];if(void 0===t)return[i];if(!o(t))return n.call(i,t,r);var s,c,u,l=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,h=new RegExp(t.source,p+"g");while(s=d.call(h,i)){if(c=h.lastIndex,c>v&&(l.push(i.slice(v,s.index)),s.length>1&&s.index<i.length&&f.apply(l,s.slice(1)),u=s[0].length,v=c,l.length>=r))break;h.lastIndex===s.index&&h.lastIndex++}return v===i.length?!u&&h.test("")||l.push(""):l.push(i.slice(v)),l.length>r?l.slice(0,r):l}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,e){var o=a(this),r=void 0==n?void 0:n[t];return void 0!==r?r.call(n,o,e):i.call(String(o),n,e)},function(t,o){var a=e(i,t,this,o,i!==n);if(a.done)return a.value;var d=r(t),p=String(this),f=s(d,RegExp),_=d.unicode,m=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(h?"y":"g"),x=new f(h?d:"^(?:"+d.source+")",m),b=void 0===o?g:o>>>0;if(0===b)return[];if(0===p.length)return null===l(x,p)?[p]:[];var C=0,k=0,y=[];while(k<p.length){x.lastIndex=h?k:0;var w,E=l(x,h?p:p.slice(k));if(null===E||(w=v(u(x.lastIndex+(h?0:k)),p.length))===C)k=c(p,k,_);else{if(y.push(p.slice(C,k)),y.length===b)return y;for(var R=1;R<=E.length-1;R++)if(y.push(E[R]),y.length===b)return y;k=C=w}}return y.push(p.slice(C)),y}]}),!h)},"14c3":function(t,n,e){var i=e("c6b6"),o=e("9263");t.exports=function(t,n){var e=t.exec;if("function"===typeof e){var r=e.call(t,n);if("object"!==typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==i(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,n)}},"1dde":function(t,n,e){var i=e("d039"),o=e("b622"),r=e("2d00"),a=o("species");t.exports=function(t){return r>=51||!i((function(){var n=[],e=n.constructor={};return e[a]=function(){return{foo:1}},1!==n[t](Boolean).foo}))}},"44e7":function(t,n,e){var i=e("861d"),o=e("c6b6"),r=e("b622"),a=r("match");t.exports=function(t){var n;return i(t)&&(void 0!==(n=t[a])?!!n:"RegExp"==o(t))}},"65f0":function(t,n,e){var i=e("861d"),o=e("e8b5"),r=e("b622"),a=r("species");t.exports=function(t,n){var e;return o(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)?i(e)&&(e=e[a],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===n?0:n)}},8418:function(t,n,e){"use strict";var i=e("c04e"),o=e("9bf2"),r=e("5c6c");t.exports=function(t,n,e){var a=i(n);a in t?o.f(t,a,r(0,e)):t[a]=e}},"8aa5":function(t,n,e){"use strict";var i=e("6547").charAt;t.exports=function(t,n,e){return n+(e?i(t,n).length:1)}},9263:function(t,n,e){"use strict";var i=e("ad6d"),o=e("9f7f"),r=e("5692"),a=RegExp.prototype.exec,s=r("native-string-replace",String.prototype.replace),c=a,u=function(){var t=/a/,n=/b*/g;return a.call(t,"a"),a.call(n,"a"),0!==t.lastIndex||0!==n.lastIndex}(),l=o.UNSUPPORTED_Y||o.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],p=u||d||l;p&&(c=function(t){var n,e,o,r,c=this,p=l&&c.sticky,f=i.call(c),v=c.source,g=0,h=t;return p&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),h=String(t).slice(c.lastIndex),c.lastIndex>0&&(!c.multiline||c.multiline&&"\n"!==t[c.lastIndex-1])&&(v="(?: "+v+")",h=" "+h,g++),e=new RegExp("^(?:"+v+")",f)),d&&(e=new RegExp("^"+v+"$(?!\\s)",f)),u&&(n=c.lastIndex),o=a.call(p?e:c,h),p?o?(o.input=o.input.slice(g),o[0]=o[0].slice(g),o.index=c.lastIndex,c.lastIndex+=o[0].length):c.lastIndex=0:u&&o&&(c.lastIndex=c.global?o.index+o[0].length:n),d&&o&&o.length>1&&s.call(o[0],e,(function(){for(r=1;r<arguments.length-2;r++)void 0===arguments[r]&&(o[r]=void 0)})),o}),t.exports=c},"950a":function(t,n,e){},"9f52":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"productDetails"},[e("div",{ref:"nav",staticClass:"nav"},[e("van-nav-bar",{attrs:{"left-arrow":"",fixed:!0,placeholder:!1},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight},scopedSlots:t._u([{key:"title",fn:function(){return[e("van-tabs",{attrs:{"line-width":20},model:{value:t.active,callback:function(n){t.active=n},expression:"active"}},[e("van-tab",{attrs:{title:"商品"}}),e("van-tab",{attrs:{title:"评价"}}),e("van-tab",{attrs:{title:"详情"}}),e("van-tab",{attrs:{title:"推荐"}})],1)]},proxy:!0},{key:"right",fn:function(){return[e("van-icon",{attrs:{name:"ellipsis",size:20}})]},proxy:!0}])})],1),e("div",{staticClass:"dian"}),e("div",{staticClass:"main"},[e("div",{staticClass:"lunbo"},[e("van-swipe",{attrs:{autoplay:3e3}},t._l(t.productList.slider_image,(function(t,n){return e("van-swipe-item",{key:n},[e("img",{attrs:{src:t}})])})),1)],1),e("div",{staticClass:"product_details"},[e("div",{staticClass:"price_box"},[e("h2",[t._v(" ￥"+t._s(t.productList.price)),e("span",[t._v("￥"+t._s(t.productList.ot_price))])]),e("div",{staticClass:"collection"},[e("van-icon",{attrs:{name:"like-o",color:t.isCollect?"red":"#333"},on:{click:function(n){return n.stopPropagation(),t.collect(n)}}}),e("span",[t._v(t._s(t.isCollect?"已收藏":"收藏"))])],1)]),e("h4",[t._v(t._s(t.productList.store_name))]),e("div",{staticClass:"stock"},[e("p",[t._v(" 原价:"),e("span",[t._v("￥"+t._s(t.productList.ot_price))])]),e("p",[t._v(" 库存:"),e("span",[t._v(t._s(t.productList.stock))]),t._v(t._s(t.productList.unit_name)+" ")]),e("p",[t._v(" 销量:"),e("span",[t._v(t._s(t.productList.fsales))]),t._v(t._s(t.productList.unit_name)+" ")])])]),e("div",{staticClass:"evaluate"},[e("p",[t._v("评论(0)")]),e("p",[t._v("查看全部"),e("van-icon",{attrs:{name:"arrow"}})],1)]),e("div",{staticClass:"introduce"},[t._m(0),e("div",{staticClass:"product_img",domProps:{innerHTML:t._s(t.productList.description)}})]),e("div",{staticClass:"product_list"},[t._m(1),e("div",{staticClass:"product_lunbo"},[e("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e4,"indicator-color":"red"}},t._l(t.good_list,(function(n,i){return e("van-swipe-item",{key:i,staticClass:"ddd"},[e("div",{staticClass:"list"},[e("ul",t._l(n,(function(n){return e("li",{key:n.id},[e("router-link",{attrs:{to:"/Details/"+n.id}},[e("img",{attrs:{src:n.image,alt:""}}),e("p",[t._v(t._s(n.store_name))]),e("strong",[t._v("￥"+t._s(n.price))])])],1)})),0)])])})),1)],1)]),e("div",{staticClass:"dian"})]),e("van-goods-action",[e("van-goods-action-icon",{attrs:{icon:"chat-o",text:"客服"}}),e("transition",{on:{"after-enter":t.afterEnter}},[e("van-goods-action-icon",{directives:[{name:"show",rawName:"v-show",value:t.isCount,expression:"isCount"}],attrs:{icon:"cart-o",text:"购物车",badge:t.count},on:{click:t.toCart}})],1),e("van-goods-action-icon",{attrs:{icon:"star",text:t.isCollect?"已收藏":"收藏",color:t.isCollect?"red":"#333"},on:{click:function(n){return n.stopPropagation(),t.collect(n)}}}),e("van-goods-action-button",{attrs:{type:"warning",text:"加入购物车"},on:{click:function(n){return n.stopPropagation(),t.addCart(n)}}}),e("van-goods-action-button",{attrs:{type:"danger",text:"立即购买"}})],1),e("van-sku",{attrs:{sku:t.sku,goods:t.goods},on:{"add-cart":t.onAddClick},model:{value:t.showCart,callback:function(n){t.showCart=n},expression:"showCart"}})],1)},o=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"header"},[e("span",[t._v("产品介绍")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"header"},[e("span",[t._v("商品推荐")])])}],r=(e("fb6a"),e("b64b"),e("d81d"),e("1276"),e("ac1f"),{name:"Details",props:{id:{type:String,default:"0"}},data:function(){return{active:0,navOpacity:1,productList:{},good_list:[],showCart:!1,sku:{tree:[{k:"颜色",k_id:"1",k_s:"s1",v:[{id:"30349",name:"红色",imgUrl:"https://b.yzcdn.cn/vant/sku/shoes-1.png"},{id:"1215",name:"白色",imgUrl:"https://b.yzcdn.cn/vant/sku/shoes-1.png"}]},{k:"尺寸",k_id:"2",v:[{id:"1193",name:"40码"},{id:"1194",name:"42码"}],k_s:"s2",count:2}],list:[{id:2259,price:120,s1:"1215",s2:"1193",stock_num:20,goods_id:946755},{id:2260,price:110,s1:"1215",s2:"1194",stock_num:2,goods_id:946755},{id:2257,price:130,s1:"30349",s2:"1193",stock_num:40,goods_id:946755},{id:2258,price:100,s1:"30349",s2:"1194",stock_num:50,goods_id:946755}],price:"5.00",stock_num:227,none_sku:!1,hide_stock:!1},goods:{},messageConfig:{},count:0,isCount:!1,isCollect:!1}},methods:{onClickLeft:function(){this.$router.go(-1)},onClickRight:function(){},animate:function(){},init:function(){var t=this;this.$http.get("api/product/detail/".concat(this.id)).then((function(n){if(console.log("商品详情信息==>",n),t.isCollect=n.data.data.storeInfo.userCollect,t.productList=n.data.data.storeInfo,t.good_list[0]=n.data.data.good_list.slice(0,6),t.good_list[1]=n.data.data.good_list.slice(6,12),t.good_list[2]=n.data.data.good_list.slice(12),n.data.status){var e=n.data.data.productAttr,i=n.data.data.productValue,o=1,r={},a=1;for(var s in t.sku.list=[],t.goods.picture=i[Object.keys(i)[0]].image,t.sku.tree=e.map((function(t,n){var e=t.attr_value.map((function(t,e){o++,r[t.attr]=o;var a={id:o,name:t.attr};return n<1&&(a.imgUrl=i[Object.keys(i)[e]].image),a})),s="s"+a;return a++,{k:t.attr_name,k_id:t.attr_name,v:e,k_s:s}})),i){var c=i[s],u=s.split(",");t.sku.list.push({id:c.unique,price:c.price,s1:r[u[0]],s2:r[u[1]],stock_num:c.stock,goods_id:c.product_id,imgUrl:c.image})}}else t.$toast("产品加载错误...")}))},onAddClick:function(t){var n=this;this.showCart=!1,this.$axios.post("/api/cart/add",{cartNum:t.selectedNum,new:0,productId:t.selectedSkuComb.goods_id,uniqueId:t.selectedSkuComb.id}).then((function(t){200!=t.data.status?n.$router.push("/login"):(n.$toast("添加购物车成功!"),setTimeout((function(){n.getCound(),n.isCount=!1}),1e3))}))},addCart:function(){this.showCart=!0},collect:function(){var t=this;this.$http.post("api/collect/del",{category:"product",id:this.id}).then((function(n){200!=n.data.status?t.$router.push("/login"):(t.isCollect=!t.isCollect,t.isCollect?t.$http.post("api/collect/add",{category:"product",id:t.id}).then((function(n){console.log("收藏结果==>",n),t.$toast("收藏成功")})):t.$http.post("api/collect/del",{category:"product",id:t.id}).then((function(n){console.log("取消结果==>",n),t.$toast("取消收藏")})))}))},getCound:function(){var t=this;this.$axios.get("/api/cart/count?numType=0").then((function(n){console.log("购物数量===>",n),t.count=n.data.data.count}))},afterEnter:function(){this.isCount=!0},toCart:function(){this.$router.push("/Shopping")}},watch:{active:function(){},id:function(){this.init()},count:function(){this.isCount=!0}},mounted:function(){this.init(),this.getCound(),window.onscroll=function(){var t=!0;t&&(t=!1)}}}),a=r,s=(e("c849"),e("2877")),c=Object(s["a"])(a,i,o,!1,null,"ebe82886",null);n["default"]=c.exports},"9f7f":function(t,n,e){"use strict";var i=e("d039");function o(t,n){return RegExp(t,n)}n.UNSUPPORTED_Y=i((function(){var t=o("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),n.BROKEN_CARET=i((function(){var t=o("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},ac1f:function(t,n,e){"use strict";var i=e("23e7"),o=e("9263");i({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},ad6d:function(t,n,e){"use strict";var i=e("825a");t.exports=function(){var t=i(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},b64b:function(t,n,e){var i=e("23e7"),o=e("7b0b"),r=e("df75"),a=e("d039"),s=a((function(){r(1)}));i({target:"Object",stat:!0,forced:s},{keys:function(t){return r(o(t))}})},b727:function(t,n,e){var i=e("0366"),o=e("44ad"),r=e("7b0b"),a=e("50c4"),s=e("65f0"),c=[].push,u=function(t){var n=1==t,e=2==t,u=3==t,l=4==t,d=6==t,p=7==t,f=5==t||d;return function(v,g,h,_){for(var m,x,b=r(v),C=o(b),k=i(g,h,3),y=a(C.length),w=0,E=_||s,R=n?E(v,y):e||p?E(v,0):void 0;y>w;w++)if((f||w in C)&&(m=C[w],x=k(m,w,b),t))if(n)R[w]=x;else if(x)switch(t){case 3:return!0;case 5:return m;case 6:return w;case 2:c.call(R,m)}else switch(t){case 4:return!1;case 7:c.call(R,m)}return d?-1:u||l?l:R}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},c849:function(t,n,e){"use strict";e("950a")},d784:function(t,n,e){"use strict";e("ac1f");var i=e("6eeb"),o=e("d039"),r=e("b622"),a=e("9263"),s=e("9112"),c=r("species"),u=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),d=r("replace"),p=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),f=!o((function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2!==e.length||"a"!==e[0]||"b"!==e[1]}));t.exports=function(t,n,e,d){var v=r(t),g=!o((function(){var n={};return n[v]=function(){return 7},7!=""[t](n)})),h=g&&!o((function(){var n=!1,e=/a/;return"split"===t&&(e={},e.constructor={},e.constructor[c]=function(){return e},e.flags="",e[v]=/./[v]),e.exec=function(){return n=!0,null},e[v](""),!n}));if(!g||!h||"replace"===t&&(!u||!l||p)||"split"===t&&!f){var _=/./[v],m=e(v,""[t],(function(t,n,e,i,o){return n.exec===a?g&&!o?{done:!0,value:_.call(n,e,i)}:{done:!0,value:t.call(e,n,i)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),x=m[0],b=m[1];i(String.prototype,t,x),i(RegExp.prototype,v,2==n?function(t,n){return b.call(t,this,n)}:function(t){return b.call(t,this)})}d&&s(RegExp.prototype[v],"sham",!0)}},d81d:function(t,n,e){"use strict";var i=e("23e7"),o=e("b727").map,r=e("1dde"),a=r("map");i({target:"Array",proto:!0,forced:!a},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(t,n,e){var i=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}},fb6a:function(t,n,e){"use strict";var i=e("23e7"),o=e("861d"),r=e("e8b5"),a=e("23cb"),s=e("50c4"),c=e("fc6a"),u=e("8418"),l=e("b622"),d=e("1dde"),p=d("slice"),f=l("species"),v=[].slice,g=Math.max;i({target:"Array",proto:!0,forced:!p},{slice:function(t,n){var e,i,l,d=c(this),p=s(d.length),h=a(t,p),_=a(void 0===n?p:n,p);if(r(d)&&(e=d.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)?o(e)&&(e=e[f],null===e&&(e=void 0)):e=void 0,e===Array||void 0===e))return v.call(d,h,_);for(i=new(void 0===e?Array:e)(g(_-h,0)),l=0;h<_;h++,l++)h in d&&u(i,l,d[h]);return i.length=l,i}})}}]);
//# sourceMappingURL=chunk-3ca90fdc.b7e84f6e.js.map