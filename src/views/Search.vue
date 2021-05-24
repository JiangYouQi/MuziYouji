<template>
  <div class="Search">
    <div class="search-top">
        <!-- 返回键 -->
      <div class="search-top-back" @click="back">👈</div>
      <!-- 搜索的输入框 -->
      <div class="search-top-inp">
        <i>🈲</i>
        <input type="text" placeholder="商品搜索">
      </div>
      <!-- 点击搜索 -->
      <div class="search-top-btn">搜索</div>
    </div>

    <div class="hot-search">
      <div class="hot-search-tips">热门搜索</div>
      <div class="hot-search-box">
        <div class="hot-search-box-key">苹果</div>
        <div class="hot-search-box-key">苹果</div>
        <div class="hot-search-box-key">苹果</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods:{
    back(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.search-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:15px 10px
}
// .search-top-back{

// }
.search-top-inp{
  height: 35px;
  background-color: rgba(0, 0, 0, 0.04);
  width: 80%;
  border-radius: 20px;
  align-items: center;
  display: flex;
  i{
    margin-left:10px;
    margin-right: 10px;
  }
  input{
    border: 0px;
    background-color: rgba(0, 0, 0, 0);
    font-size: 13px;
  }

}

// 热门搜索
.hot-search{
  // padding: 0px 10px;
  width: 100%;
}
// 热门搜索标题
.hot-search-tips{
  margin-left: 10px;
}
.hot-search-box{
  // margin-top: 10px;
  width: 80%;
  display: flex;
  margin-left: 5px;
}
.hot-search-box .hot-search-box-key{
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  height: 25px;
  padding: 0px 10px;
  line-height: 25px;
  text-align: center;
  font-size: 12px;
  margin: 10px 5px;
  color: rgba(0, 0, 0, 0.5);
}
</style>