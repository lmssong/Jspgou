<template>
    <div class="forum-module" v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">管理员列表</span>
        </div>
        <div class="table-top-bar clearfix">
            <div class="query-inline-box flex-between">
                <el-button type="primary" @click="routerLink('/admin/add','save',0)">添加管理员</el-button>
                <!-- <div class="query-inline-group">
                    <label for="">用户名:</label>
                    <el-input></el-input>
                    <el-button class="ml16" @click="query">查询</el-button>
                </div> -->
            </div>
        </div>
        <!-- teble -->
        <el-table style="width:100%" :data="items"  stripe @selection-change="checkIds">
            <el-table-column type="selection" align="center" width="68"></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="用户名" prop="username" align="center"></el-table-column>
            <el-table-column label="姓名" prop="firstname" align="center"></el-table-column>
            <el-table-column label="最后登录时间" prop="currentLoginTime" align="center"></el-table-column>
            <el-table-column label="是否禁用" prop="disabled" align="center">
                <template slot-scope="scope">
                     <span v-if='scope.row.disabled' class="red">是</span>
                      <span v-else>否</span>
                    </template>
                     </el-table-column>
                      <el-table-column label="操作"  align="center" width="200">
                         <template slot-scope="scope">
                             <a class="t-edit" title="修改"  @click="routerLink('/admin/update','update',scope.row.id)"></a>
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
import * as fetch from "@/api/operation";
export default {
  data() {
    return {
      loading: true,
      ids: "",
      disabled: true, //禁用
      items: [], //列表通用变量
      params: {
        pageNo: 1,
        pageSize: 10
      },
      pagination: {//分页参数
        total: 0,
        currentPage: 1,
        changePageSize: localStorage.getItem("PageSize")
      }
    };
  },
  methods: {
    getItems() {
      //获取接口数据
      fetch.getAdminList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    deleteItems(ids){
     
       this.$confirm("确定要删除吗?", "警告",{type:'error'})
       .then(mes=>{
          fetch.deleteAdminInfo({ids:ids})
          .then(res=>{
              if(res.code==200){
                this.successMessage('删除成功');          
              }
                 this.getItems()
          })
       })
       .catch(error=>{});
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
    query() {//查询
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
        this.pagination.changePageSize = 10;
      }
      this.getItems();
    }
  },
  created: function() {
    this.getLocalPage(); //拉去数据
  }
};
</script>

<style>

</style>
