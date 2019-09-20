<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/order','list');">返回列表</el-button>
            </div>
    </div>
     <table class="pro-table">
         <tr>
             <th>商品编号</th>
              <th>商品名称</th>
               <th>成交价</th>
                <th>单重</th>
                 <th>购买数量</th>
                   <th>小记</th>
         </tr>
         <tr v-for="(item,index) in productList" :key="index">
             <td>{{item.productCode}}</td>
              <td>
                  <div class="w280">
                  <img :src="url+item.coverImg" alt="" class="img-w50">
                  <span class="img-title">{{item.productName}}</span>
                  </div>
              </td>
               <td>
                   <el-input class="w-80" v-model.number="item.itemPrice" v-if="info.paymentStatus==1"></el-input>
                   <span v-else>{{item.itemPrice}}</span>
                   </td>
                <td>{{item.itemWeight}}</td>
                 <td><el-input class="w-80" v-model.number="item.itemCount" v-if="info.paymentStatus==1"></el-input>
                 <span v-else>{{item.itemPrice}}</span>
                 </td>
                  <td>{{count[index]}}</td>
         </tr>
         </table>   
            

    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
 <div class="more-info  more-info1" @click="toggleMore1" >订单信息<i class="el-icon-caret-bottom"></i></div>
      <el-row class="form-group" v-if="orderInfoState">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="订单编号" >
               {{info.code}}
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="下单日期" >
               {{info.createTime}}
          </el-form-item>
        </el-col>
  <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="订单状态" >
              <span v-if="info.orderStatus==1">未确认</span>
                                <span v-if="info.orderStatus==2">已确认</span>
                                   <span v-if="info.orderStatus==3">已取消</span>
                                      <span v-if="info.orderStatus==4">已完成</span>
          </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="支付状态" >
                   <span v-if="info.paymentStatus==1">未支付</span>
                                <span v-if="info.paymentStatus==2">已支付</span>
                                  <span v-if="info.paymentStatus==3">已退款</span>
                </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="配送状态" >
                    <span v-if="info.shippingStatus==1">未发货</span>
                                <span v-if="info.shippingStatus==2">已发货</span>
                                  <span v-if="info.shippingStatus==3">已退货</span>
                </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="配送方式" >
                    <el-select v-model="info.shippingName" class="w192" v-if="info.shippingStatus==1">
                             <el-option label="普通快递" value="普通快递"></el-option>
                              <el-option label="顺丰快递" value="顺丰快递"></el-option> 
                       </el-select>
                       <span v-else>
                           {{info.shippingName}}
                       </span>
                </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="商品总金额" >
                    {{countPrice}}
                </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="运费" >
                   <el-input class="w192" v-model.number="info.freight" v-if="info.shippingStatus==1"></el-input>
                    <span v-else>
                           {{info.freight}}
                       </span>
                </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="订单总金额" >
                    {{countPrice}}
                </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="支付方式" >
                    <el-select v-model="info.paymentName"  class="w192" v-if="info.shippingStatus==1">
                             <el-option label="网上支付" value="网上支付"></el-option>
                              <el-option label="银行汇款" value="银行汇款"></el-option>
                               <el-option label="货到付款" value="货到付款"></el-option>
                       </el-select>
                       <span v-else>{{info.paymentName}}</span>
                </el-form-item>
        </el-col>
      </el-row>
 <div class="more-info more-info2 " @click="toggleMore2">收货人信息<i class="el-icon-caret-bottom"></i></div>
    <el-row class="form-group" v-if="userInfoState">
             <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人姓名"  >
                        <el-input class="w192" v-model="info.receiveName" v-if="info.shippingStatus==1"></el-input>
                        <span v-else>{{info.receiveName}}</span>
                    </el-form-item>
                    
              </el-col>
               <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人手机号" >
                        <el-input class="w192" v-model="info.receiveMobile" v-if="info.shippingStatus==1"></el-input>
                        <span v-else>{{info.receiveMobile}}</span>
                    </el-form-item>
              </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人固定电话" >
                        <el-input class="w192" v-model="info.receivePhone" v-if="info.shippingStatus==1"></el-input>
                         <span v-else>{{info.receivePhone}}</span>
                    </el-form-item>
              </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人邮编" >
                        <el-input class="w192" v-model="info.receiveZip" v-if="info.shippingStatus==1"></el-input>
                         <span v-else>{{info.receiveZip}}</span>
                    </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="收货人地址" >
                        <el-input class="w192" v-model="info.receiveAddress" v-if="info.shippingStatus==1"></el-input>
                         <span v-else>{{info.receiveAddress}}</span>
                    </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="客户留言" v-if="info.shippingStatus==1">
                        <el-input class="w192" v-model="info.comments" type="textarea"></el-input>
                    </el-form-item>
              </el-col>
    </el-row>
    </el-form>
    <div class="form-bottom-bar">
      <el-button type="primary" v-if="type=='update'" @click="updateForm()">修改</el-button>
      <el-button type="info" @click="restForm()">重置</el-button>
    
    </div>
  
  </div>
</template>

<script>
import * as fetch from "@/api/order";

export default {
  data() {
    return {
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {}, //列表
      orderInfoState: false,
      userInfoState: false,
      typeList: [],
      count: [],
      countPrice: "",
      productList: [],
      url: process.env.FILE_URL,
      pathUrl: "",
      rules: {
        name: [
          {
            required: true,
            message: "此项必填",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getInfo(id) {
      fetch
        .getOrderInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
          this.productList = res.body.product;
          this.loading = false;
        });
    },

    updateForm() {
        
    let params={
        id:this.info.id,
        itemId:[],
        itemCount:[],
        itemPrice:[],
        shippingId:1,
        freight:this.info.freight,
        comments:this.info.comments
    }
    for(let i in this.productList){
        params.itemId[i]=this.productList[i].itemId;
        params.itemCount[i]=this.productList[i].itemCount;
        params.itemPrice[i]=this.productList[i].itemPrice;  
    }       
        params.itemId= params.itemId.join(',');
         params.itemPrice= params.itemPrice.join(',');
          params.itemCount= params.itemCount.join(',');

      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch.updateOrderInfo(params).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/order", "list");
              }, 1000);
            }
          });
        }
      });
    },
    toggleMore1() {
      //显示更多
      if (this.orderInfoState == true) {
        this.orderInfoState = false;
        $(".more-info1")
          .find("i")
          .removeClass("el-icon-caret-top")
          .addClass("el-icon-caret-bottom");
      } else {
        $(".more-info1")
          .find("i")
          .removeClass("el-icon-caret-bottom")
          .addClass("el-icon-caret-top");
        this.orderInfoState = true;
      }
    },
    toggleMore2() {
      //显示更多
      if (this.userInfoState == true) {
        this.v = false;
        $(".more-info2")
          .find("i")
          .removeClass("el-icon-caret-top")
          .addClass("el-icon-caret-bottom");
      } else {
        $(".more-info2")
          .find("i")
          .removeClass("el-icon-caret-bottom")
          .addClass("el-icon-caret-top");
        this.userInfoState = true;
      }
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      this.getInfo(this.id);
      this.pathUrl = "";
    }
  },
  watch: {
    productList: {
      handler(newVal, oldVal) {
        for (let i in newVal) {
          this.count[i] = newVal[i].itemPrice * newVal[i].itemCount;
        }
        let num = 0;
        for (let i in this.count) {
          num = num + this.count[i];
        }
        this.countPrice = num;
      },
      deep: true
    }
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style scoped>
.w280 {
  width: 320px;
  margin: 0 auto;
}
.img-w50 {
  display: block;
  width: 50px;
  height: 50px;
  margin: 7px 10px 7px 0;
  float: left;
}
.img-title {
  float: left;
  line-height: 20px;
  text-align: left;
  color: #1276c3;
  width: 260px;
  margin-top: 7px;
  text-overflow: ellipsis;
}
.pro-table {
  width: 100%;
  margin-top: 24px;
}
.w-80 {
  width: 80px;
}
.pro-table th {
  border-top: 1px solid #eeeeee;
  border-bottom: 2px solid #eeeeee;
  height: 50px;
  font-size: 14px;
  color: #8a8e98;
  text-align: center;
}
.pro-table td {
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  color: #353535;
  text-align: center;
  padding: 0 12px;
}
.more-info {
  padding-left: 0px;
  margin-top: 22px;
  margin-bottom: 0;
}
</style>
