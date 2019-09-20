<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">物流公司列表</span>
        </div>
        <div class="table-top-bar clearfix">
            <div class="query-inline-box flex-between">
                <el-button type="primary" @click="routerLink('/logistics/save','save',0)" >添加物流公司</el-button>      
            </div>
        </div>
  
        <!-- table -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="ID" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="公司名称"  prop="name" align="center"></el-table-column>
           <el-table-column label="官网地址"  prop="name" align="center">
                 <template slot-scope="scope">
                    <a :href="scope.row.webUrl" class="link-color">{{scope.row.webUrl}}</a>
                </template>
           </el-table-column>
            <el-table-column label="排序" prop="priority" align="center">
                <template slot-scope="scope">
                    <el-input class="w50" type='number' min="0" v-model="scope.row.priority" ></el-input>
                </template>
            </el-table-column>
              
            </el-table-column>
            <el-table-column label="操作"  align="center" width="200">
                <template slot-scope="scope">
                   <a class="t-order" title="运单模版设置" @click="routerLink('/logistics/tmplate',scope.row.isCourier,scope.row.id)"></a>
                   
                   <a class="t-edit" title="修改" @click="routerLink('/logistics/update','update',scope.row.id)"></a>
                    <a class="t-del" title="删除" @click="deleteItems(scope.row.id)"></a>
                </template>
            </el-table-column>
        </el-table>
        <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
               <el-button  @click="savePriority">保存排序</el-button>
               <el-button :disabled="disabled" @click="deleteItems(ids)">批量删除</el-button>
            </div>
         
        </div>
    </div>
</template>

<script>
import * as fetch from '@/api/set'
export default {
data() {
    return {
      loading: true,//提示变量
      items: [], //列表通用变量
       ids:'',
      params: {
        pageNo: 1,
        pageSize: 10,
        username:''
      },
      disabled: true, //禁用
      pagination: {//分页参数
        total: 0, 
        currentPage: 1,
        changePageSize: localStorage.getItem('PageSize'),
      }
    };
  },
  methods:{
      getItems() {
      //获取接口数据
      fetch.getLogisticsList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    savePriority() {
      this.loading = true;
      let ids = [];
      let priority = [];
      for (let i in this.items) {
        ids.push(this.items[i].id);
        priority.push(this.items[i].priority);
      }
      ids = ids.join(",");
      priority = priority.join(",");
      let params = {
        ids: ids,
        priority: priority
      };
      fetch.priorityLogisticsInfo(params).then(res => {
        this.loading = false;
        if (res.code == 200) {
          this.successMessage("修改排序成功");
        }
        this.getItems();
      });
    },
    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteLogisticsInfo({ ids: ids }).then(res => {
            if (res.code == 200) {
              this.successMessage("删除成功");
            }
            this.getItems();
          });
        })
        .catch(error => {});
    },
    checkIds(res) {//选中当前的ids
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
    query(){//查询
       this.getItems(); 
    },
    getPage(val) {//获取当前页数
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
     getLocalPage(){
         let size = localStorage.getItem('PageSize');
        if (size != null) {
            this.params.pageSize = parseInt(size);//取本地存储的条目   
        } else {
            this.changePageSize = 20;
        }
         this.getItems();
    }  
  },
  created:function(){
      this.getLocalPage();//拉去数据
  }
}
</script>

<style>

</style>

