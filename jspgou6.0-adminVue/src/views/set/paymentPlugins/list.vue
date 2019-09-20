<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">支付插件列表</span>
        </div>
        <div class="table-top-bar clearfix">
           
        </div>
  
        <!-- table -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
          
            <el-table-column label="ID" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="名称"  prop="name" align="center"></el-table-column>
            <el-table-column label="排序" prop="priority" align="center">
                <template slot-scope="scope">
                    <el-input class="w50" type='number' min="0" v-model="scope.row.priority" ></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作"  align="center" width="100">
                <template slot-scope="scope">
                   <a class="t-edit" title="修改" @click="routerLink('/paymentPlugins/update','update',scope.row.id)"></a>
                </template>
            </el-table-column>
        </el-table>
        <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
               <el-button  @click="savePriority">保存排序</el-button>
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
      fetch.getPaymentPluginsList(this.params).then(res => {
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
      fetch.priorityPaymentPluginsInfo(params).then(res => {
        this.loading = false;
        if (res.code == 200) {
          this.successMessage("修改排序成功");
        }
        this.getItems();
      });
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
      this.getItems();//拉去数据
  }
}
</script>

<style>

</style>

