<template>
  <div class="AllOrderDetails" v-if="item.cartInfo.length">
    <!-- 顶部 -->
    <div class="alldetails-top">
      <div class="top-data">{{ item._pay_time }}</div>
      <div class="top-status">{{ item._status._title }}</div>
    </div>
    <!-- 商品列表 -->
    <div class="alldetails-content" @click="klkl">
      <div
        class="content-top"
        v-for="(list, indexs) in item.cartInfo"
        :key="indexs"
      >
        <div class="content-top-img">
          <img :src="list.productInfo.image" alt="" />
        </div>
        <div class="content-top-text">{{ list.productInfo.store_name }}</div>
        <div class="content-top-num">
          <p class="num-mon">￥{{ list.productInfo.attrInfo.price }}</p>
          <p class="num-number">x{{ list.cart_num }}</p>
        </div>
      </div>
      <div class="content-bottom">
        共{{ item.total_num }}件商品，总金额：<span
          >￥{{ item.pay_price }}</span
        >
      </div>
    </div>

    <!-- 查看详情按钮 -->
    <div class="alldetails-bottom">
      <div class="lookbtn" v-show="index===1" @click="klkl">查看详情</div>
      <div class="delivered_btn" v-show="index===0">
        <div class="quxbtn ddiv" @click="quxiaoClick">取消订单</div>
        <van-dialog
          v-model="show"
          title="标题"
          show-cancel-button
          @confirm="confirm"
        >
          <p>是否取消该订单</p>
        </van-dialog>
        <div class="lijibnt ddiv" @click="jilizhifuClick">立即付款</div>

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
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "AllOrderDetails",
  data() {
    return {
      list: [],
      btnboo: false,

      // 取消订单提示
      show: false,

      shower: false,
    };
  },


  props: {
    item: Object,
    index: Number,
  },


  created() {
    console.log("this.item========>", this.item);
  },


  methods: {
    quxiaoClick() {
      this.show = !this.show;
    },
    klkl() {
      console.log("3232323232323232", this.item);
      this.$router.push('/OrderDetails/'+this.item.order_id)
    },
    confirm() {
      this.$http
        .post("/api/order/cancel", { id: this.item.order_id })
        .then((d) => {
          console.log("取消订单=====》", d);
          if (d.data.status == 200) {
            window.location.reload()
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
      uni: this.item.order_id}).then(d=>{
        console.log(d);
        if(d.data.status==200){
          // this.$router.push('/')
          this.zhifuboo=true;
          window.alert('成功了')
        }else{
          window.alert('失败了')
        }
      })
    }
  },


  mounted() {
    console.log("item============>", this.time);
  },


  components:{
    [Dialog.Component.name]: Dialog.Component,
  }
};
</script>

<style lang="less" scoped>
.AllOrderDetails {
  background-color: white;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 5px;
  .alldetails-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    div {
      font-size: 13px;
    }
    .top-status {
      color: #8a8dce;
    }
  }
  .alldetails-content {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0px 15px 10px 15px;
    .content-top {
      display: flex;
      margin-top: 10px;
      justify-content: center;
      .content-top-img {
        width: 50px;
        height: 50px;
        background-color: red;
        box-sizing: border-box;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content-top-text {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-right: 20px;
        width: 50%;
        height: 36px;
      }
      .content-top-num {
        flex: 1;
        p {
          margin: 0px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.4);
          text-align: end;
        }
      }
    }
    .content-bottom {
      margin-top: 15px;
      text-align: end;
      font-size: 12px;
      span {
        color: #8a8dce;
        font-size: 14px;
        font-weight: 600;
        // margin-left: 5px;
      }
    }
  }
  .alldetails-bottom {
    padding: 10px 15px;
    overflow: hidden;
    .lookbtn {
      float: right;
      color: white;
      border-radius: 15px;
      padding: 5px 10px;
      background-color: #8a8dce;
      font-size: 13px;
    }
    .delivered_btn {
      float: right;
      .ddiv {
        float: left;
        padding: 5px 10px;
        font-size: 13px;
        border: 1px solid rgba(0, 0, 00, 0.3);
        border-radius: 15px;
        margin-left: 10px;
      }
      .lijibnt {
        background-color: #8a8dce;
        color: white;
        border-color: #8a8dce;
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
}
</style>