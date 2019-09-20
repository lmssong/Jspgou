<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/shipmentsList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
    <div class="more-info  more-info1"  >订单信息</div>
      <el-row class="form-group" >
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="订单编号" >
               {{info.code}}
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="支付状态" >
              <span v-if='info.paymentStatus==1'>未支付</span>
              <span v-if='info.paymentStatus==2'>已支付</span>
            
          </el-form-item>
        </el-col>
           <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="收货人姓名" >
               {{info.receiveName}}
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="收货人手机号" >
               {{info.receiveMobile}}
          </el-form-item>
        </el-col>   
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="收货人固定电话" >
               {{info.receivePhone}}
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="收货人邮编" >
               {{info.receiveZip}}
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="收货人地址" >
               {{info.receiveAddress}}
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="物流单号" >
               {{info.waybill}}
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="金额" >
               {{info.money}}
          </el-form-item>
        </el-col>
      
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="操作员" >
               {{info.username}}
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="备注" >
               {{info.comment}}
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
        .getShipmentsInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
          this.productList = res.body.product;
          this.loading = false;
        });
    },
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
