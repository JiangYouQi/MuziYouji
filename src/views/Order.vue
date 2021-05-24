<template>
  <div class="order">
    <div class="order-top">
      <div class="back" @click="back">《</div>
      <p>填写订单</p>
    </div>
    <div class="diandd"></div>
    <!-- 添加联系人 -->
    <router-link
      tag="div"
      :to="{
        path: '/ordercontacts',
        query: {
          ids,
          addreID: detail && currentContact.id,
        },
      }"
      class="order-box"
    >
      <!-- <van-contact-card type="edit" 
      @click="edit" 
      :currentContact="currentContact"
       /> -->
      <div class="contacts-left">
        <i>图标</i>
      </div>
      <div class="contacts-right">
        <div class="contacts-top">
          <span>{{ currentContact.real_name }}</span>
          <span class="number">{{ currentContact.phone }}</span>
        </div>
        <div class="contacts-address">
          {{ detail }}
        </div>
        <div class="contacts-go">></div>
      </div>
    </router-link>
    <!-- <OrderContacts v-show="orderboo" :orderboo='orderboo'></OrderContacts> -->

    <!-- 商品信息 -->
    <div class="orde-shopplist">
      <p class="order-shopplist-num">商品数量:</p>
      <Orderlist
        v-for="(item, index) in orderarray.cartInfo"
        :key="index"
        :item="item"
      ></Orderlist>
    </div>

    <!-- 商品金额-运费-优惠卷-积分 -->
    <div class="tips">
      <!-- 商品金额 -->
      <div class="goods-mon disflex">
        <div class="goods-text">商品金额</div>
        <div class="goods-price">￥{{ orderarray.priceGroup.totalPrice }}</div>
      </div>
      <!-- 运费 -->
      <div class="freight disflex">
        <div class="freight-text">运费</div>
        <div class="freight-price">免运费</div>
      </div>

      <!-- 优惠卷 -->
      <!-- <div class="coupon disflex">
        <div class="coupon-text">优惠卷</div>
        <div class="coupon-price">无可用 <i>》</i></div>
      </div> -->

      <!-- 优惠券单元格 -->
      <van-coupon-cell class="coupon disflex" @click="showList = true" />
      <!-- 优惠券列表 -->
      <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 75%; padding-top: 4px"
      >
        <van-coupon-list @change="onChange" />
      </van-popup>

      <!-- 积分 -->
      <div class="integral disflex">
        <div class="integral-text">积分</div>
        <div class="integral-price">
          {{ orderarray.userInfo.integral }}
          <input
            type="checkbox"
            :checked="integralboo"
            @click="integralClick"
          />
        </div>
      </div>

      <!-- 留言 -->
      <div class="message disflex">
        <div class="message-text">留言</div>
        <div class="message-price">
          <input type="text" placeholder="建议留言前与商家沟通确认" />
        </div>
      </div>

      <!-- 分割线 -->
      <div class="line"></div>

      <!-- 合计 -->
      <div class="total">
        合计：<span>￥{{ integralArray.pay_price }}</span>
      </div>
    </div>

    <!-- 支付方式-发票 -->
    <div class="pay-invoice">
      <!-- 发票 -->
      <div class="invoice disflex">
        <div class="invoice-text">发票</div>
        <div class="invoice-price">普票(商品明细-个人)</div>
      </div>

      <!-- 支付方式 -->
      <div class="pay disflex" @click="click">
        <div class="pay-text">支付方式</div>
        <div class="pay-price">
          {{ index == 0 ? "微信支付" : "余额支付" }} <i>》</i>
        </div>
      </div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        closeable
        close-icon="close"
        :style="{ height: '50%' }"
        @click-overlay="click_overlay"
      >
        <div class="pay-box">
          <div class="pay-text">支付方式</div>
          <div
            :class="['pay-wechat', 'payflex', index == 0 ? 'active' : '']"
            @click="payClick(0)"
          >
            <div class="pay-img"><i>w</i>微信支付</div>
            <div class="pay-text">微信快捷支付</div>
          </div>
          <div
            :class="['pay-balance', 'payflex', index == 1 ? 'active' : '']"
            @click="payClick(1)"
          >
            <div class="pay-img"><i>w</i>余额支付</div>
            <div class="pay-text">
              可用余额：{{ orderarray.userInfo.integral }}
            </div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="dian"></div>
    <!-- 提交 -->
    <div class="Submit disflex">
      <div class="Submit-price">
        ￥ <span>{{ integralArray.pay_price }}</span>
      </div>
      <div class="Submit-btn" @click="orderClick">提交订单</div>
    </div>
  </div>
</template>

<script>
const coupon = {};
import Orderlist from "@/components/orderlist";
// import { Toast } from "vant";
export default {
  name: "order",
  components: {
    Orderlist,
  },
  beforeRouteEnter(to, from, next) {
    //console.log()('to========>',to);
    //console.log()('from========>',from);

    next((vm) => {
      if (from.path === "/ordercontacts") {
        var { id, name, tel, isDefault, address } = JSON.parse(to.query.item);
        vm.currentContact = {
          id,
          real_name: name,
          phone: tel,
          is_default: isDefault,
        };
        vm.detail = address;
        console.log("这是一个der", vm.currentContact);
      }
    });
  },
  props: {
    ids: String,
  },
  data() {
    return {
      // 优惠卷
      showList: false,
      show: false,

      // 添加联系人
      // orderboo: false,
      index:1,

      integralboo: false,

      orderarray: [],

      currentContact: {},
      detail: "",
      checkord: [],

      // 积分金额抵消
      integralArray: [],

      // 提交订单
      SumitorderArray:[],

      orderId:'',
    };
  },
  methods: {
    // edit(){},
    onAdd() {
      if (this.orderboo) {
        // this.orderboo = false;
        //console.log()("联系人页面隐藏了", this.orderboo);
      } else {
        // this.orderboo = true;
        //console.log()("联系人页面显示了", this.orderboo);
      }
    },
    back() {
      this.$router.go(-1);
    },
    // 提交订单
    orderClick(){
      this.orderFunction()
    },
    // 切换支付方式
    payClick(index){
      this.index=index
      this.show=false
      this.integralFunction();
    },
    // 积分
    integralClick() {
      if (this.integralboo) {
        this.integralboo = false;
      } else {
        this.integralboo = true;
      }
      this.integralFunction();
    },
    // 积分支付方式的接口以及传输的参数
    integralFunction() {
      this.$http
        .post("/api/order/computed/" + this.orderarray.orderKey, {
          addressId: this.currentContact.id,
          couponId: 0,
          payType: this.index==1?'yue':'weixin',
          shipping_type: 1,
          useIntegral: this.integralboo ? 1 : 0,
        })
        .then((d) => {
          console.log("order===========>", d);
          this.integralArray = d.data.data.result;
        });
    },
    // 提交订单，创建订单接口以及传输的参数
    orderFunction(){
      this.$http.post('/api/order/create/'+this.orderarray.orderKey,{
        addressId: this.currentContact.id,
        bargainId: 0,
        combinationId: 0,
        couponId: 0,
        from: "weixinh5",
        mark: "",
        payType: this.index==1?'yue':'weixin',
        phone: "",
        pinkId: 0,
        real_name: "",
        seckill_id: 0,
        shipping_type: 1,
        store_id: 0,
        useIntegral: this.integralboo ? 1 : 0
      }).then((d)=>{
        console.log('提交订单按钮==================》0',d);
        this.SumitorderArray = d.data.data
        console.log('this.SumitorderArray===========>',this.SumitorderArray);
        this.$router.push('/zhifustatus/'+this.SumitorderArray.result.orderId)
        console.log('this.SumitorderArray.orderId==================>',this.SumitorderArray.result.orderId);
      })
    },
    // 优惠卷
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
      console.log()(code);
    },
    click() {
      this.show = true;
    },
    click_overlay() {
      //console.log()("dsadoiajkdgbjh");
      this.show = false;
      //console.log()(this.show);
    },
  },

  mounted() {
    // 地址渲染
    //console.log()(this);
    this.$http.post("/api/order/confirm", { cartId: this.ids }).then((d) => {
      //console.log()("confirm=======>", d);
      this.orderarray = d.data.data;
      //console.log()("orderarray======>", this.orderarray);
      if (this.detail == "") {
        this.detail =
          this.orderarray.addressInfo.province +
          this.orderarray.addressInfo.district +
          this.orderarray.addressInfo.city +
          this.orderarray.addressInfo.detail;
      }
      if (JSON.stringify(this.currentContact) == "{}") {
        var { id, real_name, phone, is_default } = this.orderarray.addressInfo;
        this.currentContact = { id, real_name, phone, is_default };
        // 合计渲染
         this.integralFunction();
      }
    });
    //console.log()("111");
  },
};
</script>

<style lang="less" scoped>
.dian {
  width: 100%;
  height: 100px;
}
.diandd {
  width: 100%;
  height: 60px;
}
.orde-shopplist {
  width: 95%;
  margin: 0 auto;
}
.order-box {
  width: 95%;
  margin: 0 auto;
  padding: 15px;
  background-color: white;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .contacts-left {
    width: 10%;
  }
  .contacts-right {
    width: 95%;
    margin: 0 auto;
    position: relative;
    .contacts-top {
      span {
        margin-right: 10px;
        font-size: 16px;
        font-weight: 600;
      }
      .number {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .contacts-go {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
    }
  }
  .contacts-address {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 13px;
    margin-top: 5px;
    color: rgba(0, 0, 0, 0.8);
    width: 95%;
  }
}
.order {
  width: 100%;
}
.order-top {
  display: flex;
  position: fixed;
  top: 0px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  width: 100%;
  height: 50px;
  background-color: #8a8dce;
  z-index: 3;
  .back {
    position: absolute;
    left: 10px;
  }
}
.order-shopplist-num {
  text-indent: 0.5em;
}

// <!-- 商品金额-运费-优惠卷-积分 -->
.tips {
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  padding: 0px 10px 10px 10px;
  overflow: hidden;

  .goods-mon {
    .goods-price {
      font-weight: 600;
    }
  }
  .freight {
    .freight-price {
      font-weight: 600;
    }
  }
  // 优惠卷
  .coupon {
    padding: 0px;
    &::after {
      display: none;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 10px auto;
  }
  .total {
    font-size: 13px;
    float: right;
    margin-right: 10px;
    span {
      color: #8a8dce;
      font-weight: 600;
    }
  }
  // <!-- 留言 -->
  .message {
    .message-price {
      input {
        border: 0px;
        color: rgba(0, 0, 00, 0.7);
        font-size: 13px;
      }
    }
  }
}

// 布局规格
.disflex {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);
}

// <!-- 支付方式-发票 -->
.pay-invoice {
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  padding: 0px 10px 10px 10px;
  overflow: hidden;
  .pay-box {
    padding: 15px;
    .payflex {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 10px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      position: relative;
      div {
        font-size: 15px;
        flex: 1;
      }
    }
    // 支付方式选中效果
    .active {
      color: #8a8dce;
      border-color: #8a8adc;
    }
    .payflex::before {
      content: "";
      display: block;
      width: 1px;
      height: 20px;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.1);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .pay-balance {
      margin-top: 10px;
    }
  }
}

// 提交
.Submit {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 10px;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  bottom: 0px;
  align-items: center;
  .Submit-price {
    color: #8a8dce;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .Submit-btn {
    padding: 8px 15px;
    background-color: #8a8dce;
    border-radius: 15px;
    color: white;
    font-size: 13px;
  }
}
</style>