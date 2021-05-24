<template>
  <div class="Set">
    <!-- 购物车头部 -->
    <div class="Set-top">
      <!-- 返回键 -->
      <div class="Set-top-box" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <!-- 标题 -->
      <div class="Set-top-box">个人信息</div>
    </div>
    <div class="Set-box"></div>


    <div class="Set-deta-box">
        <div class="Set-deta-box-top">管理物品的账号</div>
        <div class="Set-top-idbox">
            <div class="top-img"><img :src="Setarr.avatar" alt=""></div>
            <div class="top-text">
                <div class="top-text-name">{{Setarr.nickname}}</div>
                <div class="top-text-phonetext">绑定手机号：</div>
                <div class="top-text-phone">{{Setarr.phone}}</div>
            </div>
            <div class="top-right-icon">当前账号</div>
        </div>
    </div>

    <div class="Set-information">
        <div class="nc inflex">
            <div class="in-name">昵称</div>
            <div class="in-num num">{{Setarr.nickname}}</div>
        </div>
        <div class="ID inflex" v-for="(item,index) in Setarr.switchUserInfo" :key="index">
            <div class="ID-name">ID号</div>
            <div class="ID-num num">{{item.uid}}</div>
        </div>
        <div class="SJ inflex">
            <div class="SJ-name">手机号码</div>
            <div class="SJ-num num">{{Setarr.phone}}</div>
        </div>
        <div class="MM inflex">
            <div class="MM-name">密码</div>
            <div class="MM-num num" @click="mmClick">点击修改密码  <span>></span></div>
            
        </div>
        <InformationMM v-show="mmboo" :mmboo='mmboo' @backsi='backsi' :phone='this.Setarr.phone'></InformationMM>
    </div>

    <div class="Set-btn">
        <div class="btn-save btn">保存修改</div>
        <div class="btn-down btn" @click="out">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import InformationMM from '@/components/infomationmm.vue'
export default {
  name: "Set",
  data() {
    return {
        Setarr:[],
        key:'',

        mmboo:false,
    };
  },
  components:{
      InformationMM,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    out() {
      this.loginOut();
      setTimeout(() => {
        this.$router.push({
          path: "/login",
        });
      }, 1000);
    },
    mmClick(){
       this.mmboo=!this.mmboo
    },
    backsi(e){
        this.mmboo=e
    },
    ...mapMutations(["loginOut"]),
  },
  mounted() {
      this.$http("/api/user").then(d => {
      if (d.data.status !== 200) {
        this.$router.push("/login");
      }
      this.Setarr = d.data.data;
      console.log("Setarr==>", this.Setarr);
    });

    this.$http.get('/api/verify_code').then(d=>{
        this.key=d.data.key
        console.log(this.key);
    })
  },
};
</script>

<style lang="less" scoped>
.Set {
  // 头部
  .Set-top {
    width: 100%;
    height: 2.6rem;
    position: fixed;
    background-color: #8a8dce;
    z-index: 5;
  }
  // 头部的左中右三个盒子
  .Set-top-box {
    flex: 1;
    text-align: center;
    line-height: 2.6rem;
    color: white;
  }
  .Set-top-box:nth-child(1) {
    position: absolute;
    left: 10px;
  }
  .Set-top-box:nth-child(2) {
    text-align: center;
  }

  .Set-box {
    width: 100%;
    height: 2.6rem;
  }

  .Set-deta-box{
      width: 100%;
      padding: 10px;
     
      background-color: white;
      box-sizing: border-box;
      .Set-deta-box-top{
          margin-bottom: 10px;
      }
      .Set-top-idbox{
           position: relative;
          width: 90%;
          border-radius: 10px;
          margin: 0 auto;
          border: 1px solid #8A8DCE;
          display: flex;
        //   justify-content: center;
        align-items: center;
          .top-img{
              width: 50px;
              height: 50px;
              background-color: #8a8dce;
              border-radius: 50%;
              margin: 15px;
              margin-right: 10px;
              overflow: hidden;
              img{
                  width: 100%;
                  height: 100%;
              }
          }
          .top-text{
              
              div{
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.6);
              }
              .top-text-name{
                color: black;
                font-size: 15px;
              }
          }
          .top-right-icon{
              position: absolute;
              top: -1px;
              right: -1px;
              padding: 5px 10px;
              font-size: 13px;
              border: 1px solid #8A8DCE;
              border-top-right-radius: 10px;
              border-bottom-left-radius: 10px;
              color: #8A8DCE;
          }
      }
  }

  .Set-information{
      margin-top: 10px;
      .inflex{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          background-color: white;
          font-size: 14px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          .num{
              color: rgba(0, 0, 0, 0.4);
          }
      }
      .MM{
          border-bottom: 0px;
      }
  }

  .Set-btn{
      margin-top: 20px;
      width: 100%;
      overflow: hidden;
      .btn{
          width: 90%;
          margin: 0 auto;
          padding: 10px 0px;
          background-color: #8A8DCE;
          color: white;
          border-radius: 25px;
          text-align: center;
          margin-top: 10px;
      }
      .btn-down{
          background-color: transparent;
          border: 1px solid #8A8DCE;
          color: #8A8DCE;
      }
  }
}
</style>