<template>
  <div class="address">
    <!-- 购物车头部 -->
    <div class="address-top">
      <!-- 返回键 -->
      <div class="address-top-box" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <!-- 标题 -->
      <div class="address-top-box">地址管理</div>
    </div>
    <div class="address-box"></div>

    <!-- 列表 -->
    <div class="address-lsit" v-for="(item, index) in addresist" :key="index">
      <div class="lsit-text">
        <div class="item-text">
          收货人：{{ item.real_name }} 
        </div>
        <div class="item-text">
            电话号码：{{item.phone}}
        </div>
        <div class="item-mon">收货地址：{{ item.province+item.city+item.district }}</div>
      </div>
      <div class="del" @click="del(item.id)">删除</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "address",
  data() {
    return {
        addresist:[],
    };
  },
  methods: {
       back() {
      this.$router.go(-1);
    },
    del(id) {
      this.$http
        .post("/api/address/del", {
          id: id,
        })
        .then((d) => {
          console.log(d);
          window.location.reload()
        });
    },
  },
  mounted() {
      this.$http.get("/api/address/list?page=1&limit=20").then((d) => {
      console.log(d);
      this.addresist = d.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.address {
  // 头部
  .address-top {
    width: 100%;
    height: 2.6rem;
    position: fixed;
    background-color: #8a8dce;
    z-index: 5;
  }
  // 头部的左中右三个盒子
  .address-top-box {
    flex: 1;
    text-align: center;
    line-height: 2.6rem;
    color: white;
  }
  .address-top-box:nth-child(1) {
    position: absolute;
    left: 10px;
  }
  .address-top-box:nth-child(2) {
    text-align: center;
  }

  .address-box {
    width: 100%;
    height: 2.6rem;
  }

  .address-lsit {
    position: relative;
    width: 100%;
    background-color: white;
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 10px auto;
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