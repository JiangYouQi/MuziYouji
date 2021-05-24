<template>
  <div class="forget">
    <!-- 顶部导航栏 -->
    <div class="forget-top">
      <div class="back" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="title">忘记密码</div>
    </div>
    <!-- 垫脚石 垫高的盒子 -->
    <div class="stone-box"></div>
    <!-- 输入盒子 -->
    <div class="forget-box-list">
        <!-- 用户名 -->
        <div class="username reg-inp">
          <!-- 框前星星点 -->
          <span class="stars">*</span>
          <i class="iconfont icon-user"></i>
          <input type="text" placeholder="用户名/E-mail/手机" />
        </div>
        <!-- 密码 -->
        <div class="password reg-inp">
          <!-- 框前星星点 -->
          <span class="stars">*</span>
          <i class="iconfont icon-suo"></i>
          <input type="text" placeholder="密码" />
        </div>
        <!-- 验证码 -->
        <div class="Code reg-inp">
          <!-- 框前星星点 -->
          <span class="stars">*</span>
          <i class="iconfont icon-yanzhengma"></i>
          <input type="text" placeholder="验证码" />
        </div>
      </div>
      <!-- 提交按钮 -->
    <div class="submit-btn">提交</div>
  </div>
</template>

<script>
export default {
  name: "forget",
  methods:{
      back(){
          this.$router.go(-1);
      }
  }
};
</script>

<style lang="less" scoped>
.forget {
  width: 100%;
  height: 100vh;
  background-color: white;
  .forget-top {
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
  .forget-box-list {
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
      color: rgba(255, 0, 0, 0.7);
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
  // 注册按钮
    .submit-btn{
        width: 80%;
        height: 40px;
        background-color: rgba(255, 0, 0, 0.8);
        color: white;
        line-height: 40px;
        text-align: center;
        border-radius: 6px;
        margin: 20px auto;
    }
}
</style>