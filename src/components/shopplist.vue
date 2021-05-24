<template>
  <div class="shopplist">
    <div class="checkbox"><input type="checkbox" :checked="check" @change="checkchange"/></div>
    <div class="shopplist-right">
      <div class="img">
        <img :src="item.productInfo.image" alt="" />
      </div>
      <div class="content">
        <p class="misoshu">{{ item.productInfo.store_name }}</p>
        <p class="shux">属性：{{item.productInfo.attrInfo.suk}}</p>
        <p class="price">
            ￥<span>{{item.truePrice}}</span>
        </p>
      </div>
      <div class="num">
          <div class="num-down" @click="numdown">-</div>
          <div class="num-num">{{num}}</div>
          <div class="num-up" @click="numup">+</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopplist",
  data() {
    return {
        num:this.myNum,
        check:false,
    };
  },
  props: {
    item: Object,
    checked:Boolean,
    myNum:Number,
    myPrice:Number
  },
  watch:{
      num(newNum,oldNum){
          if(this.check){
              this.$emit('checkchange',{check:this.check,num:newNum-oldNum,id:this.item.id,changenum:true})
          }
      },
      checked(){
          this.check = this.checked
      }
  },
  methods:{
      numdown(){
          if(this.num <=1){
              window.alert('最少购买一件商品');
              return;
              
          }
          this.num--;
      },
      numup(){
         
          this.num++;
           console.log(this.num);
      },
      checkchange(){
        this.check=!this.check;
        console.log(this.check);
        this.$emit('checkchange',{check:this.check,num:this.num,id:this.item.id})
      }
  }
};
</script>

<style lang="less" scoped>
p {
  padding: 0px;
  margin: 0px;
}
.shopplist {
  //   width: 100%;
  //   background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 5px 5px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
 
}
.checkbox {
}
.shopplist-right {
  display: flex;
  flex: 1;
  position: relative;
  .img {
    width: 100px;
    height: 100px;
    padding: 5px 10px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
  .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 0px;
    .misoshu {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
    }
    .shux{
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
    }
    .price{
        color: #8A8DCE;
        font-size: 12px;
        span{
            font-size: 15px;
            font-weight: 600;
        }
    }
  }
  .num{
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 10px;
      right: 10px;
      div{
          padding: 5px 10px;
            border: 1px solid black;
      }
      .num-down{
          border-right: 0px;
      }
      .num-up{
          border-left: 0px;
      }
  }
}
</style>