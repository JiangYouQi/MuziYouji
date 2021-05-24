<template>
  <li>
    <img :src="list.pic" alt />
    <p>{{list.cate_name}}</p>
  </li>
</template>

<script>
export default {
  name: "classifyitem",
  props:{
      list:Object,
  }

};
</script>
<style lang="less" scoped>
li {
  width: 6rem;
  height: 6rem;
  float: left;
  margin: 10px 0px;
  img {
    width: 80%;
    height: 80%;
  }
  p{
      color: rgba(0, 0, 0, 0.6);
      margin: 0px auto;
      font-size: 13px;
  }
}
</style>