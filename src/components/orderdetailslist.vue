<template>
  <div class="ordertailslist">
    <div class="lsit-img"><img :src="item.productInfo.attrInfo.image" alt="" /></div>
    <div class="list-right">
      <div class="list-text-left">
        <div class="list-text-content">{{item.productInfo.store_name}}</div>
        <div class="list-text-attribute">{{item.productInfo.attrInfo.suk}}</div>
        <div class="lsit-text-money">￥{{item.productInfo.price}}</div>
      </div>
      <div class="list-text-right">x{{item.cart_num}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'OrderDetailsList',
  data(){
    return{
    }
  },
  props:{
    item:Object,
  },
  mounted(){
    console.log(this.item);
  }
}
</script>

<style lang="less" scoped>
.ordertailslist {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .lsit-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .list-right {
    width: 80%;
    font-size: 13px;
    align-items: center;
    display: flex;
    .list-text-left {
        flex: 1;
      .list-text-content {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .list-text-attribute{
          font-size: 12px;
          color: rgba(0, 0, 00, 0.6);
          margin: 2px 0px;
      }
      .lsit-text-money{
          color: #8A8DCE;
      }
    }
    .list-text-right{
        text-align: center;
        width: 10%;
    }
  }
}
</style>