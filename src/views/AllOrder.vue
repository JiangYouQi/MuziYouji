<template>
  <div class="Allorder">
    <div class="Allorder-top">
      <div class="Allorder-top-left">
        <div class="top-text">订单信息</div>
        <div class="top-details">
          累计订单：{{ information.order_count }}
          <span>总消费：￥{{ information.sum_price }}</span>
        </div>
      </div>
      <div class="Allorder-top-right">
        <img src="../assets/images/Allorder-top-img.png" alt="" />
      </div>

      <div class="switch-box">
        <div
          :class="['paid', 'flex', index == 0 ? 'active' : '']"
          @click="switchClick(0)"
        >
          <div class="box">
            <div class="text">待付款</div>
            <div class="num">{{ information.unpaid_count }}</div>
          </div>
        </div>
        <div
          :class="['delivered', 'flex', index == 1 ? 'active' : '']"
          @click="switchClick(1)"
        >
          <div class="box">
            <div class="text">待发货</div>
            <div class="num">{{ information.unshipped_count }}</div>
          </div>
        </div>
        <div
          :class="['received', 'flex', index == 2 ? 'active' : '']"
          @click="switchClick(2)"
        >
          <div class="box">
            <div class="text">待收货</div>
            <div class="num">{{ information.received_count }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="dian"></div>
    <div class="Allorder-lsit">
      <AllorderDetails
        v-for="(item, indexs) in switchArray"
        :key="indexs"
        :item="item"
        :index="index"
      ></AllorderDetails>
      <NoneAllorder v-show="!switchArray.lenght"></NoneAllorder>
    </div>
  </div>
</template>

<script>
import NoneAllorder from '@/components/noneAllorder.vue'
import AllorderDetails from "@/components/AllOrderDetails.vue";
export default {
  name: "AllOrder",
  data() {
    return {
      index: 0,
      information: [],
      type: 0,
      switchArray: [],
      allids: "",
    };
  },
  props: {
    pernumber:String,
  },
  methods: {
    
    switchClick(index) {
      this.index = index;
      this.switchFunction();
    },
    switchFunction() {
      this.$http
        .get("/api/order/list?page=1&limit=20&type=" + this.index)
        .then((d) => {
          console.log("点击多少啊===============》", d);
          this.switchArray = d.data.data;
        });
    },
  },
  components: {
    AllorderDetails,
    NoneAllorder,
  },
  mounted() {
    this.index=parseInt(this.pernumber)
    console.log(typeof this.pernumber);
    this.$http.get("/api/order/data").then((d) => {
      console.log(d, "ddddddddddddddddddddddddd");
      this.information = d.data.data;
    });
    this.$http
      .get("/api/order/list?page=1&limit=20&type=" + this.index)
      .then((d) => {
        console.log("初始化==============>", d);
        this.switchArray = d.data.data;
        console.log("this.switchArray=========>", this.switchArray);
        
      });
  },
};
</script>

<style lang="less" scoped>
.Allorder {
  .Allorder-top {
    width: 100%;
    position: relative;
    height: 120px;
    background-color: #8a8dce;
    padding: 20px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .Allorder-top-left {
      color: white;
      .top-text {
        font-size: 15px;
      }
      .top-details {
        margin-top: 5px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
    .Allorder-top-right {
      width: 60px;
      height: 60px;
      background-color: red;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .switch-box {
    width: 95%;
    height: 50px;
    background-color: white;
    // border-radius: 10px;
    position: absolute;
    z-index: 8;
    bottom: 0px;
    border-radius: 5px;
    left: 50%;
    transform: translate(-50%, 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    .flex {
      flex: 1;
      text-align: center;
      // color: white;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.5);
      .text {
        margin-bottom: 5px;
      }
    }
    .active {
      position: relative;
      color: black;
      font-weight: 600;
      &::after {
        content: "";
        display: block;
        width: 40%;
        height: 2px;
        background-color: #8a8dce;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .dian {
    width: 100%;
    height: 50px;
  }
}
</style>