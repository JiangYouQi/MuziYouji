<template>
  <router-link tag="li" :to="'/details/'+item.id">
    <img :src="item.image" alt />
    <div class="troducebox">
      <p class="listname">{{ item.store_name }}</p>
      <h6 class="listintroduce">已售{{item.sales}}件</h6>
      <p class="listinprice">￥{{ item.price }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {};
  },

  props: {
    item: Object,
  },
  created() {
    console.log("=======>", this.item);
  },
  methods:{

  },
  mounted(){

    // this.$http
  },
};
</script>

<style lang="less" scoped>
li {
  // flex: 1;
  width: 47.5%;
  margin-left: 1.25%;
  margin-right: 1.25%;
  height: 18rem;
  margin-bottom: 2.5%;
  background-color: white;
  // float: left;
  img {
    width: 100%;
    height: 70%;
  }
  .troducebox {
    padding: 0px 0px 0px 5px;
  }
  p,
  h6 {
    color: rgba(0, 0, 0, 0.6);
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.875rem;
    margin-bottom: 10px;
    font-weight: normal;
  }
  .listintroduce {
    font-size: 11px;
    color: rgba(0, 0, 0, 0.4);
  }
  .listinprice {
    font-size: 11px;
    color: red;
  }
}
</style>