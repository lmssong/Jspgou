<template>
  <div class="forum-module" v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">订单列表</span>
        </div>
         <div class="table-top-bar clearfix">
            <div class="query-inline-box flex-between">
                   <div class="query-inline-group">
                       <el-select v-model="params.status" @change="logisticsIds" >
                            <el-option label="选择快递单模版" value=""></el-option>
                              <el-option v-for="(item,index) in LogisticsList" :key="index"
                                  :label="item.name"
                                  :value="item.id"

                              ></el-option>
                       </el-select>       
                </div> 
                <div class="query-inline-group">
                       <el-select v-model="params.isPrint" @change="query" >
                            <el-option label="全部订单" value=""></el-option>
                             <el-option label="已打印" :value="true"></el-option>
                              <el-option label="未打印" :value="false"></el-option>        
                       </el-select>     
                </div> 
            </div>
        </div>
           <!-- teble -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68" ></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="订单编号" prop="code" align="center"></el-table-column>
            <el-table-column label="物流编号" prop="waybill" align="center"></el-table-column>
             <el-table-column label="是否已打印快递面单" prop="isPrint" align="center">
                         <template slot-scope="scope">
                              <span v-if="scope.row.isPrint">已打印</span>
                              <span v-else>未打印</span>                         
                        </template>
            </el-table-column>
            <el-table-column label="操作员"  prop="username"  align="center"></el-table-column>     
             <el-table-column label="操作"  align="center" width="200">
                         <template slot-scope="scope">
                             <a class="t-order" title="查看" @click="routerLink('/shipmentsList/update','update',scope.row.id)" ></a>
                            <a class="t-del" title="删除" @click="deleteItems(scope.row.id)"></a>
                        </template>
                      </el-table-column>
        </el-table>
          <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
                <el-button  @click="isPrintShipmentsInfo('true')">标记为已打印</el-button>
                <el-button  @click="isPrintShipmentsInfo('false')">标记为未打印</el-button>
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
import * as setFetch from "@/api/set";
export default {
  data() {
    return {
      loading: true, //提示变量
      items: [], //列表通用变量
      ids: "",
      params: {
        pageNo: 1,
        pageSize: 10,
        isPrint:'',
      },
      LogisticsList:[],
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
      fetch.getShipmentsList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    getLogisticsId(){
          setFetch.getLogisticsList().then(res=>{
               this.LogisticsList=res.body
          })
    },
    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteShipmentsInfo({ ids: ids }).then(res => {
            if (res.code == 200) {
              this.successMessage("删除成功");
            }
            this.getItems();
          });
        })
        .catch(error => {});
    },
    isPrintShipmentsInfo(status){
        let message=status?'是否标记为已打印':'是否标记为未打印';
         
         this.$confirm(message, "提示", { type: "error" })
      
        .then(mes =>{
             fetch.isPrintShipmentsInfo({status:status,ids:this.ids}).then(res=>{
                 if(res.code==200){
                       this.successMessage("修改成功");
                        this.getItems();
                 }
             })   
        })
        .catch(error=>{console.log(error)});

    },
    logisticsIds(id){
       
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
    this.getLocalPage(); //拉去数据
    this.getLogisticsId();
  }
};
</script>

<style scoped>
 .w160{
     width:128px;
     margin-right: 10px;
 }

</style>
