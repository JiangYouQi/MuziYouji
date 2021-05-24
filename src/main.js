import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/iconfont/iconfont.css"
import { Tabbar, TabbarItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Divider } from 'vant';
import { NoticeBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Search } from 'vant';
import './plugins/axios'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import { Form } from 'vant';
import { Field } from 'vant';
import { Toast } from 'vant';
import { CouponCell, CouponList } from 'vant';
import { Popup } from 'vant';
import { Sku } from 'vant';
import { Icon } from 'vant';
import { NavBar } from 'vant';
import { ContactCard } from 'vant';
import { AddressList } from 'vant';
import { AddressEdit } from 'vant';
import { ContactList } from 'vant';
import { Area } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { ActionSheet } from 'vant';
import { Step, Steps } from 'vant';
import { Dialog } from 'vant';
import { Uploader } from 'vant';
// import 'vant/lib/index.css'; 没安装插件时可用这个进行引入css
Vue.config.productionTip = false;
// axios.defaults.baseURL = "http://47.115.51.185/";

//调用vue中的导航栏
Vue.use(Tabbar);
Vue.use(TabbarItem);

//调用vue中的轮播图
Vue.use(Swipe);
Vue.use(SwipeItem);

//调用vue中的Grid 宫格
Vue.use(Grid);
Vue.use(GridItem);

  
//调用vue中的Divider 分割线
Vue.use(Divider);

//调用vue中的NoticeBar 通知栏
Vue.use(NoticeBar);

//调用vue中的Tab 标签页
Vue.use(Tab);
Vue.use(Tabs);

//调用vue中的Cell 单元格
Vue.use(Cell);
Vue.use(CellGroup);

//调用vue中的Search 搜索
Vue.use(Search);

//调用vue中的Field 输入框
Vue.use(Field);

//调用vue中的Form 表单
Vue.use(Form);

//调用vue中的Toast 轻提示
Vue.use(Toast);

//调用vue中的Coupon 优惠券选择器
Vue.use(CouponCell);
Vue.use(CouponList);

//调用vue中的Popup 弹出层
Vue.use(Popup);

//调用vue中的Sku 商品规格
Vue.use(Sku);

//调用vue中的Icon 图标
Vue.use(Icon);

//调用vue中的GoodsAction 商品导航
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

//调用vue中的NavBar 导航栏
Vue.use(NavBar);

//调用vue中的ContactCard 联系人卡片
Vue.use(ContactCard);


//调用vue中的AddressList 地址列表
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(ActionSheet)


//调用vue中的Area 省市区选择
Vue.use(Area);

//调用vue中的ContactList 联系人列表
Vue.use(ContactList);

//调用vue中的Steps 步骤条
Vue.use(Step);
Vue.use(Steps);

//调用vue中的Dialog 弹出框
Vue.use(Dialog);

//调用vue中的Uploader 文件上传
Vue.use(Uploader);

// 调用axios
Vue.use(axios)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')