<template>
  <div class="zhifustatus">
    <div class="zhifu-box">
      <div class="zhi-top">
        <div :class="['zhi-top-icon',  zhifulsit._status._type ? 'active': '']">
            {{ zhifulsit._status._type ? "√" : "×" }}
        </div>
        <div class="zhi-top-text">
          {{ zhifulsit._status._type ? "订单支付成功" : "订单支付失败" }}
        </div>
      </div>
      <div class="zhi-content">
        <div class="zhi-num disflex">
          <div class="zhi-num-text">订单编号</div>
          <div class="zhi-num-num zhi-number">{{ zhifulsit.order_id }}</div>
        </div>
        <div class="zhi-time disflex">
          <div class="zhi-time-text">下单时间</div>
          <div class="zhi-time-num zhi-number">{{ zhifulsit._pay_time }}</div>
        </div>
        <div class="zhi-mode disflex">
          <div class="zhi-mode-text">支付方式</div>
          <div class="zhi-mode-num zhi-number">
            {{ zhifulsit._status._payType }}
          </div>
        </div>
        <div class="zhi-money disflex">
          <div class="zhi-mode-text">支付金额</div>
          <div class="zhi-mode-num zhi-number">{{ zhifulsit.pay_price }}</div>
        </div>
      </div>

      <div class="zhi-orderbtn" @click="lookorder">查看订单</div>
      <router-link tag="div" to="/" class="zhi-backbtn">返回首页</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "zhifustatus",
  props: {
    orderId: String,
  },
  data() {
    return {
      zhifulsit: [],
    };
  },
  methods:{
      lookorder(){
          this.$router.push('/OrderDetails/'+this.zhifulsit.order_id)
      },
  },
  mounted() {
    this.$http.get("/api/order/detail/" + this.orderId).then((d) => {
      console.log("1111111111111111111111", d);
      this.zhifulsit = d.data.data;
      console.log("this.zhifulist=======>", this.zhifulsit);
    });
  },
};
</script>
<style lang="less" scoped>
.zhifustatus {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .zhifu-box {
    width: 95%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    .zhi-top {
      padding: 20px 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      text-align: center;
      margin-bottom: 10px;
      .zhi-top-icon {
        position: absolute;
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        color: white;
        font-weight: 700;
      }
      .active {
        background-color: #8A8DCE;
      }
      .zhi-top-text {
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }

    .zhi-content {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 10px;
      margin-bottom: 20px;
      overflow: hidden;
      .disflex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0px;
        font-size: 14px;
      }
      .zhi-number {
        color: rgba(0, 0, 0, 0.4);
      }
    }

    .zhi-orderbtn,
    .zhi-backbtn {
      width: 95%;
      height: 40px;
      background-color: #8a8dce;
      text-align: center;
      line-height: 40px;
      border-radius: 30px;
      color: white;
      font-size: 14px;
      margin: 0 auto;
      margin-bottom: 10px;
      border: 1px solid #8a8dce;
    }
    .zhi-backbtn {
      background-color: transparent;
      color: #8a8dce;
    }
  }
}
</style>