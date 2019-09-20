<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/orderReturn','list');">返回列表</el-button>
            </div>
    </div>
    <!-- 按钮组 -->
     <div style="margin-top:24px;padding-left:24px;">
            <el-button :disabled="!(info.status==1)" @click="affirmOrderReturnInfo">审核</el-button>
             <el-button :disabled="!(info.status==3)" @click="sendbackOrderReturnInfo">退回</el-button>
              <el-button :disabled="!(info.status==4)" @click="receiveOrderReturnInfo" >收货</el-button>
               <el-button :disabled="!(info.status==5)" @click="refundOrderReturnInfo">退款</el-button>
               
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
                   <span >{{item.itemPrice}}</span>
                   </td>
                <td>{{item.itemWeight}}</td>
                 <td>
                 <span>{{item.itemPrice}}</span>
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
                       <span >
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
                   
                    <span >
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
                       <span>{{info.paymentName}}</span>
                </el-form-item>
        </el-col>
      </el-row>
<div class="more-info more-info3 " @click="toggleMore3">退款详情<i class="el-icon-caret-bottom"></i></div>
 <el-row class="form-group" v-if="orderReturnState">
             <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="退款编号"  >   
                        <span >{{info.returnCode}}</span>
                    </el-form-item>
                    
              </el-col>
               <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="申请时间" >
                        <span >{{info.returnTime}}</span>
                    </el-form-item>
              </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="退款类型" >
                        <span v-if="info.returnType==1">已发货,申请退货</span>
                                  <span v-if="info.returnType==2">未发货,申请退货</span>
                        
                    </el-form-item>
              </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="退款状态" >
                       <span v-if="info.status==1">待审核</span>
                                <span v-if="info.status==2">已审核</span>
                                  <span v-if="info.status==3">已退回</span>
                                   <span v-if="info.status==4">待收货</span>
                                    <span v-if="info.status==5">已收货</span>
                                     <span v-if="info.status==6">已退款</span>
                                      <span v-if="info.status==7">已完成</span>
                        
                    </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="退款金额" >
                      
                         <span>{{info.money}}</span>
                    </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="退款支付类型" >
                    <span v-if="info.returnPayType==1">买家个人账户</span>
                                  <span v-if="info.returnPayType==2">支付宝</span>
                        
                    </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="退款原因" >
                      
                         <span>{{info.returnReasonTypeName}}</span>
                    </el-form-item>
              </el-col>
                  
               <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="退款说明" >
                        <span>{{info.reason}}</span>
                    </el-form-item>
              </el-col>
    </el-row>


 <div class="more-info more-info2 " @click="toggleMore2">收货人信息<i class="el-icon-caret-bottom"></i></div>
    <el-row class="form-group" v-if="userInfoState">
             <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人姓名"  >   
                        <span >{{info.receiveName}}</span>
                    </el-form-item>  
              </el-col>
               <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人手机号" >
                        <span >{{info.receiveMobile}}</span>
                    </el-form-item>
              </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人固定电话" >
                       
                         <span >{{info.receivePhone}}</span>
                    </el-form-item>
              </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收货人邮编" >
                      
                         <span>{{info.receiveZip}}</span>
                    </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="收货人地址" >
                    
                         <span>{{info.receiveAddress}}</span>
                    </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="客户留言">
                        {{info.comments}}
                      
                    </el-form-item>
              </el-col>
    </el-row>
    <div class="more-info more-info4 " >退货物流信息<i class="el-icon-caret-bottom"></i></div>
    <el-row class="form-group" >
             <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="物流单号"  >   
                        <span >{{info.invoiceNo}}</span>
                    </el-form-item>  
              </el-col>
               <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="所选物流" >
                        <span >{{info.shippingLogistics}}</span>
                    </el-form-item>
              </el-col>     
    </el-row>
    </el-form>
   
  
  </div>
</template>

<script>
import * as fetch from "@/api/order";

export default {
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisible1: false,
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {}, //列表
      saveOrder: {
        orderId: 0,
        id: "",
        waybill: "",
        comment: ""
      },
      payOrderInfo: {
        //支付信息
        orderId: 0,
        bank: "",
        accounts: "",
        money: "",
        drawee: "",
        comment: ""
      },
      shipmentsList: [],
      orderInfoState: true,
      userInfoState: true,
      orderReturnState: true,
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
        .getOrderReturnInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
          this.productList = res.body.product;
          this.loading = false;
        });
    },
  
    affirmOrderReturnInfo() {
          this.$confirm("是否审核退货／退款订单？", "提示", { type: "warning" }).then(mes => {

      fetch.affirmOrderReturnInfo({id:this.id }).then(res => {
        if (res.code == 200) {
          this.successMessage("订单审核成功!");
          this.getInfo(this.id);
        }
      });}).catch(error=>{});



    },
   sendbackOrderReturnInfo() {
          this.$confirm("是否退回／拒绝退货订单？", "提示", { type: "warning" }).then(mes => {
      fetch.sendbackOrderReturnInfo({id:this.id }).then(res => {
        if (res.code == 200) {
          this.successMessage("订单退回成功!");
          this.getInfo(this.id);
        }
      });}).catch(error=>{});
    },
    receiveOrderReturnInfo() {
      this.$confirm("是否确认收货？", "提示", { type: "warning" }).then(mes => {
          fetch.receiveOrderReturnInfo({id:this.id }).then(res => {
            if (res.code == 200) {
              this.successMessage("订单收货成功!");
              this.getInfo(this.id);
            }
          });}).catch(error=>{});
    },
     refundOrderReturnInfo() {
       this.$confirm("是否确认退款？", "提示", { type: "warning" }).then(mes => {
      fetch.refundOrderReturnInfo({id:this.id }).then(res => {
          console.log(res);
      });}).catch(error=>{});
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
    toggleMore3() {
      //显示更多
      if (this.orderReturnState == true) {
        this.orderReturnState = false;
        $(".more-info3")
          .find("i")
          .removeClass("el-icon-caret-top")
          .addClass("el-icon-caret-bottom");
      } else {
        $(".more-info3")
          .find("i")
          .removeClass("el-icon-caret-bottom")
          .addClass("el-icon-caret-top");
        this.orderReturnState = true;
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
        this.payOrderInfo.drawee = this.info.receiveName;
        this.payOrderInfo.money = this.info.total;
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
.border-all {
  border: 1px solid #eee;
}
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
