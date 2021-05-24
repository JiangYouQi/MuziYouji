<template>
    <!-- 查询购物车是否为空的组件 -->
    <div class="shopinq">
        <i class="iconfont icon-qicheqianlian-"></i>
        <span>购物车还是空的</span>
        <router-link tag="button" to="/">去逛逛</router-link>
    </div>
</template>

<style lang="less" scoped>

    .shopinq{
        text-align: center;
        width: 100%;
        height: 3.3rem;
        line-height: 3.3rem;
        background-color: #EBEBEB;
        i{
            font-size: 1.2rem;
            
        }
        span{
            font-size: 0.8rem;
            color: rgba(0, 0, 0, 0.5);
            margin: 0 10px;
        }
        button{
            list-style: none;
            border: 1px solid rgba(0, 0, 0, 0.3);
            width: 4rem;
            height: 1.5rem;
            font-size: 12px;
            line-height: 1.5rem;
        }
    }
</style>