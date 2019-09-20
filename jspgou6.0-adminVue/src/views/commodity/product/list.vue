<template>
    <div class="forum-module">
        <div class="forum-header">
            <span class="forum-name">分类列表</span>
        </div>
        <div class="tree-layout">
            <div class="tree">
                <div class="reflash" @click="reflash()"><span class="el-icon-refresh"></span> 刷新</div>
                <el-tree :props="props" :load="ansyTree" lazy :indent='16' node-key="id" :default-expanded-keys="[0]" @node-click="selectList"></el-tree>
            </div>
            <div class="tree-list">
                <div class="table-top-bar clearfix">
                    <div class="query-inline-box flex-between">
                      <div>
                        <el-select v-model="params.status" @change="query" style="width:85px;margin-right:11px;">
                            <el-option label="在售" :value="1"></el-option>
                            <el-option label="下架" :value="2"></el-option>
                        </el-select>
                        <el-checkbox-button v-model="params.isRecommend" true-label=true false-label=" " @change="query" class="border-left">推荐</el-checkbox-button>
                        <el-checkbox-button v-model="params.isSpecial" true-label=true false-label=" " @change="query">特价</el-checkbox-button>
                        <el-checkbox-button v-model="params.isHotsale" true-label=true false-label=" " @change="query">热卖</el-checkbox-button>
                        <el-checkbox-button v-model="params.isNewProduct" true-label=true false-label=" " @change="query">新品</el-checkbox-button>
                  </div>
                  <div>
                          <div class="query-inline-group" style="margin-left:55px;">
                            <label for="">商品名称:</label>
                            <el-input class="w160" v-model="params.productName" @keyup.native.enter="query"></el-input>           
                            </div>
                        <div class="query-inline-group">
                            <label for="">品牌:</label>
                            <el-input class="w160" v-model="params.brandName" @keyup.native.enter="query"></el-input>
                            <el-button class="ml16 query" @click="query()">查询</el-button>        
                        </div> 

                      </div>        
                    </div>
                </div>
                <div  v-loading="loading">
                    <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
                        <el-table-column type="selection" align="center" :width="68"></el-table-column>
                        <!-- <el-table-column label="id" prop="id" align="center" ></el-table-column> -->
                        <el-table-column label="图片" prop="coverImg" align="center" width="80">
                            <template slot-scope="scope">
                                     <img :src="url+scope.row.coverImg" class="img-50" style="margin-right:20px;">
                                </template>
                          </el-table-column>
                         <el-table-column label="商品名称" align="center"  width="200">
                            <template slot-scope="scope">
                              <div class="text-left">
                                <a :href="url+scope.row.url" class="link-color" target="_blank">{{scope.row.name}}</a>
                                </div>
                            </template>
                         </el-table-column>
                        <el-table-column label="分类" prop="categoryName" align="center" ></el-table-column>
                        <el-table-column label="品牌" prop="brandName" align="center"  ></el-table-column>
                         <el-table-column label="价格" prop="salePrice" align="center"  ></el-table-column>
                         <el-table-column label="库存" prop="stockCount" align="center"  ></el-table-column>
                                         
             <el-table-column label="操作"  align="center" >
<template slot-scope="scope">
    <a class="t-edit" title="修改" @click="editProduct(scope.row)">
    </a>
    <a class="t-del" title="删除" @click="deleteItems(scope.row.id)"></a>
</template>
                </el-table-column>
        </el-table>
        </div>
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
    </div>
  </div>
</template>

<script>
import * as fetch from "@/api/commodity";
export default {
  data() {
    return {
      loading: true,
      ids: "",
      disabled: true, //禁用
      items: [], //列表通用变量
      ModelList: [], //模型列表
      url: process.env.FILE_URL,
      params: {
        pageNo: 1,
        pageSize: 10,
        ctgId: "",
        productName: "",
        brandName: "",
        status: 1,
        isRecommend: "",
        isSpecial: "",
        isHotsale: "",
        isNewProduct: ""
      },
      pagination: {
        //分页参数
        total: 0,
        currentPage: 1,
        changePageSize: localStorage.getItem("PageSize")
      },
      props: {
        label: "name",
        children: "zones",
        isLeaf: "isChild",
        id: "id"
      }
    };
  },
  methods: {
    ansyTree(node, resolve) {
      //异步加载树形结构
      if (node.level === 0) {
        return resolve([
          {
            name: "所有分类",
            id: 0
          }
        ]);
      }
      if (node.level > 0) {
        fetch
          .getCommodityCategoryTree({
            pid: node.data.id
          })
          .then(res => {
            const data = [];
            for (let i in res.body) {
              let obj = {};
              obj.id = res.body[i].id;
              obj.isChild = res.body[i].isChild ? false : true;
              obj.name = res.body[i].name;
              data.push(obj);
            }
            return resolve(data);
          });
      }
    },
    editProduct(obj){
      
          let params={
            type:'update',
            categoryId:obj.categoryId,
            categoryName:obj.categoryName,
            id:obj.id,
            typeId:obj.typeId 
          }
       this.$router.push({path:'/productList/update',query:params}) 
    },
    selectList(data, node, el) {
      //点击查询对应分类
      this.loading = true;
      let id = data.id == 0 ? "" : data.id;
      this.params.ctgId = id;
      this.getItems();
    },
    getItems() {
      //获取接口数据
      fetch.getProductList(this.params).then(res => {
        this.pagination.total = res.totalCount; //分页
        this.items = res.body;

        this.loading = false;
      });
    },

    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", {
        type: "error"
      })
        .then(mes => {    
          fetch
            .deleteProductList({
              ids: ids
            })
            .then(res => {
              if (res.code == 200) {
                this.successMessage("删除成功");
              }
              this.getItems();
            });
        })
        .catch(error => {});
    },
    query() {
      this.loading = true;
      this.getItems();
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

    reflash() {
      window.location.reload();
    },
    creatGroup(params) {
      let arr = [];
      for (let i in params) {
        let obj = {
          value: "",
          label: ""
        };
        obj.label = params[i].name;
        obj.value = params[i].id;
        arr.push(obj);
      }
      return arr;
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
        this.changePageSize = 20;
      }
      this.getItems();
    }
  },

  created: function() {
     
    this.getLocalPage(); //拉去数据
    this.$store.dispatch("setCollapse");
     $(".aside").toggleClass("aside-collapse");
      $("body").toggleClass("mini");
  }
};
</script>

<style scoped>
.img-50 {
  width: 56px;
  height: 56px;
  vertical-align: middle;
  margin: 6px 0;
}
.tree-list{
  margin-left: 200px;
}
</style>
