<template>
  <div class="home">
    <!-- 头部，搜索框 -->
    <div class="head">
      <router-link tag="a" to="/classify" href class="aleft iconfont icon-sort" :style="`transform:${headerIconStyle}`"></router-link>
      <router-link tag="a" to="/personal" href class="aright iconfont icon-user" :style="`transform:${headerIconStyle}`"></router-link>
      <div class="top" :style="`transform:${logoSearchStyle }`">
        <div class="logo" :style="`transform:${logoSearchStyle && logoStyle}`">
          
          <img src="../assets/images/logo.gif" alt="">
        </div>
        <div class="search" :style="`transform:${searchStyle}`">
          <router-link tag="div" class="box" :to="{
            path:'/Search'
          }">
            <i class="iconfont icon-sousuo"></i>
            <span>商品搜索</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 半圆 -->
      <div class="main-box"></div>
      <!-- 轮播图 -->
      <div class="slideshow">
        <van-swipe class="my-swipe" indicator-color="white" height="250" :autoplay="3000">
          <van-swipe-item v-for="(item,index) in homelist.banner" :key='index'>
            <img
              :src="item.pic"
              alt
            />
          </van-swipe-item>
         
        </van-swipe>
      </div>

      <!-- 分类 -->
      <div class="nav">
        <van-grid :column-num="4">
          <van-grid-item
            v-for="(item,index) in homelist.menus"
            :key="index"
            :icon="item.pic"
            :text="item.name"
          />
        </van-grid>
      </div>

      <!-- 促销专区 -->
      <div class="promotion">
        <div class="promotionhead">
          超级单品
          <a href>
            限时促销
            <i>→</i>
          </a>
        </div>
        <div class="lunbox">
          <ul v-if="homelist.info">
            <li v-for="(item,index) in homelist.info.fastList" :key="index">
              <img :src="item.pic" alt />
              <p class="goodsname">{{item.cate_name}}</p>
              <!-- <p class="goodsprice">￥4545.00</p> -->
            </li>
           
          </ul>
        </div>
      </div>
      <div class="hot-ad">
        <van-grid :column-num="2" :gutter="5">
          <van-grid-item v-for="value in homeimg" :key="value">
            <img
              :src='value'
              alt
            />
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 秒杀专区 -->
      <div class="seckill">
        <div class="top">
          <van-divider
            :style="{fontSize:'0.6rem',margin:'0px', borderColor: 'rgba(0,0,0,0.8)', padding: '8px 8px 0px 8px' }"
          >
            <i class="iconfont icon-hot"></i> 秒杀专区
          </van-divider>
        </div>
        <div class="lunbox">
          <ul v-if="homelist.info">
            <li v-for="(item,index) in homelist.info.bastList" :key='index'>
              <img
                :src="item.image"
                alt
              />
              <p class="goodsname">{{item.store_name}}</p>
              <p class="goodsprice">￥{{item.price}}<del>￥{{item.vip_price}}</del></p>
             
            </li>
            
          </ul>
        </div>
      </div>

      <!-- 广告位 -->
      <div class="advertising">
        <van-swipe style="height: 216px;" :autoplay="5000" vertical height="108">
          <van-swipe-item>
            <img src="../assets/images/gg1.png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/images/gg2.gif" alt />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 推荐 -->
      <div class="recommend">
        <div class="recomhead">
          <van-divider
            :style="{fontSize:'0.6rem',margin:'0px', borderColor: 'rgba(0,0,0,0.8)', padding: '8px 8px 0px 8px' }"
          >
            <i class="iconfont icon-tuijian"></i> 倾情推荐
          </van-divider>
        </div>

        <div class="list">
          <ul v-if="homelist.info">
            <Recommend v-for="(item,index) in homelist.info.firstList" :key="index" :item='item'></Recommend>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Recommend from '@/components/recommend';
export default {
  name: "Home",
  components: {
    // HelloWorld
    Recommend
  },
  data() {
    return {
      headerIconStyle: "translate3d(0,0,0)",
      logoSearchStyle: "translate3d(0,0,0)",
      logoStyle: "scale3d(1,1,1)",
      searchStyle: "scale3d(1,1,1) translate3d(0,0,0)",

      homelist:[],
      homeimg:['https://image.demo.b2b2c.shopxx.net/7.0/981d45d0-f452-451f-b310-cb72c913f32d.jpg',
               'https://image.demo.b2b2c.shopxx.net/7.0/c2f4dbd5-6f55-4fc7-a309-7b6d423b5163.jpg',
               'https://image.demo.b2b2c.shopxx.net/7.0/325b678a-fce5-4391-a974-c730b04bd88e.jpg',
               'https://image.demo.b2b2c.shopxx.net/7.0/83f5fd4e-0a9f-481c-a789-d6f26c5cc133.jpg']
    };
  },
  mounted() {
    // 顶部导航栏动画
    window.onscroll = () => {
      // console.log(this);  
      let top = document.documentElement.scrollTop;
      if (top > 42) {
        this.headerIconStyle = "translate3d(0,10px,0)";
        this.logoSearchStyle = "translate3d(0,-35px,0)";
        this.logoStyle = "scale3d(0,0,0)";
        this.searchStyle = "scale3d(0.8,1,1) translate3d(0,-1px,0)";
      } else {
        this.headerIconStyle = "translate3d(0,0,0)";
        this.logoSearchStyle = "translate3d(0,0,0)";
        this.logoStyle = "scale3d(1,1,1)";
        this.searchStyle = "scale3d(1,1,1) translate3d(0,0,0)";
        
      }
    };
    console.log(this.$http);
    this.$http.get('/api/index').then((d)=>{
      this.homelist=d.data.data;
      console.log(this.homelist);
    })
  },
};
</script>
<style lang="less">
body {
  background-color: #f8f8f8;
}
.head {
  width: 100%;
  // height: 90px;
  position: fixed;
  z-index: 3;
  top: 0px;
  a {
    width: 20px;
    height: 20px;
    background-color: #8A8DCE;
    position: absolute;
    top: 10px;
    z-index: 1;
    transition: all 0.3s linear;
  }
  .aleft {
    left: 10px;
    color: white;
    font-size: 20px;
  }
  .aright {
    right: 10px;
     color: white;
    font-size: 20px;
  }
  .top {
    background-color: #8A8DCE;
    transition: all 0.3s linear;
    .logo {
      height: 44px;
      line-height: 44px;
      text-align: center;
      transition: all 0.3s linear;
      img{
        width: 44px;
        height: 100%;
        margin-top: 5px;
      }
    }
    .search {
      height: 46px;
      background-color: #8A8DCE;
      line-height: 46px;
      display: flex;
      width: 100%;
      z-index: 8;
      transition: all 0.3s linear;
      // justify-content: center;
      .box {
        width: 90%;
        height: 35px;
        background-color: white;
        margin: auto;
        line-height: 35px;
        border-radius: 8px;
        padding: 0px 10px 0px 10px;
      }
      i {
        width: 5%;
        // flex: 0.2;
        height: 35px;
        // text-align: center;
        line-height: 35px;
        display: inline-block;
      }
      span {
        display: inline-block;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
.main {
  width: 100%;
  // height: 5000px;
  margin-bottom: 90px;
  position: relative;
  // height: 500px;
  // background-color: red;

  //头部下面的垫脚石
  .main-box {
    width: 100%;
    height: 90px;
    // height: 50px;
  }
  //轮播图
  .slideshow {
    width: 95%;
    position: absolute;
    left: 0;
    z-index: 1;
    right: 0;
    height: 10rem;
    border-radius: 15px;
    margin: 10px auto;
    overflow: hidden;
    .van-swipe-item {
      // margin:0px 10px;
      overflow: hidden;
      // margin: 0px 10px;
    }
    img {
      // background-size: 110%;
      width: 100%;
      height: 160px;
      // border-radius: 15px;
    }
  }
  .van-swipe__track {
    // height: 160px !important;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    // line-height: 150px;
    text-align: center;
    // background-color: #39a9ed;
  }
  .van-swipe__indicator {
    width: 6px;
    height: 6px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0);
    border-radius: 3px;
  }
  .van-swipe__indicator--active {
    width: 10px;
  }

  //分类导航
  .nav {
    width: 95%;
    // border: 2px solid red;
    margin: auto;
    margin-top: 180px;
  }

  //限时促销
  .promotion {
    width: 95%;
    height: 11.3rem;
    background-color: white;
    margin: 10px auto;
    box-sizing: border-box;
    font-size: 13px;
    border-radius: 5px;
    a {
      float: right;
      color: blueviolet;
    }
    .promotionhead {
      //单品促销头部
      padding: 10px;
      background-image: url(../assets/images/chuxiaobg.png);
      background-size: 100%;
    }
  }
  .lunbox {
    margin-bottom: 10px;
    overflow: hidden;
    width: 95%;
    margin: auto;
    //轮播商品
    ul {
      width: 67rem;
      li {
        float: left;
        margin-right: 10px;
        width: 6rem;
        img {
          width: 100%;
          height: 100%;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0px;
        }
        .goodsname {
          font-size: 13px;
          margin-bottom: 0.6rem;
          text-align: center;
          color: rgba(0, 0, 0, 0.5);
        }
        .goodsprice {
          color: #8A8DCE;
          // font-weight: 100;
          font-size: 10px;
        }
      }
    }
  }

  //hot-ad 四格
  .hot-ad {
    width: 97.5%;
    margin: auto;
    .van-grid-item {
      // height: 6rem;
      overflow: hidden;
      // background-color: red;
      img {
        width: 100%;
        // height: 100%;
        background-size: 100%;
      }
      .van-grid-item__content--surround::after {
        border-width: 1px;
      }
    }
  }

  //秒杀专区
  .seckill {
    width: 95%;
    background-color: white;
    margin: 10px auto;
    padding-bottom: 10px;
    .top {
      width: 60%;
      margin: auto;
      margin-bottom: 10px;
    }
    i {
      color: #8A8DCE;
      margin-right: 4px;
      font-size: 0.6rem;
    }
    p {
      text-align: center;
      font-size: 10px;
      del{
        color: rgba(0, 0, 0, 0.5);
      }
    }
    ul{
      width: 78rem;
    }
    ul li{
      height: 10rem;
      width: 7rem;
      img{
        width: 86%;
        height: 70%;
      }
    }
  }

  // 广告位
  .advertising {
    width: 98%;
    margin: auto;
    height: 108px;
    overflow: hidden;
    // 轮播图大小
    .van-swipe-item {
      height: 108px !important;
      // background-color: red;
      img {
        width: 100%;
        margin: auto;
        height: 22vw;
        background-size: 100%;
        // background-position: center;
      }
    }
    //轮播图的点
    .van-swipe__indicators--vertical {
      top: 28%;
      // left: 0px;
      // right: 5px;
    }
    .van-swipe__indicator {
      width: 3px;
      height: 8px;
      top: 28%;
      border: 0px solid rgba(0, 0, 0, 0.5);
    }
  }

  // 推荐
  .recommend {
    // 头部
    .recomhead {
      width: 60%;
      margin: 10px auto;
      i {
        color: #8A8DCE;
        margin-right: 6px;
      }
    }

    // 商品布局
    .list {
      width: 100%;
      // margin: auto;
      ul {
        width:100%;
        display: flex;
        flex-wrap: wrap;
        // margin: auto;
        // margin-right: 2.5%;
        
      }
    }
  }
}
.main::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 90px;
  background-color: #8A8DCE;
  z-index: -2;
}
.main::after {
  content: "";
  width: 100%;
  height: 140px;
  top: 90px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  background-color: #8A8DCE;
  z-index: -2;
  position: absolute;
}
</style>
