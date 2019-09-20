<template>
  <div class="forum-module" v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">优惠卷列表</span>
        </div>
         <div class="table-top-bar clearfix">
            <div class="query-inline-box flex-between">
              <el-button type="primary" @click="routerLink('/coupon/save','save',0)">添加优惠卷</el-button>      
             <div>
                   <div class="query-inline-group">
                   <el-select filterable placeholder="请选择" v-model="params.categoryId" @change="query" >
                            <el-option label="所有分类" value=''></el-option>
                            <el-option v-for="item in parantList" :key="item.id" :label="item.categoryName" :value="item.id">
                                <span :style="{paddingLeft:item.leval*10+'px'}" v-if="item.leval>1">>{{item.categoryName}}</span>
                                <span :style="{paddingLeft:item.leval*10+'px'}" v-else>{{item.categoryName}}</span>
                            </el-option>
                        </el-select>
                </div> 
             </div>
            </div>
        </div>
           <!-- teble -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68" ></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="优惠卷图片" prop="couponPicture" align="center">
                    <template slot-scope="scope">
                                     <img :src="url+scope.row.couponPicture" class="img-100">
                                </template>         
            </el-table-column>
            <el-table-column label="优惠卷名称"  prop="couponName"  align="center"></el-table-column>
             <el-table-column label="是否启用"  prop="couponName"  align="center">
                        <template slot-scope="scope">
                          <span v-if="scope.row.isusing">是</span>
                           <span v-else>否</span>
                        </template>

             </el-table-column>
            <el-table-column label="开始时间" prop="couponTime" align="center"></el-table-column>
            <el-table-column label="结束时间" prop="couponEndTime" align="center"></el-table-column>
             <el-table-column label="操作"  align="center" width="200">
                         <template slot-scope="scope">                      
                            <a class="t-del" title="删除" @click="deleteItems(scope.row.id)"></a>
                        </template>
                      </el-table-column>
        </el-table>
          <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
               <el-button  @click="disabledItems(true)">批量启用</el-button>
                <el-button  @click="disabledItems(false)">批量禁用</el-button>
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
  import * as commodity from "@/api/commodity";
export default {
  data() {
    return {
      loading: true, //提示变量
      items: [], //列表通用变量
      ids:'',
       url: process.env.FILE_URL,
      params: {
        pageNo: 1,
        pageSize: 10,
        categoryId: ""
      },
      parantList:[],
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
      fetch.getCouponList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
      commodity.getCommodityTopCategory().then(res=>{
        this.parantList = res.body;
      })


    },
     deleteItems(ids){
       this.$confirm("确定要删除吗?", "警告",{type:'error'})
       .then(mes=>{
          fetch.deleteCouponInfo({ids:ids})
          .then(res=>{
              if(res.code==200){
                this.successMessage('删除成功');          
              }
                 this.getItems()
          })
       })
       .catch(error=>{});
    },
    disabledItems(state){   
      let ids = [];
      for (let i in this.ids) {
        ids.push(this.ids[i]);
      }
      ids = ids.join(",");
      let params = {
        ids: ids,
        isUsing: state
      };
      let mess=state?'确定启用优惠卷吗?':'确定禁用优惠卷吗?';
       this.$confirm(mess, "警告",{type:'error'})
       .then(mes=>{
          this.loading = true;
           fetch.disabledCouponInfo(params).then(res => {
        this.loading = false;
        if (res.code == 200) {
          if(state){
            this.successMessage("启用成功");
          }else{
            this.successMessage("禁用成功");
          }
          
        }
        this.getItems();
      });

       }).catch(error=>{})


     
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
 .img-100{
     width: 100px;
     height: 58px;
     margin: 6px 0;

 }
</style>
