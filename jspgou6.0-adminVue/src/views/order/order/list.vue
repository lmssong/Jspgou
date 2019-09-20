<template>
  <div class="forum-module" v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">订单列表</span>
        </div>
         <div class="table-top-bar clearfix">
            <div class="query-inline-box ">
             <div>
                   <div class="query-inline-group">
                       <el-select v-model="params.status" @change="query" class="w160">
                            <el-option label="订单状态" value=""></el-option>
                             <el-option label="未确认" :value="1"></el-option>
                              <el-option label="已确认" :value="2"></el-option>
                               <el-option label="已取消" :value="3"></el-option>
                                <el-option label="已完成" :value="4"></el-option>
                       </el-select>
                       <el-select v-model="params.paymentStatus" @change="query" class="w160">
                            <el-option label="支付状态" value=""></el-option>
                             <el-option label="未支付" :value="1"></el-option>
                              <el-option label="已支付" :value="2"></el-option>
                               <el-option label="已退款" :value="3"></el-option>
                       </el-select>
                        <el-select v-model="params.shippingStatus" @change="query" class="w160">
                            <el-option label="配送状态" value=""></el-option>
                             <el-option label="未发货" :value="1"></el-option>
                              <el-option label="已发货" :value="2"></el-option>
                               <el-option label="已退货" :value="3"></el-option>
                       </el-select>
                        <el-select v-model="params.paymentId" @change="query" class="w160">
                            <el-option label="支付方式" value=""></el-option>
                             <el-option label="网上支付" :value="1"></el-option>
                              <el-option label="银行汇款" :value="2"></el-option>
                               <el-option label="货到付款" :value="3"></el-option>
                       </el-select>
                       <el-select v-model="params.shoppingId" @change="query" class="w160">
                            <el-option label="配送方式" value=""></el-option>
                             <el-option label="普通快递" :value="1"></el-option>
                              <el-option label="顺丰快递" :value="2"></el-option> 
                       </el-select>
                </div> 
                 <div style="margin-top:48px;" class="clearfix">
                     <div class="query-inline-group">
                          <label for="">订单编号:</label>
                            <el-input class="w160" v-model="params.code1" @keyup.native.enter="query()"></el-input>
                     </div>
                      <div class="query-inline-group">
                            <label>下单时间:</label>
                            <el-date-picker class="w128-sm" v-model="params.startTime" @keyup.enter.native="query" type="datetime"
                               value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>   
                            <span class="time-slot">-</span>
                            <el-date-picker  class="w128-sm" @keyup.enter.native="query" v-model="params.endTime" type="datetime"
                               value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </div>
                 <div class="query-inline-group">
                     <el-button @click="query" >查询</el-button>   
                </div>
                 </div>
             </div>
            </div>
        </div>
           <!-- teble -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68" ></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="订单编号" prop="code" align="center"></el-table-column>

            <el-table-column label="买家"  prop="receiveName"  align="center"></el-table-column>
            <el-table-column label="订单金额(元)" prop="score" align="center">
                     <template slot-scope="scope">
                              <span>{{scope.row.total}}</span>
                              <div style="color:#d8dce5">(含运费{{scope.row.freight}})</div>
                        </template>
            </el-table-column>
            <el-table-column label="下单日期" prop="createTime" align="center"></el-table-column>
            <el-table-column label="订单状态" prop="orderStatus" align="center">
                         <template slot-scope="scope">
                              <span v-if="scope.row.orderStatus==1">未确认</span>
                                <span v-if="scope.row.orderStatus==2">已确认</span>
                                   <span v-if="scope.row.orderStatus==3">已取消</span>
                                      <span v-if="scope.row.orderStatus==4">已完成</span>
                        </template>
            </el-table-column>
              <el-table-column label="支付状态" prop="paymentStatus" align="center">
                         <template slot-scope="scope">
                              <span v-if="scope.row.paymentStatus==1">未支付</span>
                                <span v-if="scope.row.paymentStatus==2">已支付</span>
                                  <span v-if="scope.row.paymentStatus==3">已退款</span>
                        </template>
            </el-table-column>
            <el-table-column label="支付方式" prop="paymentName" align="center"></el-table-column>
                 <el-table-column label="配送状态" prop="shippingStatus" align="center">
                         <template slot-scope="scope">
                              <span v-if="scope.row.shippingStatus==1">未发货</span>
                                <span v-if="scope.row.shippingStatus==2">已发货</span>
                                  <span v-if="scope.row.shippingStatus==3">已退货</span>
                        </template>
            </el-table-column>
             <el-table-column label="配送方式" prop="shippingName" align="center">
                       
            </el-table-column>
             <el-table-column label="操作"  align="center" width="200">
                         <template slot-scope="scope">
                            <a class="t-order" title="订单管理" @click="routerLink('/order/mange','update',scope.row.id)" ></a>
                             <a class="t-edit" title="修改" @click="routerLink('/order/update','update',scope.row.id)" ></a>
                            <a class="t-del" title="删除" @click="deleteItems(scope.row.id)"></a>
                        </template>
                      </el-table-column>
        </el-table>
          <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
               <el-button :disabled="disabled" @click="deleteItems(ids)">批量删除</el-button>
                <span class="ml-48">每页显示
                    <el-input v-model="pagination.changePageSize" 
                    @blur="changeSize"
                     @keyup.enter.native="changeSize" 
                     class="input-sm"  type="number"
                     min="1" max="50">
                     </el-input>
                     条,输入后按回车
                     </span>
            </div>
            <div class="pull-right">
                 <el-pagination
                       layout="total, prev, pager, next"
                    :total="pagination.total"
                    :page-size='params.pageSize'
                    :current-page.sync='pagination.currentPage'
                  @current-change='getPage' 
                  @size-change='getSize'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import * as fetch from "@/api/order";
export default {
  data() {
    return {
      loading: true, //提示变量
      items: [], //列表通用变量
      ids: "",
      params: {
        pageNo: 1,
        pageSize: 10,
        userName: "",
        code1:'',
        status:'',
        paymentStatus:'',
        shippingStatus:'',
        paymentId:'',
        shoppingId:'',
        startTime:'',
        endTime:''
      },
      disabled: true, //禁用
      pagination: {
        //分页参数
        total: 0,
        currentPage: 1,
        changePageSize: localStorage.getItem("PageSize")
      }
    };
  },
  methods: {
    getItems() {
      //获取接口数据
      fetch.getOrderList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteOrderInfo({ ids: ids }).then(res => {
            if (res.code == 200) {
              this.successMessage("删除成功");
            }
            this.getItems();
          });
        })
        .catch(error => {});
    },
    checkIds(res) {
      //选中当前的ids
      let ids = [];
      for (let i = 0; i < res.length; i++) {
        ids.push(res[i].id);
      }
      if (ids.length == 0) {
        this.ids = "";
        this.disabled = true;
      } else {
        this.ids = ids.join(",");
        this.disabled = false;
      }
    },
    query() {
      //查询
      this.loading = true;
      this.getItems();
    },
    getPage(val) {
      //获取当前页数
      this.loading = true;
      this.params.pageNo = val;
      this.getItems();
    },
    getSize(val) {
      //分页
      this.loading = true;
      this.params.pageNo = val;
      this.getItems();
    },
    changeSize(event) {
      //跳页
      let val = event.target.value;
      if (val < 1) {
        localStorage.setItem("PageSize", 15); //处理异常大小
        val = 15;
      } else {
        localStorage.setItem("PageSize", val); //本地存储下每页条数
      }
      this.loading = true;
      this.params.pageSize = parseInt(val);
      this.params.pageNo = 1;
      this.pagination.currentPage = 1;
      this.getItems();
    },
    getLocalPage() {
      let size = localStorage.getItem("PageSize");
      if (size != null) {
        this.params.pageSize = parseInt(size); //取本地存储的条目
      } else {
        this.pagination.changePageSize = 20;
      }
      this.getItems();
    }
  },
  created: function() {
   
    let type=this.$route.query.type;
    let id=this.$route.query.id;
    if(type=='shippingStatus'){
      this.params.shippingStatus=id;
       this.getLocalPage(); //拉去数据
    }
    else if(type=='paymentStatus'){
         this.params.paymentStatus=id;
         this.getLocalPage(); //拉去数据
    }else{
       this.getLocalPage(); //拉去数据
    }
  }
};
</script>

<style scoped>
 .w160{
     width:128px;
     margin-right: 10px;
 }

</style>
