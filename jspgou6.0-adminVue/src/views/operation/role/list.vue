<template>
    <div class="forum-module" v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">角色列表</span>
        </div>
        <div class="table-top-bar clearfix">
            <div class="query-inline-box flex-between">
                <el-button type="primary" @click="routerLink('/role/save','save',0)">添加角色</el-button>
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
            <el-table-column label="角色名" prop="name" align="center"></el-table-column>
            <el-table-column label="排列顺序" prop="priority" align="center"></el-table-column>
                      <el-table-column label="操作"  align="center" width="200">
                         <template slot-scope="scope">
                             <a class="t-edit" title="修改"  @click="routerLink('/role/update','update',scope.row.id)"></a>
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
import * as fetch from "@/api/operation";
export default {
  data() {
    return {
      loading: true,
      ids: "",
      disabled: true, //禁用
      items: [], //列表通用变量
    };
  },
  methods: {
    getItems() {
      //获取接口数据
      fetch.getRoleList(this.params).then(res => {
        this.items = res.body;
        this.loading = false;
      });
    },
    deleteItems(ids){
       this.$confirm("确定要删除吗?", "警告",{type:'error'})
       .then(mes=>{
          fetch.deleteRoleInfo({ids:ids})
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
    }
  },
  created: function() {
    this.getItems();//拉去数据
  }
};
</script>

<style>

</style>
