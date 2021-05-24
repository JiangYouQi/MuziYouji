<template>
  <div class="shop">
    <!-- 购物车头部 -->
    <div class="shop-top">
      <!-- 返回键 -->
      <div class="shop-top-box">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <!-- 标题 -->
      <div class="shop-top-box">购物车</div>
      <!-- 搜索 -->
      <div class="shop-top-box iconfont icon-sousuo"></div>
    </div>
    <!-- 垫脚石 -->
    <div class="shop-box"></div>

    <!-- 管理商品 -->
    <div class="del">
      <div class="list-num">
        商品数量 <span>{{ cartlist.valid.length }}</span>
      </div>
      <div class="admin-cancel">
        <div class="admin" v-show="addel" @click="addelclick">管理</div>
        <div class="cancel" v-show="addel == false" @click="addelclick">
          取消
        </div>
      </div>
    </div>

    <!-- 下单 -->
    <div class="orderr">
      <div class="order-check">
        <input type="checkbox" @click="allchecked" :checked="allcheck" />
        <div>全选({{ num }})</div>
      </div>
      <div class="order-true" v-show="addel">
        <div class="order-true-left">
          <span>￥</span><span class="order-price">{{ this.allprice }}</span>
        </div>
        <div class="order-true-right" @click='checkorder' :checkord='checkord'
          >立即下单</div>
      </div>
      <div class="order-false" v-show="addel == false" @click="del">删除</div>
    </div>
    <!-- 垫脚石 -->
    <div class="shop-box"></div>

    <!-- 购物车商品列表 -->
    <div class="shop-inquire">
      <Shopplist
        v-for="(item, index) in cartlist.valid"
        :key="index"
        :item="item"
        :checked="item.checked"
        :myNum="item.cart_num"
        @checkchange="checkchange"
      ></Shopplist>
    </div>
    <!-- 购物车是空的吗 -->
    <ShopInq v-if="cartlist.valid.length == 0"></ShopInq>
    <!-- 猜你喜欢 -->
    <div class="guess-like">
      <div class="tips">
        <div class="tips-top">
          <i>//</i>
          <span>猜你喜欢</span>
          <i>//</i>
        </div>
        <div class="tips-cut-off">
          <van-divider
            :style="{
              color: 'rgba(0,0,0,0.4)',
              fontSize: '13px',
              borderColor: 'rgba(0,0,0,0.2)',
            }"
            >实时推荐你的心心念念</van-divider
          >
        </div>
      </div>
      <!-- 猜你喜欢-列表 -->
      <div class="guli-list">
        <div
          class="guli-item"
          v-for="(item, index) in shoppinglist"
          :key="index"
        >
          <div class="imgbox">
            <img :src="item.image" alt="" />
          </div>
          <p class="title">{{ item.store_name }}</p>
          <p class="price"><span>￥</span> {{ item.price }}</p>
        </div>
      </div>
      <!-- 垫脚石 -->
      <div class="diaojiao"></div>
    </div>
  </div>
</template>

<script>
// import LoginCom from "@/components/logincom.vue";
import ShopInq from "@/components/shopinquire.vue";
import Shopplist from "@/components/shopplist.vue";
export default {
  name: "Shopping",
  components: {
    // LoginCom,
    ShopInq,
    Shopplist,
  },
  data() {
    return {
      checkord:[],
      shoppinglist: [],
      cartlist: [],
      addel: true,
      num: 0,
      allprice: 0,
      allcheck: false,
    };
  },

  mounted() {
    this.$http("/api/cart/list").then((d) => {
      console.log("d==>", d);
      if (d.data.status == 410000) {
        this.$router.push("/login");
      }
      this.cartlist = d.data.data;
      // cartlist.valid
      var { valid } = this.cartlist;
      // console.log(valid);
      var newArr = valid.map((item) => {
        return { checked: false, ...item };
      });
      this.cartlist.valid = newArr;
      console.log("cart==>", this.cartlist);
    });
    this.$http("/api/products").then((d) => {
      this.shoppinglist = d.data.data;
      console.log(this.shoppinglist);
    });
  },

  methods: {
    goto() {
      // if(cartlist.)
    },
    addelclick() {
      if (this.addel == true) {
        this.addel = false;
      } else {
        this.addel = true;
      }
    },
    checkchange({ check, num, id, changenum }) {
      var index = this.cartlist.valid.findIndex((item) => {
        return item.id === id;
      });

      if (check) {
        this.num += num;
      } else {
        this.num = this.num - num;

        this.allprice =
          this.allprice -
          parseFloat(this.cartlist.valid[index]["truePrice"]) * num;
      }

      this.cartlist.valid[index]["checked"] = check;

      

      if (changenum) {
        // 点击加号减号的
        this.cartlist.valid[index]["cart_num"] += num;
        this.allprice +=
          parseFloat(this.cartlist.valid[index]["truePrice"]) * num; // 改变数量
      } else {
        //
        this.cartlist.valid[index]["cart_num"] = num;
        if (check) {
          this.allprice +=
            parseFloat(this.cartlist.valid[index]["truePrice"]) *
            num;
        }
      }

      var flag = this.cartlist.valid.some((item) => {
        return item.checked == false;
      });

      if (flag) {
        this.allcheck = false;
      } else {
        this.allcheck = true;
      }
    },
    allchecked() {
      this.allcheck = !this.allcheck;

      this.num = 0;
      this.allprice = 0;
      this.cartlist.valid.forEach((item, index) => {
        item.checked = this.allcheck;
        if (this.allcheck) {
          this.num += item.cart_num;
          this.allprice +=
            item.cart_num *
            parseFloat(this.cartlist.valid[index]["productInfo"]["price"]);
        }
      });
      console.log(this.cartlist.valid, this.allcheck);
    },

    del() {
      var del = [];
      this.cartlist.valid.forEach((item) => {
        if (item.checked) {
          del.push(item.id);
          console.log(del);
        }
      });
      this.$http.post("/api/cart/del", { ids: del }).then((d) => {
        console.log(d);
      });
     console.log('dnkasjndfiaqsnd',window.location.reload());

    },
    checkorder(){
      this.cartlist.valid.forEach((item)=>{
        if(item.checked){
          this.checkord.push(item.id);
        }
      })
      var ids=this.checkord.join(',')

      this.$router.push('/order/'+ids)
      console.log(this.checkord);
    }
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
// 购物车
.shop {
}
// 头部
.shop-top {
  width: 100%;
  height: 2.6rem;
  position: fixed;
  display: flex;
  background-color: #8a8dce;
  z-index: 5;
}
// 头部的左中右三个盒子
.shop-top-box {
  flex: 1;
  text-align: center;
  line-height: 2.6rem;
}
.shop-top-box:nth-child(1) {
  text-align: left;
  padding: 0 0 0 1rem;
}
.shop-top-box:nth-child(3) {
  text-align: right;
  padding: 0 1rem 0 0;
  font-size: 20px;
}

.shop-box {
  width: 100%;
  height: 2.6rem;
}

// 猜你喜欢
// 提示
.tips {
  width: 100%;
  height: 4rem;
  background-color: #f5f5f5;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0);
}
.tips-top {
  margin: auto;
  margin-top: 0.55rem;
  font-size: 14px;
  font-weight: 600;
  height: 1.3rem;
  color: #fd7d20;
}
.van-divider {
  margin: 0px;
  height: 1.6rem;
}
// 分割线
.tips-cut-off {
  width: 95%;
  margin: auto;
}
// 猜你喜欢-列表
.guli-list {
  margin: 5px 0;
  overflow: hidden;
}
// 猜你喜欢-项目
.guli-item {
  float: left;
  width: 49%;
  height: 15rem;
  background-color: white;
  margin: 0.25rem 0.5%;
  .imgbox {
    width: 100%;
    height: 75%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    // text-align: center;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price {
    margin-left: 10px;
    font-size: 15px;
    margin-top: 5px;
    color: #ff6700;
    span {
      font-size: 12px;
    }
  }
}

// 垫脚石
.diaojiao {
  width: 100%;
  height: 50px;
}

// 管理商品 删除商品
.del {
  position: fixed;
  display: flex;
  justify-content: space-between;
  // padding: 5px 5px;
  align-items: center;
  z-index: 5;
  background-color: white;
  width: 100%;
  height: 40px;
  .list-num {
    margin-left: 10px;
    span {
      color: #8a8dce;
    }
  }
  .admin-cancel {
    margin-right: 10px;
    div {
      border: 1px solid rgba(0, 0, 0, 0.7);
    }
  }
}
// 下单菜单
.orderr {
  box-sizing: border-box;
  display: flex;
  position: fixed;
  z-index: 6;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  bottom: 50px;
  .order-check {
    display: flex;
  }
  .order-true {
    display: flex;
    justify-content: center;
    align-items: center;
    .order-true-left {
      margin-right: 10px;
      span {
        color: #8a8dce;
        font-size: 12px;
      }
      .order-price {
        font-size: 18px;
      }
    }
    .order-true-right {
      padding: 5px 10px;
      background-color: #8a8dce;
      border-radius: 15px;
      font-size: 15px;
      color: white;
    }
  }
}

// 删除商品
.order-false {
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 0.5);
}
</style>