<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">api接口信息列表</span>
        </div>
        <div class="table-top-bar clearfix">
            <el-button type="primary" @click="routerLink('/apiInfoList/save','save',0)" >添加api接口信息</el-button>  
        </div>
  
        <!-- table -->
        <el-table style="width:100%" :data="items"  stripe @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="ID" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="接口名称" prop="apiName" align="center"></el-table-column>
            <el-table-column label="接口URL" prop="apiUrl" align="center"></el-table-column>
            <el-table-column label="接口代码" prop="apiCode" align="center"></el-table-column>
            <el-table-column label="每日限制调用次数" prop="limitCallDay" align="center"></el-table-column>
            <el-table-column label="总调用次数" prop="callTotalCount" align="center"></el-table-column>
            <el-table-column label="月调用次数" prop="callMonthCount" align="center"></el-table-column>
            <el-table-column label="周调用次数" prop="callWeekCount" align="center"></el-table-column>
            <el-table-column label="日调用次数" prop="callDayCount" align="center"></el-table-column>
            <el-table-column label="最后一次调用时间" prop="lastCallTime" align="center"></el-table-column>
            <el-table-column label="是否禁用" prop="disabled" align="center">
                  <template slot-scope="scope">
                     <span v-if='scope.row.disabled' class="red">是</span>
                      <span v-else>否</span>
                    </template>
            </el-table-column>
            <el-table-column label="操作选项"  align="center" width="200">
                <template slot-scope="scope">       
                    <a class="t-edit" title="修改" @click="routerLink('/apiInfoList/update','update',scope.row.id)"></a>            
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
import * as fetch from '@/api/set'
export default {
data() {
    return {
      loading: true,//提示变量
      items: [], //列表通用变量
      params: {
        pageNo: 1,
        pageSize: 10,
        username:''
      },
       ids:'',
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
      fetch.getApiInfoList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
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
          fetch.deleteApiInfo({ ids: ids }).then(res => {
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

