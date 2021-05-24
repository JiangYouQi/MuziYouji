<template>
  <div class="Classify">
    <div class="top">
      <div class="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="title">商品分类</div>
    </div>
    <div class="classify-list">
      <van-tabs v-model="active" scrollspy sticky @click="ontab">
        <!-- :class="active==index?'strip':''" -->
        <van-tab
          v-for="(item, index) in classifylist"
          :title="item.cate_name"
          :key="index"
        >
          <van-divider
            :style="{
              color: 'rgba(0,0,0,0.8)',
              borderColor: 'rgba(0,0,0,0.4)',
              padding: '0 16px',
            }"
          >
            {{ item.cate_name }}
          </van-divider>
          <ul class="class-ul">
            <ClassifyItem v-for="(list,index) in item.children" :key='index' :list='list'></ClassifyItem>
          </ul>
        </van-tab>
        <div class="van-tab-box"></div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ClassifyItem from '@/components/classifyitem'
export default {
  name: "Classify",
  components:{
    ClassifyItem,
  },
  data() {
    return {
      active: 0,
      classifylist: [],
    };
  },
  mounted() {
    this.$http.get("/api/category").then((d) => {
      this.classifylist = d.data.data;
      console.log("clss==>", this.classifylist);
    });
  },
  methods: {
    ontab(name, title) {
      this.active = name;
      console.log(name, title);
    },
  },

};
</script>


<style lang="less">
.Classify {
  .top {
    width: 100%;
    height: 40px;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    box-shadow: 10px 1px 14px #888888;
    position: fixed;
    top: 0px;
    z-index: 1;
    .back {
      position: absolute;
      top: 50%;
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

  // 分类条改动
  .classify-list {
    position: relative;
    .van-tab-box {
      width: 100%;
      height: 90px;
    }
    .van-tabs__wrap--scrollable .van-tab {
      padding: 0px;
    }
    .van-tabs {
      height: 100vw;
      .van-tabs__content {
        margin-top: 65px;
        margin-left: 80px;
        text-align: center;
      }
      .van-sticky {
        display: inline-block;
        position: fixed;
        top: 42px;
        z-index: 0;
      }
      .van-sticky--fixed {
        z-index: 0;
      }
      .van-tabs__wrap {
        height: 100vh;
        width: 80px;
        z-index: 1;
      }
      .van-tabs__nav {
        display: inline-block;
      }
      .van-tabs__line {
        height: 0px;
      }
      .van-tabs__wrap {
        overflow: none;
      }
      .van-tabs__wrap--scrollable .van-tab {
        height: 10vh;
      }
    }
    // 左边分类条字体
    .van-tab__text {
      width: 56px;
    }
  }
  // 左边分类选中效果
  .van-tab--active {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 4px;
      height: 20px;
      background-color: #8A8DCE;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .class-ul{
    overflow: hidden;
    width: 85%;
    margin: auto;
  }
}
</style>

