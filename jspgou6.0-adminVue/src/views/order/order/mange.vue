<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/order','list');">返回列表</el-button>
            </div>
    </div>
    <!-- 按钮组 -->
     <div style="margin-top:24px;padding-left:24px;">
             <el-button   :disabled="!(info.orderStatus==1)" @click="enterOrder">确认</el-button>
              <el-button :disabled="!(info.orderStatus==2&&info.paymentStatus==1&&info.paymentId!=1)"
               @click="centerDialogVisible1 =true">支付</el-button>
               <el-button
               :disabled="!(info.orderStatus==2&&info.shippingStatus==1&&info.paymentId!=1)"@click="centerDialogVisible =true"
               >发货</el-button>
                <el-button
                :disabled="!(info.paymentStatus==2&&info.shippingStatus==2&&info.orderStatus!=4)"
                 @click="doneOrder"
                >完成</el-button>
                 <el-button :disabled="!((info.paymentId!=1&&info.shippingStatus==1&&info.paymentStatus==1&&info.orderStatus!=3)
                 ||(info.paymentId==1&&info.paymentStatus==1&&info.orderStatus!=3))"
                  @click="cannelOrder">取消</el-button>
     </div>
     <!-- 发货信息 -->
        <el-dialog title="填写发货信息"
                    :visible.sync="centerDialogVisible"
                    width="50%"
                    center>
                 <el-form :model="saveOrder">
                            <el-form-item label="快递单号:" >
                            <el-input v-model="saveOrder.waybill" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发货人信息:">
                                   <table style="width:100%" class="pro-table border-all">
                                       <tr >
                                           <td>选择</td>
                                           <td>姓名</td>
                                        <td>电话</td>
                                         <td>地址</td>
                                       </tr>
                                       <tr v-for="(item,index) in shipmentsList" :key="index">
                                           <td><el-radio :label="item.id" v-model="saveOrder.id">&nbsp;</el-radio></td>
                                            <td>{{item.name}}</td>
                                        <td>{{item.mobile}}</td>
                                         <td>{{item.address}}</td>
                                       </tr>
                                       </table>
                            </el-form-item>
                <el-form-item label="备注:" >
                            <el-input v-model="saveOrder.comment" auto-complete="off" type="textarea"></el-input>
                            </el-form-item>
                     </el-form>
                    <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="saveOrderInfo">确 定</el-button>
                        <el-button @click="centerDialogVisible = false">取 消</el-button>

                    </span>
        </el-dialog>
      <el-dialog title="填写支付信息"
                    :visible.sync="centerDialogVisible1"
                    width="30%"
                    center>
                 <el-form :model="payOrderInfo">
                            <el-form-item label="银行:" label-width="80px">
                            <el-input v-model="payOrderInfo.bank" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="账号:" label-width="80px">
                            <el-input v-model="payOrderInfo.accounts" auto-complete="off"></el-input>
                            </el-form-item>
                             <el-form-item label="金额:" label-width="80px">
                            <el-input v-model="payOrderInfo.money" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="付款人:" label-width="80px">
                            <el-input v-model="payOrderInfo.drawee" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="备注:" label-width="80px" >
                                <el-input v-model="payOrderInfo.comment" auto-complete="off" type="textarea"></el-input>
                         </el-form-item>
                                </el-form>
                    <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="payOrder">支付</el-button>
                        <el-button @click="centerDialogVisible1 = false">取 消</el-button>

                    </span>
        </el-dialog>

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
        orderId:0,
        id: "",
        waybill: "",
        comment: ""
      },
      payOrderInfo:{//支付信息
          orderId:0,
          bank:'',
          accounts:'',
          money:'',
          drawee:'',
          comment:''
      },
      shipmentsList:[],
      orderInfoState: true,
      userInfoState: true,
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
      fetch.getOrderInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
          this.productList = res.body.product;
          this.loading = false;
        });
        fetch.getShopShipmentsList({ pageNo:1,pageSize: 10,}).then(res=>{
             this.saveOrder.id=res.body[0].id;
             this.shipmentsList=res.body;
        })
    },
    payOrder(){//支付信息
        this.payOrderInfo.orderId=this.id;
        fetch.payOrderInfo(this.payOrderInfo).then(res => {
        if (res.code == 200) {
          this.successMessage("订单支付成功");
           this.centerDialogVisible1=false;
          this.getInfo(this.id);
        }
      });
    },
    enterOrder() {
         this.$confirm("是否确认订单？", "提示", { type: "warning" }).then(mes => {
                    //确认订单
              fetch.enterOrderInfo({ id: this.info.id }).then(res => {
                if (res.code == 200) {
                  this.successMessage("订单确认成功!");
                  this.getInfo(this.id);
                }
              });
         })
         .catch(error => {});
    },
    cannelOrder(){
          this.$confirm("是否取消订单？", "提示", { type: "warning" }).then(mes => {

          fetch.cannelOrderInfo({orderId:this.id }).then(res => {
        if (res.code == 200) {
          this.successMessage("订单取消成功!");
          this.getInfo(this.id);
        }
      });}).catch(error => {});
    },
    doneOrder() {
        this.$confirm("是否确认完成订单", "提示", { type: "warning" }).then(mes => {
      //完成订单
      fetch.doneOrderInfo({ id: this.info.id }).then(res => {
        if (res.code == 200) {
          this.successMessage("订单完成成功!");
          this.getInfo(this.id);
        }
      });}).catch(error => {});
    },
    saveOrderInfo(){
        this.saveOrder.orderId=this.id;
          fetch.saveOrderInfo(this.saveOrder).then(res=>{
              if(res.code==200){
                  this.successMessage("发货成功!");
                  this.centerDialogVisible=false;
                   this.getInfo(this.id);
              }
          })
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
        this.userInfoState = false;
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
          this.payOrderInfo.drawee=this.info.receiveName;
           this.payOrderInfo.money=this.info.total;
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
.border-all{
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
