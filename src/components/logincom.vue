<template>
    <router-link tag="div" to="/login" class="logincom">
        <div class="box">登录后享受更多优惠</div>
        <div class="box">去登录 <i class="iconfont icon-right"></i></div>
    </router-link>
</template>


<style lang="less" scoped>
    .logincom{
        display: flex;
        width: 100%;
        height: 2.6rem;
        background-color: white;
    }
    .box{
        flex: 1;
        align-content: space-between;
        line-height: 2.6rem;
    }
    .box:nth-child(1){
        padding: 0 0 0 1rem;
    }
    .box:nth-child(2){
        text-align: right;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        padding: 0 1rem 0 0;
    }
    i{
        font-size: 15px;
    }
</style>