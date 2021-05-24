<template>
  <div class="OrderDetails">
    <!-- 顶部 -->
    <div class="details-top">
      <div class="details-top-img">
        <img :src="orderdetailArray.status_pic" alt="" />
      </div>
      <div class="details-top-right">
        <div class="details-top-text">{{ orderdetailArray._status._msg }}</div>
        <div class="details-top-time">
          <div class="data">{{ orderdetailArray._pay_time }}</div>
        </div>
      </div>
    </div>
    <!-- 进度条 -->
    <div class="details-progress-box">
      <div class="details-progress">
        <van-steps :active="active">
          <van-step>买家下单</van-step>
          <van-step>商家接单</van-step>
          <van-step>买家提货</van-step>
          <van-step>交易完成</van-step>
        </van-steps>
      </div>
    </div>
    <!-- 联系人 -->
    <div class="details-contacts">
      <div class="contacts-left">
        <i>图标</i>
      </div>
      <div class="contacts-right">
        <div class="contacts-top">
          <span>{{ orderdetailArray.real_name }}</span>
          <span class="number">{{ orderdetailArray.user_phone }}</span>
        </div>
        <div class="contacts-address">{{ orderdetailArray.user_address }}</div>
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="details-lsit">
      <div class="details-list-num">
        共{{ orderdetailArray.total_num }}件商品
      </div>
      <OrderDetailsList
        v-for="(item, index) in cartInfos"
        :key="index"
        :item="item"
      ></OrderDetailsList>
      <div class="details-list-service">
        <i>🎧</i>
        <span>联系客服</span>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="details-order">
      <div class="zhi-num disflex">
        <div class="zhi-num-text">订单编号</div>
        <div class="zhi-num-num zhi-number">
          {{ orderdetailArray.order_id }}
        </div>
      </div>
      <div class="zhi-time disflex">
        <div class="zhi-time-text">下单时间</div>
        <div class="zhi-time-num zhi-number">
          {{ orderdetailArray._add_time }}
        </div>
      </div>
      <div class="zhi-type disflex">
        <div class="zhi-type-text">订单类型</div>
        <div class="zhi-type-num zhi-number">普通订单</div>
      </div>
      <div class="zhi-state disflex">
        <div class="zhi-state-text">支付状态</div>
        <div class="zhi-state-num zhi-number">
          {{ orderdetailArray._status._title }}
        </div>
      </div>
      <div class="zhi-mode disflex">
        <div class="zhi-mode-text">支付方式</div>
        <div class="zhi-mode-num zhi-number">
          {{ orderdetailArray._status._payType }}
        </div>
      </div>
    </div>

    <!-- 支付金额-实付款 -->
    <div class="details-pay">
      <div class="zhi-money disflex">
        <div class="zhi-mode-text">支付金额</div>
        <div class="zhi-mode-num zhi-number">
          ￥{{ orderdetailArray.total_price }}
        </div>
      </div>
      <div class="zhi-yunfei disflex">
        <div class="zhi-yunfei-text">运费</div>
        <div class="zhi-yunfei-num zhi-number">
          ￥{{ orderdetailArray.pay_postage }}
        </div>
      </div>
      <div class="zhi-pay disflex">
        <div class="zhi-mode-text">
          实付款: <span>{{ orderdetailArray.pay_price }}</span>
        </div>
      </div>
    </div>

    <div class="dian"></div>

    <!-- 底部按钮 -->
    <div class="details-bottom">
      <div class="zhifu-btn" v-show="zhifuboo">
        <div class="zhifu-back left" @click="detailsbtn">订单详情页</div>
        <div class="zhifu-leftbtn left" @click="quxiaoClick">取消订单</div>
        <van-dialog
          v-model="show"
          title="标题"
          show-cancel-button
          @confirm="confirm"
        >
          <p>是否取消该订单</p>
        </van-dialog>
        <div class="zhifu-rightbtn left" @click="jilizhifuClick">立即支付</div>

        <van-action-sheet v-model="shower" title="选择付款方式">
          <div class="liji-content">
            <div class="lijizhifu-weixbtn lijiflex" @click="lijibtn(0)">
              <div class="icon">图标</div>
              <div class="text">
                <div>微信支付<span>使用微信快捷支付</span></div>
              </div>
              <div class="go">></div>
            </div>
            <div class="lijizhifu-yueebtn lijiflex" @click="lijibtn(1)">
              <div class="icon">图标</div>
              <div class="text">
                <div>余额支付<span>当前可用余额:<span class="num">99.99</span></span></div>
              </div>
              <div class="go">></div>
            </div>
          </div>
        </van-action-sheet>

      </div>
      <div class="details-bottom-btn" v-show="!zhifuboo">申请退款</div>
      <div class="details-bottom-btn" v-show="!zhifuboo" @click="detailsbtndel">订单详情页</div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
// Dialog({ message: "提示" });
import OrderDetailsList from "@/components/orderdetailslist.vue";
export default {
  name: "OrderDetails",
  data() {
    return {
      orderdetailArray: [],
      active: 0,

      // 商品信息
      cartInfos: [],

      zhifuboo: false,

      // 取消订单提示
      show: false,

      shower: false,

      index:1,
    };
  },
  methods: {
    detailsbtn(){
      this.$router.push('/AllOrder/0')
    },
    detailsbtndel(){
      this.$router.push('/AllOrder/1')
    },
    quxiaoClick() {
      this.show = !this.show;
    },
    confirm() {
      this.$http
        .post("/api/order/cancel", { id: this.orderdetailArray.order_id })
        .then((d) => {
          console.log("取消订单=====》", d);
          if (d.data.status == 200) {
            this.$router.push("/AllOrder/0");
          }
        });
    },
    jilizhifuClick() {
      this.shower = !this.shower;
    },

    // 立即支付按钮
    lijibtn(index){
      this.shower=!this.shower
      this.index=index
      this.weixpay()
    },

    // 微信支付
    weixpay(){
      this.$http.post('/api/order/pay',{from: "weixinh5",
      paytype: this.index?'yue':'weixin',
      uni: this.orderdetailArray.order_id}).then(d=>{
        console.log(d);
        if(d.data.status==200){
          // this.$router.push('/')
          this.zhifuboo=false;
          this.active=1
          // window.alert('成功了')
        }else{
          window.alert('余额不足')
        }
      })
    }
  },
  components: {
    OrderDetailsList,
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {
    orderId: String,
  },
  mounted() {
    this.$http.get("/api/order/detail/" + this.orderId).then((d) => {
      console.log(d);
      this.orderdetailArray = d.data.data;
      console.log("this.orderdetailArray", this.orderdetailArray);
      this.cartInfos = this.orderdetailArray.cartInfo;
      console.log("cartIndo==============>", this.cartInfos);
      this.active = this.orderdetailArray._status._type;

      if (!this.active) {
        this.zhifuboo = true;
      } else {
        this.zhifuboo = false;
      }
    });
  },
};
</script>



<style lang="less" scoped>
.OrderDetails {
  .details-top {
    width: 100%;
    height: 70px;
    background-color: #e93323;
    display: flex;
    align-items: center;
    padding: 10px 10px;
    box-sizing: border-box;

    .details-top-img {
      width: 50px;
      height: 50px;
      background-color: #e93323;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .details-top-right {
      color: white;
      font-size: 14px;
      font-weight: 600;
      .details-top-time {
        margin-top: 12px;
        font-size: 12px;
        overflow: hidden;

        div {
          float: left;
          margin-right: 15px;
          font-weight: 200;
        }
      }
    }
  }

  .details-progress-box {
    width: 100%;
    background-color: white;
    .details-progress {
      width: 95%;
      margin: 0 auto;
    }
  }

  .details-contacts {
    width: 100%;
    margin: 0 auto;
    padding: 15px;
    position: relative;
    background-color: white;
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
      margin-left: 10px;
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
    }
    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 1px;
      background-image: linear-gradient(to right, #aeb0da, #9295ca);
      bottom: 0px;
    }
  }
  .details-lsit {
    .details-list-num {
      width: 100%;
      padding: 10px 0px 10px 15px;
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
      background-color: white;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin-top: 10px;
    }
    .details-list-service {
      width: 100%;
      padding: 10px 0px;
      background-color: white;
      text-align: center;
      color: #8a8dce;
      font-size: 14px;
      i {
        margin-right: 10px;
      }
    }
  }

  .disflex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
    font-size: 14px;
  }

  .details-order {
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: white;
    margin-top: 10px;
    overflow: hidden;
    .zhi-number {
      color: rgba(0, 0, 0, 0.4);
    }
  }

  .details-pay {
    width: 100%;
    padding: 15px 15px;
    box-sizing: border-box;
    background-color: white;
    overflow: hidden;
    .zhi-money {
      // padding-bottom: 10px;
      margin: 0px;
      .zhi-mode-num {
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .zhi-yunfei {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 10px;
      .zhi-yunfei-num {
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .zhi-pay {
      margin: 0px;
      // margin-top: 15px;
      float: right;
      .zhi-mode-text {
        span {
          margin-left: 10px;
          color: #8a8dce;
          font-weight: 600;
        }
      }
    }
  }
  .dian {
    width: 100%;
    height: 70px;
  }
  .details-bottom {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background-color: white;
    line-height: 50px;
    overflow: hidden;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 2;
    .zhifu-btn {
      float: right;
      p {
        text-align: center;
      }
      .left {
        border: 1px solid rgba(0, 0, 00, 0.1);
        border-radius: 15px;
        color: rgba(0, 0, 0, 0.4);
        padding: 0px 5px;
        height: 30px;
        margin-right: 15px;
        line-height: 30px;
        float: left;
        font-size: 14px;
        margin-top: 10px;
      }
      .zhifu-rightbtn {
        background-color: #e93323;
        border-color: #e93323;
        color: white;
      }
    }
    .details-bottom-btn {
      float: right;
      height: 30px;
      margin-right: 15px;
      padding: 0px 5px;
      line-height: 30px;
      font-size: 14px;
      border: 1px solid rgba(0, 0, 00, 0.1);
      border-radius: 15px;
      color: rgba(0, 0, 0, 0.4);
      //   top: 70%;
      transform: translateY(25%);
    }
  }

  // 立即支付弹窗样式
  .liji-content {
    width: 100%;
    .lijiflex {
      width: 95%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-left: 0px;
      border-right: 0px;
      margin: 0 auto;
      display: flex;
      height: 60px;
      // justify-content: center;
      align-items: center;
      .icon {
        width: 15%;
        text-align: center;
      }
      .text {
        width: 80%;
        text-align: start;
        // height: 60px;
        div{
          span{
            font-size: 13px;
            color: rgba(0, 0, 0, 0.4);
            margin-left: 10px;
          }
        }
      }
    }
    .lijizhifu-yueebtn{
      margin-bottom: 50px;
    }
  }
}
</style>