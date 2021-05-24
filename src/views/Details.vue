<template>
  <div class="productDetails">
    <!-- 头部导航栏 -->
    <div class="nav" ref="nav">
      <van-nav-bar
        left-arrow
        :fixed="true"
        :placeholder="false"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #title>
          <van-tabs v-model="active" :line-width="20">
            <van-tab title="商品"></van-tab>
            <van-tab title="评价"></van-tab>
            <van-tab title="详情"></van-tab>
            <van-tab title="推荐"></van-tab>
          </van-tabs>
        </template>
        <template #right>
          <van-icon name="ellipsis" :size="20" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 垫的 -->
    <div class="dian"></div>
    <!-- 主体部分 -->
    <div class="main">
      <!-- 轮播部分 -->
      <div class="lunbo">
        <van-swipe :autoplay="3000">
          <van-swipe-item
            v-for="(item, index) in productList.slider_image"
            :key="index"
          >
            <img :src="item" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品详情部分 -->
      <div class="product_details">
        <!-- 价格 -->
        <div class="price_box">
          <h2>
            ￥{{ productList.price }}<span>￥{{ productList.ot_price }}</span>
          </h2>
          <div class="collection">
            <van-icon
              name="like-o"
              :color="isCollect ? 'red' : '#333'"
              @click.stop="collect"
            /><span>{{ isCollect ? "已收藏" : "收藏" }}</span>
          </div>
        </div>
        <!-- 商品说明 -->
        <h4>{{ productList.store_name }}</h4>
        <!-- 库存 -->
        <div class="stock">
          <p>
            原价:<span>￥{{ productList.ot_price }}</span>
          </p>
          <p>
            库存:<span>{{ productList.stock }}</span
            >{{ productList.unit_name }}
          </p>
          <p>
            销量:<span>{{ productList.fsales }}</span
            >{{ productList.unit_name }}
          </p>
        </div>
      </div>
      <!-- 用户评价部分 -->
      <div class="evaluate">
        <p>评论(0)</p>
        <p>查看全部<van-icon name="arrow" /></p>
      </div>
      <!-- 产品介绍 -->
      <div class="introduce">
        <div class="header"><span>产品介绍</span></div>
        <div class="product_img" v-html="productList.description">
          <!-- <img src="#" alt=""> -->
        </div>
      </div>
      <!-- 产品推荐 -->
      <div class="product_list">
        <div class="header"><span>商品推荐</span></div>
        <div class="product_lunbo">
          <van-swipe class="my-swipe" :autoplay="30000" indicator-color="red">
            <van-swipe-item
              v-for="(item, index) in good_list"
              :key="index"
              class="ddd"
            >
              <div class="list">
                <ul>
                  <li v-for="cItem in item" :key="cItem.id">
                    <router-link :to="`/Details/${cItem.id}`">
                      <img :src="cItem.image" alt="" />
                      <p>{{ cItem.store_name }}</p>
                      <strong>￥{{ cItem.price }}</strong>
                    </router-link>
                  </li>
                </ul>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="dian"></div>
    </div>
    <!-- 加入购物车按钮 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <transition @after-enter="afterEnter">
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="count"
          v-show="isCount"
          @click="toCart"
        />
      </transition>
      <van-goods-action-icon
        icon="star"
        :text="isCollect ? '已收藏' : '收藏'"
        :color="isCollect ? 'red' : '#333'"
        @click.stop="collect"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click.stop="addCart"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- sku 购物 -->
    <van-sku
      v-model="showCart"
      :sku="sku"
      :goods="goods"
      @add-cart="onAddClick"
    />
  </div>
</template>
<script>
export default {
  name: "Details",
  props: {
    id: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      active: 0,
      navOpacity: 1,
      productList: {}, // 当前品牌详情
      good_list: [], // 推荐列表
      showCart: false, // 是否显示 sku 购物信息
      sku: {
        tree: [
          {
            k: "颜色", //属性名称
            k_id: "1", //属性的ID值 唯一 在当前产品里面唯一
            k_s: "s1", //属性的k_s值 对应list里面组合键名
            v: [
              //颜色属性可用值列表
              {
                id: "30349", //属性ID
                name: "红色", //属性名
                //属性图片，默认只有第一行属性有
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
              {
                id: "1215",
                name: "白色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
            ],
          },
          {
            k: "尺寸",
            k_id: "2",
            v: [
              {
                id: "1193",
                name: "40码",
              },
              {
                id: "1194",
                name: "42码",
              },
            ],
            k_s: "s2",
            count: 2,
          },
        ],
        list: [
          {
            id: 2259,
            price: 120, //价格
            s1: "1215", //对应属性列表里面 k_s 等于s1的属性id值
            s2: "1193",
            stock_num: 20, //库存
            goods_id: 946755, //产品ID
          },
          {
            id: 2260,
            price: 110,
            s1: "1215",
            s2: "1194",
            stock_num: 2,
            goods_id: 946755,
          },
          {
            id: 2257,
            price: 130,
            s1: "30349",
            s2: "1193",
            stock_num: 40,
            goods_id: 946755,
          },
          {
            id: 2258,
            price: 100,
            s1: "30349",
            s2: "1194",
            stock_num: 50,
            goods_id: 946755,
          },
        ],
        price: "5.00",
        stock_num: 227, // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
      },
      messageConfig: {
        // 数据结构见下方文档
      },
      count: 0, //购物数量
      isCount: false, // 为了做购物数量更新后的动画
      isCollect: false, // 是否收藏
    };
  },
  methods: {
    onClickLeft() {
      // console.log('点击左边');
      this.$router.go(-1);
    },
    onClickRight() {
      // console.log('点击右边');
    },
    animate() {},
    init() {
      this.$http.get(`api/product/detail/${this.id}`).then((res) => {
        console.log("商品详情信息==>", res);
        this.isCollect = res.data.data.storeInfo.userCollect;
        this.productList = res.data.data.storeInfo;
        this.good_list[0] = res.data.data.good_list.slice(0, 6);
        this.good_list[1] = res.data.data.good_list.slice(6, 12);
        this.good_list[2] = res.data.data.good_list.slice(12);
        if (res.data.status) {
          let arrs = res.data.data.productAttr;
          let listValue = res.data.data.productValue;
          //sku 数据转换
          let id = 1;
          let idobj = {};
          let ssk = 1;
          this.sku.list = [];
          //获取产品属性里面第一个值默认图片
          this.goods.picture = listValue[Object.keys(listValue)[0]].image;
          //循环产品属性 组装购物车 属性tree
          this.sku.tree = arrs.map((atr, ads) => {
            let va = atr.attr_value.map((at, index) => {
              id++;
              idobj[at.attr] = id;
              let attrs = {
                id: id,
                name: at.attr,
              };
              if (ads < 1) {
                attrs.imgUrl = listValue[Object.keys(listValue)[index]].image;
              }
              return attrs;
            });
            var ks = "s" + ssk;
            ssk++;
            return {
              k: atr.attr_name,
              k_id: atr.attr_name,
              v: va,
              k_s: ks,
            };
          });
          //循环产品属性组合,组装sku 列表
          for (let key in listValue) {
            let v = listValue[key];
            let keys = key.split(",");
            this.sku.list.push({
              id: v.unique,
              price: v.price, //价格
              s1: idobj[keys[0]],
              s2: idobj[keys[1]],
              stock_num: v.stock, //库存
              goods_id: v.product_id,
              imgUrl: v.image,
            });
          }
        } else this.$toast("产品加载错误...");
      });
    },
    onAddClick(data) {
      // sku 里面加入购物车
      // console.log('sku加入购物车',data);
      this.showCart = false;
      this.$axios
        .post("/api/cart/add", {
          cartNum: data.selectedNum, //添加数量
          new: 0,
          productId: data.selectedSkuComb.goods_id, //产品ID
          uniqueId: data.selectedSkuComb.id,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.status != 200) {
            this.$router.push("/login");
          } else {
            this.$toast("添加购物车成功!");
            setTimeout(() => {
              this.getCound();
              this.isCount = false;
            }, 1000);
          }
        });
    },
    addCart() {
      // 不是 sku 里面加入购物车
      // console.log('外面的加入购物车');
      this.showCart = true;
    },
    collect() {
      // console.log('收藏商品信息');
      this.$http
        .post("api/collect/del", {
          category: "product",
          id: this.id,
        })
        .then((res) => {
          if (res.data.status != 200) {
            this.$router.push("/login");
          } else {
            this.isCollect = !this.isCollect;

            if (this.isCollect) {
              this.$http
                .post("api/collect/add", {
                  category: "product",
                  id: this.id,
                })
                .then((res) => {
                  console.log("收藏结果==>", res);
                  this.$toast("收藏成功");
                });
            } else {
              this.$http
                .post("api/collect/del", {
                  category: "product",
                  id: this.id,
                })
                .then((res) => {
                  console.log("取消结果==>", res);
                  this.$toast("取消收藏");
                });
            }
          }
        });
    },
    // 获取购物数量
    getCound() {
      // api/cart/count?numType=0
      this.$axios.get("/api/cart/count?numType=0").then((res) => {
        console.log("购物数量===>", res);
        this.count = res.data.data.count;
      });
    },
    afterEnter() {
      this.isCount = true;
      // console.log('动画完成了');
    },
    toCart() {
      this.$router.push("/Shopping");
    },
  },
  watch: {
    active() {
      // console.log(this.active);
    },
    id() {
      // console.log('id发生了变化');
      this.init();
    },
    count() {
      this.isCount = true;
    },
  },
  mounted() {
    this.init();
    this.getCound();
    // 滚动导航哦
    window.onscroll = () => {
      let flag = true;
      if (flag) {
        flag = false;
      }
    };
  },
};
</script>
<style lang="less" scoped>
.productDetails {
  background-color: #f2f2f2;
  .nav {
    overflow: hidden;
    position: relative;
    z-index: 1;
    
  }
  .dian {
    width: 100%;
    height: 50px;
  }
  .main {
    margin-bottom: 50px;
    .lunbo {
      img {
        display: block;
        max-width: 100%;
        width: 100%;
      }
      .van-swipe {
        height: 400px;
      }
    }
    .product_details {
      padding: 10px;
      background-color: #fff;
      border-radius: 0px 0px 15px 15px;
      margin-bottom: 10px;
      .price_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        h2 {
          color: #ed0014;
          font-size: 30px;
          font-weight: normal;
          span {
            margin-left: 10px;
            font-size: 10px;
            font-weight: normal;
            color: #999999;
            text-decoration: line-through;
          }
        }
        .collection {
          display: flex;
          align-items: center;
          font-size: 20px;
          color: #666666;
          span {
            font-size: 14px;
            margin-left: 5px;
          }
        }
      }
      h4 {
        margin-bottom: 10px;
      }
      .stock {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        color: #999;
        p {
          font-size: 12px;
        }
      }
    }
    .evaluate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px 15px;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 10px;
      p {
        font-size: 14px;
        &:nth-child(1) {
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -5px;
            transform: translateY(-50%);
            width: 3px;
            height: 14px;
            background-color: #ed0014;
          }
        }
        &:nth-child(2) {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .introduce {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      .header {
        padding: 20px 10px;
        text-align: center;
        font-size: 16px;
      }
      .product_img {
        overflow: hidden;
        div {
          &.col-main {
            background-color: red !important;
          }
        }
      }
    }
    .product_list {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      .header {
        padding: 20px 10px 15px;
        text-align: center;
        font-size: 16px;
      }
      .product_lunbo {
        .list {
          width: 100%;
          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0px 10px;
            margin-bottom: 30px;
            li {
              width: 31%;
              a {
                display: block;
                text-align: center;
                img {
                  max-width: 100%;
                  height: 120px;
                  padding: 5px;
                  border-radius: 10px;
                  border: 1px solid rgb(214, 214, 214);
                  overflow: hidden;
                }
                p {
                  font-size: 14px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  margin-bottom: 5px;
                  color: #000;
                }
                strong {
                  display: block;
                  color: #ed0014;
                  font-weight: normal;
                  text-align: left;
                }
              }
            }
          }
        }
      }
    }
  }
}

// .main .van-swipe__track {
//     height: auto !important;
// }

.v-enter,
.v-leave-to {
  transform: scale(0);
}
.v-enter-to,
.v-leave {
  transform: scale(1);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>