<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name" v-if="typeNum==0">站内信列表</span>
               <span class="forum-name" v-if="typeNum==1">收件箱列表</span>
                  <span class="forum-name" v-if="typeNum==2">垃圾箱列表</span>
        </div>
        <div class="table-top-bar clearfix">
            <div class="query-inline-box">
                <el-button type="primary"@click="routerLink('/messageList/save','save',0)" >发送站内信</el-button>
                 <el-button  @click="getItems" >站内信列表</el-button>  
                <el-button  @click="getReceivemessageList" >收件箱</el-button>      
                <el-button  @click="getRecycleMessageList" >垃圾箱</el-button>           
            </div>
        </div>
        <!-- table -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="ID" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="标题"  prop="msgTitle" align="center"></el-table-column>         
           <el-table-column label="内容"  prop="msgContent" align="center"></el-table-column>
           <el-table-column label="收件人姓名"  prop="receiverUserName" align="center"></el-table-column>       
            <el-table-column label="操作"  align="center" width="200">
                <template slot-scope="scope">
                    <a class="t-edit" title="查看" @click="routerLink('/messageList/update','update',scope.row.id)"></a>
                    <a class="t-del" title="删除" @click="deleteItems(scope.row.id)" v-if='typeNum==2'> </a>
                     <a class="t-del" title="删除" @click="removeItems(scope.row.id)"  v-if='typeNum==1||typeNum==0'></a>
                </template>
            </el-table-column>
        </el-table>
        <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
               <el-button :disabled="disabled" @click="deleteItems(ids)" v-if='typeNum==2'>批量删除</el-button>
                <el-button :disabled="disabled" @click="removeItems(ids)" v-if='typeNum==1||typeNum==0'>批量移除</el-button>
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
import * as fetch from "@/api/dict";
export default {
  data() {
    return {
      loading: true, //提示变量
      items: [], //列表通用变量
      ids: "",
      typeNum: 1,
      params: {
        pageNo: 1,
        pageSize: 10,
        username: ""
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
      fetch.getMessageList(this.params).then(res => {
        this.typeNum = 0;
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    getReceivemessageList() {
      this.loading = true;
      this.typeNum = 1;
      this.params.pageNo = 1;
      fetch.getReceivemessageList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    getRecycleMessageList() {
      this.typeNum = 2;
      this.loading = true;
      this.params.pageNo = 1;
      fetch.getRecycleMessageList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    removeItems(ids) {
      this.$confirm("确定要删除至垃圾箱吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.getRemoveMessageList({ ids: ids }).then(res => {
            if (res.code == 200) {
              this.successMessage("删除成功");
              if (this.typeNum == 0) {
                this.getItems();
              } else {
                this.getReceivemessageList();
              }
            }
          });
        })
        .catch(error => {});
    },

    deleteItems(ids) {
      this.$confirm("此操作将删除站内信, 确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteMessageList({ ids: ids }).then(res => {
            if (res.code == 200) {
              this.successMessage("删除成功");
            }
            this.getRecycleMessageList();
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
      this.getItems();
    },
    getPage(val) {
      //获取当前页数
      this.loading = true;
      this.params.pageNo = val;
      if (this.typeNum == 0) {
        this.getItems();
      } else if (this.typeNum == 1) {
        this.getReceivemessageList();
      } else if (this.typeNum == 2) {
        this.getRecycleMessageList();
      }
    },
    getSize(val) {
      //分页
      this.loading = true;
      this.params.pageNo = val;
      if (this.typeNum == 0) {
        this.getItems();
      } else if (this.typeNum == 1) {
        this.getReceivemessageList();
      } else if (this.typeNum == 2) {
        this.getRecycleMessageList();
      }
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
      if (this.typeNum == 0) {
        this.getItems();
      } else if (this.typeNum == 1) {
        this.getReceivemessageList();
      } else if (this.typeNum == 2) {
        this.getRecycleMessageList();
      }
    },
    getLocalPage() {
      let size = localStorage.getItem("PageSize");
      if (size != null) {
        this.params.pageSize = parseInt(size); //取本地存储的条目
      } else {
        this.changePageSize = 20;
      }
      if (this.typeNum == 0) {
        this.getItems();
      } else if (this.typeNum == 1) {
        this.getReceivemessageList();
      } else if (this.typeNum == 2) {
        this.getRecycleMessageList();
      }
    }
  },
  created: function() {
    this.getLocalPage(); //拉去数据
  }
};
</script>

<style>

</style>

