<template>
  <div class="Collection">
    <!-- 购物车头部 -->
    <div class="Collection-top">
      <!-- 返回键 -->
      <div class="Collection-top-box" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <!-- 标题 -->
      <div class="Collection-top-box">收藏</div>
    </div>
    <div class="Collection-box"></div>
    <!-- 列表 -->
    <div class="Collection-lsit" v-for="(item, index) in colist" :key="index">
      <div class="list-img">
        <img :src="item.image" alt="" />
      </div>
      <div class="lsit-text">
        <div class="item-text">
          {{ item.store_name }}
        </div>
        <div class="item-mon">￥{{ item.price }}</div>
      </div>
      <div class="del" @click="del(item.pid,item.category)">删除</div>
    </div>
    <NoneColl v-show="!colist.length"></NoneColl>
  </div>
</template>

<script>
import NoneColl from '@/components/noneColl.vue'
export default {
  name: "Collection",
  data() {
    return {
      colist: [],
    };
  },
  components:{
      NoneColl
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    del(id,category) {
      this.$http
        .post("/api/collect/del", {
          category: category,
          id: id,
        })
        .then((d) => {
          console.log(d);
          window.location.reload()
        });
    },
  },

  mounted() {
    this.$http.get("/api/collect/user?page=1&limit=20").then((d) => {
      console.log(d);
      this.colist = d.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.Collection {
  // 头部
  .Collection-top {
    width: 100%;
    height: 2.6rem;
    position: fixed;
    background-color: #8a8dce;
    z-index: 5;
  }
  // 头部的左中右三个盒子
  .Collection-top-box {
    flex: 1;
    text-align: center;
    line-height: 2.6rem;
    color: white;
  }
  .Collection-top-box:nth-child(1) {
    position: absolute;
    left: 10px;
  }
  .Collection-top-box:nth-child(2) {
    text-align: center;
  }

  .Collection-box {
    width: 100%;
    height: 2.6rem;
  }

  .Collection-lsit {
    position: relative;
    width: 100%;
    background-color: white;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    .list-img {
      width: 70px;
      height: 70px;
      background-color: red;
      float: left;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .lsit-text {
      float: left;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 70px;
      font-size: 13px;
      width: 60%;
      .item-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-mon {
        color: #8a8dce;
        font-weight: 600;
      }
    }
    .del {
      position: absolute;
      bottom: 10px;
      padding: 3px 10px;
      right: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
</style>