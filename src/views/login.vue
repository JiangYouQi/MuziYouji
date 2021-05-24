<template>
  <div class="login">
    <!-- 顶部导航栏 -->
    <div class="login-top">
      <div class="back" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="title">用户名登陆</div>
    </div>
    <!-- 垫脚石 垫高的盒子 -->
    <div class="stone-box"></div>
    <!-- 用户名与短信登陆切换 用了组件 -->
    <div class="login-box">
      <van-tabs v-model="active" background="rgba(0,0,0,0)" color="#8A8DCE" @change='onchanges'>
        <van-tab title="手机号登陆">
          <div class="user-box">
            <div class="username">
              <i class="iconfont icon-user"></i>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="phoneNumber"
              />
            </div>
            <div class="password">
              <i class="iconfont icon-suo"></i>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="password"
              />
            </div>
            <!-- <div class="userall">
                    <i class="iconfont icon-yanzhengma"></i>
                    <input type="text" placeholder="请输入验证码" v-model="Verification ">
                </div> -->
            <!-- 勾选是否记住用户名 -->
            <!-- <div class="Check">
              <input type="checkbox" name="checkuser" id="" />
              <span>记住用户名</span>
            </div> -->
          </div>
        </van-tab>
        <van-tab title="短信登陆">
          <div class="user-box">
            <div class="username">
              <i class="iconfont icon-phone"></i>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="phoneNumber"
              />
            </div>
            <div class="short">
              <i class="iconfont icon-duanxin"></i>
              <input type="text" placeholder="填写验证码" v-model="code" />
              <input type="button" :value="codoText" @click="sendCode" />
            </div>

            <!-- 勾选是否记住用户名 -->
            <!-- <div class="Check">
              <input type="checkbox" name="checkuser" id="" />
              <span>记住手机号码</span>
            </div> -->
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 登陆按钮 -->
    <div class="login-btn" @click="login_btn">登陆</div>

    <!-- 注册及忘记密码 -->
    <div class="register-forget">
      <router-link tag="span" to="/register" class="register"
        >立即注册</router-link
      >
      <!-- <span class="line"></span>
      <router-link tag="span" to="/forget" class="forget">忘记密码</router-link> -->
    </div>

    <div class="copyright">
      版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权版权
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      active: 0,
      phoneNumber: "",
      code: "",
      password: "",
      key: null,
      codoText: "获取短信验证码",
    };
  },
  created() {
     this.$http('/api/verify_code').then((d)=>{
        console.log('key==>',d);
        this.key=d.data.data.key
      })
  },
  methods: {
    onchanges(name,title){
      console.log(name);
      console.log(title);
      this.active = name;
    },
    back() {
      this.$router.go(-2);
    },
    code_login() {
      if (this.phoneNumber == "") {
        this.$toast("手机号不能为空");
        return;
      }
      if (this.code == "") {
        this.$toast("验证码不能为空");
        return;
      }
      
      this.$http
        .post("/api/login/mobile", {
          phone: this.phoneNumber,
          captcha: this.code,
          spread: null,
        })
        .then((res) => {
          console.log('验证码登录==>',res);
          if (res.data.status == 200) {
            this.login(res.data.data.token)
            this.$toast.success(res.data.msg);
            setTimeout(() => {
              this.$router.push({
                path: "/personal",
              });
              console.log('验证码登录成功===========');
            }, 2000);
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
    },
    sendCode() {
      console.log(this.key);
     
      //发送验证码
      this.$http
        .post("api/register/verify", {
          code: "",
          key: this.key,
          phone: this.phoneNumber,
          type: "login",
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
    password_login() {
      //密码登录
      if (this.phoneNumber == "") {
        this.$toast("手机号不能为空");
        return;
      }
      if (this.password == "") {
        this.$toast("密码不能为空");
        return;
      }
      
      this.$http
        .post("/api/login", {
          account: this.phoneNumber,
          code: this.code,
          password: this.password,
        })
        .then((res) => {
          console.log("登录==>", res);
          if (res.data.status == 200) {
            // 调用mutation
            this.login(res.data.data.token);
            // 调用vuex action
            this.getLoginUser(res.data.data.token);
            this.$toast.success(res.data.msg);
            setTimeout(() => {
              this.$router.push({
                path: "/personal",
              });
            }, 2000);
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
    },

// 登录按钮
    login_btn(){
      if(this.active==0){
        this.password_login();
      }else{
        this.code_login()
      }
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
    ...mapMutations(["login"]),
    ...mapActions(["getLoginUser"]),

    //   ...mapMutations(['login'])
  },
  mounted() {
    this.key = this.$route.query.key;
  },
};
</script>

<style lang="less" scoped>
.active::placeholder {
  color: #8A8DCE;
}
.login {
  width: 100%;
  height: 100vh;
  background-color: white;
  // 登陆页面顶部导航栏
  .login-top {
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
    height: 6rem;
  }
  // 登陆的盒子
  .login-box {
    // width: 15rem;
    margin: auto;
  }
  // 登入输入的输入框及图标
  // 用户名登陆
  .user-box {
    margin-top: 3rem;
    width: 80%;
    margin: auto;
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
    // 勾选是否记住用户名
    .Check {
      text-align: right;
      span {
        //    line-height: 18px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .Check input {
      width: 10%;
    }

    // 短信登陆
    // 短信验证
    .short {
      position: relative;
    }
    // 获取短信验证码

    input[type="button"] {
      padding: 0px;
      border: 0px;
      background-color: white;
      color: #8A8DCE;
      position: absolute;
      right: 1rem;
      width: 6rem;
      font-size: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  // 登陆按钮
  .login-btn {
    width: 80%;
    height: 45px;
    background-color: #8A8DCE;
    color: white;
    line-height: 45px;
    text-align: center;
    border-radius: 8px;
    margin: 20px auto;
  }

  // 注册及忘记密码
  .register-forget {
    width: 50%;
    margin: auto;
    // display: flex;
    // justify-items: center;
    text-align: center;
    span {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }
    .line {
      width: 1px;
      height: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      display: inline-block;

      margin: 0 15px;
    }
  }

  // 版权
  .copyright {
    width: 80%;
    margin: 0px auto;
    margin-top: 8rem;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
  }
}
</style>