<template>
  <div class="forum-module" v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">用户等级列表</span>
        </div>
         <div class="table-top-bar clearfix">
            <div class="query-inline-box flex-between">
              <el-button type="primary" @click="routerLink('/rankList/save','save',0)">添加用户等级</el-button>      
            </div>
        </div>
        <!-- teble -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="用户等级"  prop="name"  align="center"></el-table-column>
            <el-table-column label="所需积分" prop="score" align="center"></el-table-column>
            <el-table-column label="折扣" prop="discount" align="center"></el-table-column>
             <el-table-column label="操作"  align="center" width="200">
                         <template slot-scope="scope">
                             <a class="t-edit" title="修改" @click="routerLink('/rankList/update','update',scope.row.id)"></a>
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
import * as fetch from '@/api/userMange'
export default {
data() {
    return {
      loading: true,//提示变量
      items: [], //列表通用变量
      disabled: true, //禁用
      ids:''
    };
  },
  methods:{
      getItems() {
      //获取接口数据
      fetch.getRankList().then(res => {      
        this.items = res.body;
        this.loading = false;
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
    },
    deleteItems(ids){
       this.$confirm("确定要删除吗?", "警告",{type:'error'})
       .then(mes=>{
          fetch.deleteRankInfo({ids:ids})
          .then(res=>{
              if(res.code==200){
                this.successMessage('删除成功');          
              }
                 this.getItems()
          })
       })
       .catch(error=>{});
    },
  },
  created:function(){
      this.getItems();//拉去数据
  }
}
</script>

<style>

</style>
