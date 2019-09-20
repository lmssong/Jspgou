<template>
  <div class="forum-module" v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">订单列表</span>
        </div>
         <div class="table-top-bar clearfix">
            <div class="query-inline-box ">
                      <div class="query-inline-group">
                            <label>查询时间:</label>
                            <el-date-picker class="w128-sm" v-model="params.startTime" @keyup.enter.native="query" 
                               value-format="yyyy-MM-dd"></el-date-picker>   
                            <span class="time-slot">-</span>
                            <el-date-picker  class="w128-sm" @keyup.enter.native="query" v-model="params.endTime" 
                               value-format="yyyy-MM-dd "></el-date-picker>
                </div>
                <div class="query-inline-group">
                                <el-select filterable placeholder="请选择" v-model="params.categoryId" class="w192">
                                    <el-option label="根目录" ></el-option>
                                    <el-option v-for="item in categoryIdList" :key="item.id" :label="item.categoryName" :value="item.id">
                                        <span :style="{paddingLeft:item.leval*10+'px'}" v-if="item.leval>1">>{{item.categoryName}}</span>
                                        <span :style="{paddingLeft:item.leval*10+'px'}" v-else>{{item.categoryName}}</span>
                                    </el-option>
                            </el-select>
                </div>

                 <div class="query-inline-group">
                     <el-button @click="query" >查询</el-button>   
                </div>
            </div>
        </div>
           <!-- teble -->
        <el-table style="width:100%" :data="items"  stripe >
            <el-table-column label="商品名称" prop="productName" align="center"></el-table-column>
            <el-table-column label="分类名称"  prop="categoryName"  align="center"></el-table-column>
            <el-table-column label="销量" prop="saleCount" align="center"></el-table-column>
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
import * as fetch from "@/api/commodity";
export default {
  data() {
    return {
      loading: true, //提示变量
      items: [], //列表通用变量
      ids: "",
      params: {
        pageNo: 1,
        pageSize: 10,
        userName: "",
        categoryId:'',
       productName:'',
        startTime:'',
        endTime:''
      },
      categoryIdList:[],
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
      fetch.getHotList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
        fetch.getBrandTypeInfo().then(res1 => {
            this.categoryIdList = res1.body;
          })
    },
    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteDiscussInfo({ids: ids }).then(res => {
            if (res.code == 200) {
              this.successMessage("删除成功");
            }
            this.getItems();
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
  }
};
</script>

<style scoped>
 .w160{
     width:128px;
     margin-right: 10px;
 }

</style>
