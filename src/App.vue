<template>
  <div id="app">
    <van-tabbar v-model="active" active-color="#8A8DCE" inactive-color="#000" :route='true' v-show="$route.meta.BtomNav">
      <van-tabbar-item to="/" name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/classify" name="classify" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/shopping" name="shopping" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/personal" name="personal" icon="user-o">个人中心</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
// import BottomNav from '@/components/BottomNav.vue'
export default {
  data() {
    return {
      active: "home",
    };
  },
  components: {
    // BottomNav
  },
};
</script>


<style>
</style>
