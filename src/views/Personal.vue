<template>
  <div class="Personal">
    <div class="per-top">
      <!-- 用户信息 -->
      <div class="per-user">
        <div class="top-img" v-if="personlist">
          <img :src="personlist.avatar" alt />
        </div>
        <div class="top-login" v-if="personlist">
          {{ personlist.nickname }} <img :src="personlist.vip_icon" alt="" />
        </div>
        <div class="integral" v-if="personlist">
          积分{{ personlist.integral }}
        </div>
        <div class="surplus-mon">余额:{{personlist.now_money}}</div>
      </div>
    </div>
    <!-- 订单 -->
    <div class="order">
      <router-link tag="div" to="/AllOrder/0" class="order-my">
        <div class="order-my-left">我的订单</div>
        <div class="order-my-right">
          全部订单
          <i>></i>
        </div>
      </router-link>
      <div class="order-con">
        <div class="order-con-box" @click="perClick(0)">
          <div>
            <i class="iconfont icon-daifukuan"></i>
            <p>待付款</p>
          </div>
        </div>
        <div class="order-con-box" @click="perClick(1)">
          <div>
            <i class="iconfont icon-daishouhuo"></i>
            <p>待收货</p>
          </div>
        </div>
        <div class="order-con-box" @click="perClick(2)">
          <div>
            <i class="iconfont icon-xiugai"></i>
            <p>待收货</p>
          </div>
        </div>
      </div>

      <div class="out-btn" @click="out">退出账户</div>
    </div>

    <!-- 个人分类导航条 -->
    <div class="per-nav">
      <van-cell
        title="收藏"
        icon="star-o"
        is-link
        to="/Collection"
      />
      <van-cell title="地址" icon="location-o" is-link to="/AddRess" />
    </div>
    <div class="per-nav">
      <van-cell title="设置" icon="setting-o" is-link to="/Set" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Personal",
  data() {
    return {
      personlist: [],
      pernumber:0,
    };
  },
  mounted() {
    this.$http("/api/user").then((d) => {
      console.log("logind==>", d);
      if (d.data.status !== 200) {
        this.$router.push("/login");
      }
      this.personlist = d.data.data;
      console.log("cart==>", this.personlist);
    });
  },

  methods: {
    out() {
      this.loginOut();
      setTimeout(() => {
        this.$router.push({
          path: "/login",
        });
      }, 1000);
    },
    perClick(num){
      this.pernumber=num
      this.$router.push('/AllOrder/'+this.pernumber)
    },
    ...mapMutations(["loginOut"]),
  },
  
};
</script>

<style lang="less" scoped>
// 我的页面
.Personal {
}

// 头部
.per-top {
  width: 100%;
  margin: auto;
  padding: 1rem 0;
  background-color: #8A8DCE;
}
// 用户信息
.per-user {
  height: 3.3rem;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  position: relative;
}
// 余额
.surplus-mon{
  margin-top: 1.6rem;
  margin-left: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
}
.top-img {
  // flex: 1;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #8A8DCE;
  margin-right: 0.5rem;
}
.top-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.top-login {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 3.4rem;
  top: 0.2rem;
  img {
    width: 1rem;
    height: 1rem;
  }
}
// 积分
.integral {
  margin-top: 1.6rem;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  font-size: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0.2rem;
  margin-left: 0.5rem;
}

// 订单
.order {
  width: 100%;
  height: 8rem;
  background-color: white;
}
.order-my {
  height: 2.6rem;
  line-height: 2.6rem;
  background-color: white;
  padding: 0px 0.8rem;
  border-bottom: 1px solid #d9d9d9;
  font-size: 0.8rem;
}
.order-my-left {
  float: left;
}
.order-my-right {
  float: right;
}

.order-con {
  display: flex;
  height: 100%;
  height: 5.4rem;
}
.order-con-box {
  flex: 1;
  height: 5.4rem;
  //   margin: 10px auto;
  display: flex;
  div {
    //   height: 5.4rem;
    text-align: center;
    margin: auto;
  }
  i {
    // margin-bottom: 0.5rem;
    font-size: 24px;
  }
  p {
    margin: 0px auto;
    margin-top: 0.5rem;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.7);
  }
}

// 个人分类导航条
.per-nav {
  margin: 10px 0;
  font-size: 15px;

  .van-cell {
    padding: 12px 16px;
  }
  .van-cell__left-icon {
    margin-right: 9px;
  }
  .van-cell__left-icon {
    font-size: 25px;
  }
}

// 退出按钮
.out-btn {
  width: 95%;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: #8A8DCE;
  text-align: center;
  line-height: 2.5rem;
  position: absolute;
  bottom: 5rem;
  /* margin: 0 auto; */
  /* left: 50%; */
  transform: translateX(2.5%);
  color: rgba(255, 255, 255, 0.8);
}
</style>