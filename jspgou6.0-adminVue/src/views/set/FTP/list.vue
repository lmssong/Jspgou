<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">FTP管理列表</span>
        </div>
        <div class="table-top-bar clearfix">
            <div class="query-inline-box flex-between">
                <el-button type="primary" @click="routerLink('/ftpList/save','save',0)">添加FTP管理</el-button>      
            </div>
        </div>
  
        <!-- table -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="ID" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="名称" prop="name" align="center"></el-table-column>
            <el-table-column label="服务器IP" prop="ip" align="center"></el-table-column>
            <el-table-column label="远程目录" prop="path" align="center"></el-table-column>
            <el-table-column label="访问URL" prop="url" align="center"></el-table-column>
            <el-table-column label="操作选项"  align="center" width="200">
                <template slot-scope="scope">
                      <a class="t-edit" title="修改" @click="routerLink('/ftpList/update','update',scope.row.id)"></a>
                    <a class="t-del" title="删除" @click="deleteItems(scope.row.id)"></a>
                </template>
            </el-table-column>
        </el-table>
        <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
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
      fetch.getFtpList(this.params).then(res => {
       
        this.items = res.body;
        this.loading = false;
      });
    },
    query(){//查询
       this.getItems(); 
    },
      deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteFtpInfo({ ids: ids }).then(res => {
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
    }
  },
  created:function(){
      this.getItems();
  }
}
</script>

<style>

</style>

