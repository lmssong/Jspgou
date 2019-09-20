<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">api接口账户列表</span>
        </div>
        <div class="table-top-bar clearfix">
            <el-button type="primary" @click="routerLink('/addapiinfoaccount','save',0)" >添加api接口信息</el-button>
            <el-button  @click="routerLink('/apiinfoaccountupdate','save',0)" >独立密码修改</el-button>   
        </div>
  
        <!-- table -->
        <el-table style="width:100%" :data="items"  stripe >
           
            <el-table-column label="ID" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="appid" prop="acount" align="center"></el-table-column>            
            <el-table-column label="是否禁用" prop="disabled" align="center">
                  <template slot-scope="scope">
                     <span v-if='scope.row.disabled' class="red">是</span>
                      <span v-else>否</span>
                    </template>
            </el-table-column>
            <el-table-column label="操作选项"  align="center" width="200">
                <template slot-scope="scope">       
                    <a class="t-edit" title="修改" @click="routerLink('/editapiinfoaccount','update',scope.row.id)"></a>            
                </template>
            </el-table-column>
        </el-table>
        <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
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
      fetch.getApiAccountList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
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

