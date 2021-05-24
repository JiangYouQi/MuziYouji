<template>
  <div class="order-contacts">
    <div v-show="!addboo">
      <div class="contacts-top">
        <div class="contacts-back" @click="back">《</div>
        <div class="contacts-title">联系人</div>
      </div>
      <div class="dian"></div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @click-item='clickItem'
      />
    </div>
    <div v-show="addboo" title="标题">
      <div class="order-add">
        <div class="add-top">
          <div class="add-back" @click="back">《</div>
          <div class="add-title">添加</div>
        </div>
        <div class="dian"></div>
        <van-address-edit
          :area-list="areaList"
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
        />
      </div>
    </div>
    <div class="diana"></div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
export default {
  name: "ordercontacts",
  //  beforeRouteEnter(to,from,next) {
  //   console.log('to========>',to);
  //   //console.log()('from========>',from);
    
  //   next(vm => {
  //     if(to.query.addreID !== '') {
  //       console.log(vm.addresslist);
  //       var index = vm.addresslist.findIndex(item => {
  //         return to.query.addreID == item.id
  //       })
  //       console.log(index);
  //       vm.chosenAddressId = index + 1 + '';
  //     }
  //   });

  // },
  data() {
    return {
      areaList,
      searchResult: [],
      addresslist:[],
      addboo: false,
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: 'item.real_name',
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
      ],
      components: {},
    };
  },
  methods: {
    onAdd() {
      this.addboo=!this.addboo
      console.log(this.addboo,'dddddddddddddddddddddddd');
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index, item);
    },
    back() {
      this.$router.go(-1);
      console.log('地址返回到订单页面======================');
    },

    onSave(content) {
      console.log(content);
      this.$http.post('/api/address/edit',{address:{city:content.city,
      city_id:content.areaCode,
      district:content.county,
      province:content.province},
      detail:content.addressDetail,
      is_default:content.isDefault?1:0,
      phone:content.tel,
      post_code:content.postalCode,
      real_name:content.name
      }).then((d)=>{
        console.log('d===================>',d);
        if(d.data.status == 200){
          window.location.reload()
        }
      })
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    clickItem(item,index){
      console.log('ndjndownkdnakld==========>',item,index);
      this.$router.push({
        path:'/order/'+this.$route.query.ids,
        query:{
          item:JSON.stringify(item)
        }
      })
    },
  },
  mounted(){
    this.$http.get('/api/address/list').then((d)=>{
      console.log('list===========>',d);
      this.addresslist=d.data.data;


      if(this.$route.query.addreID !== '') {
        // console.log(ths.addresslist);
        var index = this.addresslist.findIndex(item => {
          return this.$route.query.addreID == item.id
        })
        console.log('索引是==》',index);
        this.chosenAddressId = index + 1 + '';
        console.log('索引是==》',this.chosenAddressId);
      }


      console.log('this.addresslist=====>',this.addresslist);
      this.list=this.addresslist.map((item)=>{
        return {
          id: item.id,
          name: item.real_name,
          tel: item.phone,
          address: item.province+item.district+item.city+item.detail,
          isDefault: item.is_default==0?false:true,
        }
      })
    })
  },
  props: {
    orderboo: Boolean,
  },
};
</script>

<style lang="less" scoped>
.order-contacts {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
  position: absolute;
  z-index: 3;
  bottom: 0;
}
.contacts-top {
  width: 100%;
  height: 40px;
  position: fixed;
  background-color: white;
  text-align: center;
  line-height: 40px;
  z-index: 5;
  .contacts-back {
    float: left;
    left: 10px;
  }
}
.dian,.diana {
  width: 100%;
  height: 50px;
}
.diana{
  margin-top: 30px;
}
.order-add {
  width: 100%;
  height: 100vh;
  background-color: #f7f8fa;
  position: absolute;
  z-index: 5;
  bottom: 0;
}
.add-top {
  width: 100%;
  height: 40px;
  position: fixed;
  background-color: white;
  text-align: center;
  line-height: 40px;
  z-index: 5;
  .add-back {
    float: left;
    left: 10px;
  }
}
.van-address-list{
  padding: 12px 12px 4px;
}
</style>