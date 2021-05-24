<template>
  <div class="orderlist">
    <div class="order-shopplist-item">
      <div class="img">
        <img alt="" :src="this.item.productInfo.image"/>
      </div>
      <div class="content">
        <p class="miaoshu">
          {{this.item.productInfo.store_name}}
        </p>
        <p class="shux">属性：{{this.item.productInfo.attrInfo.suk}}</p>
        <p class="price">￥<span>{{this.item.truePrice}}</span></p>
      </div>
      <div class="num">
        <div class="num-num"><i>X</i> {{this.item.cart_num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'orderlist',
  data(){
    return{
      
    }
  },
  props:{
    item:Object,
  },
}
</script>

<style lang="less" scoped>
p {
  padding: 0px;
  margin: 0px;
}
.orderlist {
  //   width: 100%;
  //   background-color: red;
  margin-top: 10px;
  padding: 10px 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
}

.order-shopplist-item {
  display: flex;
  position: relative;
  
  .img {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    // border: 1px solid red;
    border-radius: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .content {
    // height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 5px;
    // margin-left: 5px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    .shux {
      color: rgba(0, 0, 0, 0.3);
      font-size: 12px;
    }
    .price {
      color: #8a8dce;
      font-size: 12px;
      span {
        font-size: 14px;
        font-weight: 600;
      }
    }
    .miaoshu {
     text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;      
    }
  }
  .num {
    position: absolute;
    right: 10px;
    bottom: 25px;
    display: flex;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.4);

    div {
      padding: 5px 10px;
    }
    
  }
}
</style>