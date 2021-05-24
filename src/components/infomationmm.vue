<template>
  <div class="infomationmm">
    <!-- 购物车头部 -->
    <div class="infomationmm-top">
      <!-- 返回键 -->
      <div class="infomationmm-top-box" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <!-- 标题 -->
      <div class="infomationmm-top-box">修改密码</div>
    </div>
    <div class="infomationmm-box"></div>

    <div class="input">
      <div class="input-title">当前手机号:{{this.phone}}</div>
      <div class="input-box">
        <div class="input-box-newmm inp">
          <input type="password" placeholder="设置新密码" v-model="playmima" />
        </div>
        <div class="input-box-again inp">
          <input type="password" placeholder="确认新密码" v-model="qrmima" />
        </div>
        <div class="input-box-yz inp">
          <input type="text" placeholder="填写验证码" v-model="ryzm" />
          <input
            type="button"
            :value="codoText"
            @click="sendCode"
            class="codebtn"
          />
        </div>
      </div>
      <div class="submit" @click="submit">确认修改</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Infomationmm",
  data() {
    return {
      playmima: "",
      qrmima: "",
      ryzm: "",
      key: null,
      codoText: "获取短信验证码",
    };
  },
  props:{
      phone:String
  },
  created() {
     this.$http('/api/verify_code').then((d)=>{
        console.log('key==>',d);
        this.key=d.data.data.key
      })
  },

  methods: {
    back() {
      this.$emit("backsi", false);
    },

    sendCode() {
      console.log(this.key);
     
      //发送验证码
      this.$http
        .post("/api/register/verify", {
          code: "",
          key: this.key,
          phone: this.phone,
        })
        .then((res) => {
          // console.log('发送验证码',res);
          if (res.data.status == 200) {
            this.sendCode_changeCodeText();
            this.$toast.success(res.data.msg);
          } else {
            //   这里有用到vant的轻提示
            this.$toast.fail(res.data.msg);
          }
        });
    },

    submit() {
      if (this.playmima == "") {
        this.$toast("新密码不能为空");
        return;
      }else if(!(this.playmima.length >=6 && this.playmima.length<=16)){
          this.$toast("密码长度为6-16");
        return;
      }
      if (this.qrmima == "") {
        this.$toast("确认密码不能为空");
        return;
      }else if(!(this.qrmima.length >=6 && this.qrmima.length<=16)){
          this.$toast("密码长度为6-16");
        return;
      }
      if(!(this.playmima == this.qrmima)){
          this.$toast('两次密码不一样')
          return;
      }
      if (this.ryzm == "") {
        this.$toast("验证码不能为空");
        return;
      }else if(!(this.ryzm.length==6)){
          this.$toast("验证码不正确");
        return;
      }
      this.$http
        .post("/api/register/reset", {
            account: this.phone,
          captcha: this.ryzm,
          code: "",
          password: this.playmima,
        })
        .then((res) => {
          console.log('验证码登录==>',res);
          if (res.data.status == 200) {
            // this.login(res.data.data.token)
            this.$toast.success(res.data.msg);
            setTimeout(() => {
              this.$router.push({
                path: "/login",
              });
              console.log('验证码登录成功===========');
            }, 2000);
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
    },

    sendCode_changeCodeText() {
      // 发送验证码文本倒计时逻辑
      if (!this.isSendCode) {
        this.isSendCode = true;
        let time = 60;
        this.codoText = `剩余${time}s`;
        let timer = null;
        clearInterval(timer);
        timer = setInterval(() => {
          if (time < 2) {
            clearInterval(timer);
            this.codoText = "获取验证码";
            this.isSendCode = false;
          } else {
            time--;
            this.codoText = `剩余${time}s`;
          }
        }, 1000);
      }
    },
  },
  mounted() {},
  // props:{
  //     mmboo:Boolean,
  // }
};
</script>

<style lang="less" scoped>
.infomationmm {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  background-color: white;

  // 头部
  .infomationmm-top {
    width: 100%;
    height: 2.6rem;
    position: fixed;
    background-color: #8a8dce;
    z-index: 5;
  }
  // 头部的左中右三个盒子
  .infomationmm-top-box {
    flex: 1;
    text-align: center;
    line-height: 2.6rem;
    color: white;
  }
  .infomationmm-top-box:nth-child(1) {
    position: absolute;
    left: 10px;
  }
  .infomationmm-top-box:nth-child(2) {
    text-align: center;
  }

  .infomationmm-box {
    width: 100%;
    height: 2.6rem;
  }

  .input {
    .input-title {
      text-align: center;
      margin: 30px 0px;
      font-size: 14px;
      font-weight: 600;
    }
    .input-box {
      margin-top: 50px;
      .inp {
        width: 80%;
        margin: 15px auto;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(00, 0, 0, 0.1);
        input {
          width: 100%;
          border: 0px;
        }

        .codebtn {
          width: auto;
          background-color: transparent;
          border: 0px;
          position: absolute;
          // float: right;
          top: -8%;
          right: 0px;
          font-size: 14px;
          color: #8a8dce;
        }
      }
      .input-box-yz {
        position: relative;
      }
    }
    .submit {
      width: 80%;
      padding: 10px 0px;
      background-color: #8a8dce;
      margin: 30px auto;
      border-radius: 30px;
      text-align: center;
      color: white;
      font-size: 14px;
    }
  }
}
</style>