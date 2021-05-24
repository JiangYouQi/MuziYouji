<template>
  <div class="register">
    <!-- 顶部导航栏 -->
    <div class="register-top">
      <div class="back" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="title">注册</div>
    </div>
    <!-- 垫脚石 垫高的盒子 -->
    <div class="stone-box"></div>
    <!-- 输入盒子 -->
    <div class="register-box">
      <div class="register-box-list">
        <!-- 用户名 -->
        <div class="username reg-inp">
          <!-- 框前星星点 -->
          <span class="stars">*</span>
          <i class="iconfont icon-phone"></i>
          <input type="text" placeholder="手机号" v-model="phoneNumber" />
        </div>
        <div class="short">
          <!-- 框前星星点 -->
          <span class="stars">*</span>
          <i class="iconfont icon-duanxin"></i>
          <input type="text" placeholder="填写验证码" v-model="code" />
          <!-- v-model="code" -->
          <input
            type="button"
            class="codebtn"
            :value="codoText"
            @click="sendCode"
          />
          <!--  @click="sendCode"  -->
        </div>
        <!-- 密码 -->
        <div class="password reg-inp">
          <!-- 框前星星点 -->
          <span class="stars">*</span>
          <i class="iconfont icon-suo"></i>
          <input type="text" placeholder="密码" v-model="password" />
        </div>
        <!-- 确认密码 -->
        <!-- <div class="yespassword reg-inp">
          框前星星点
          <span class="stars">*</span>
          <i class="iconfont icon-querenmima"></i>
          <input type="text" placeholder="确认密码" v-model="password"/>
        </div> -->
      </div>
    </div>
    <!-- 勾选是否记住用户名 -->
    <div class="Check">
      <input type="checkbox" name="checkuser" id="" />
      <span>我已阅读并同意《<span>注册协议</span>/<span>隐私政策</span>》</span>
    </div>

    <!-- 注册按钮 -->
    <div class="register-btn" @click="registerbtn">注册</div>
    <!-- 立即登录 -->
    <router-link tag="div" to="/login" class="login-btn">立即登录</router-link>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      codoText: "获取短信验证码",
      phoneNumber: "",
      code: "",
      password: "",
      key: null,
    };
  },
  created() {
    this.$http("/api/verify_code").then((d) => {
      console.log("key==>", d);
      this.key = d.data.data.key;
    });
  },
  methods: {
    // 返回上一层
    back() {
      this.$router.go(-1);
    },
    // 发送验证码
    sendCode() {
      console.log(this.key);

      //发送验证码
      this.$http
        .post("api/register/verify", {
          code: "",
          key: this.key,
          phone: this.phoneNumber,
          type: "register",
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
    // 注册按钮点击 注册
    registerbtn() {
      if (this.phoneNumber == "") {
        this.$toast("手机号不能为空");
        return;
      }
      if (this.code == "") {
        this.$toast("验证码不能为空");
        return;
      }
      if (this.password == "") {
        this.$toast("密码不能为空");
        return;
      }
      this.$http
        .post("/api/register", {
          account: this.phoneNumber,
          captcha: this.code, 
          password: this.password,
          spread: null,
        })
        .then((res) => {
         // console.log('注册==>',d);
          if (res.status == 200) {
            this.$toast.success(res.data.msg);
            setTimeout(() => {
              this.$router.push({
                path: "/login",
              });
            }, 3000);
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
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100vh;
  background-color: white;
  .register-top {
    width: 100%;
    height: 40px;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    box-shadow: 10px 1px 5px rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0px;
    // display: flex;
    // justify-items: center;
    z-index: 1;
    .back {
      position: absolute;
      top: 50%;
      // bottom: ;
      // margin: auto;
      transform: translateY(-50%);
      left: 5px;
    }
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  // 垫高的垫子
  .stone-box {
    width: 100%;
    height: 4rem;
  }
  // 输入框
  .register-box-list {
    margin-top: 3rem;
    width: 80%;
    margin: auto;

    .reg-inp {
      position: relative;
    }
    // 框前星星点
    .stars {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -0.8rem;
      color: #8A8DCE;
    }
    div {
      margin-top: 20px;
      i {
        margin-right: 10px;
        color: rgba(0, 0, 0, 0.4);
      }
      input {
        border: 0px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 10px;
        font-size: 13px;
        width: 80%;
      }
    }
  }
  // 勾选是否记住用户名
  .Check {
    //  text-align: left;
    margin-left: 1rem;
    margin-top: 1rem;
    span {
      //    line-height: 18px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
      span {
        color: #8A8DCE;
      }
    }
  }
  .Check input {
    width: 10%;
    // border-radius: 50%;
  }

  // 注册按钮
  .register-btn {
    width: 80%;
    height: 40px;
    background-color: #8A8DCE;
    color: white;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
    margin: 20px auto;
  }

  // 登录按钮
  .login-btn {
    width: 18%;
    font-size: 13px;
    margin: auto;
    color: rgba(0, 0, 0, 0.8);
  }
}
// 短信验证
.short {
  position: relative;
}
// 获取短信验证码
.short .codebtn {
  padding: 0px !important;
  border: 0px !important;
  background-color: white;
  color: #8A8DCE;
  position: absolute;
  right: 1rem;
  width: 6rem !important;
  font-size: 0.5rem !important;
  top: 50%;
  transform: translateY(-50%);
}
</style>