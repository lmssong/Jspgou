<template>
  <div class="forum-module">
    <div class="forum-header">
      <span class="forum-name">分类列表</span>
    </div>
    <div class="tree-layout">
      <div class="tree">
        <div class="reflash" @click="reflash()"><span class="el-icon-refresh"></span> 刷新</div>
        <el-tree :props="props" :load="ansyTree" lazy :indent='16'
         node-key="id"
          :default-expanded-keys="[0]"
          @node-click="selectList"
          ></el-tree>
      </div>
      <div class="tree-list">
        <div class="table-top-bar clearfix">
          <div class="query-inline-box">
               <el-button type="primary" @click="routerLink('/articleList/save','save',params.cid)">添加文章</el-button> 
          </div>
        </div>
        <div style="width:100%;" v-loading="loading">
          <el-table style="width:100%" :data="items"  stripe @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="标题" prop="name" align="center">
                      <template slot-scope="scope">
                            <span class="link-color">{{scope.row.title}}[{{scope.row.channelName}}]</span>
                    </template>

            </el-table-column>
            <el-table-column label="是否禁用" prop="disabled" align="center">
               <template slot-scope="scope">
                    <span v-if="scope.row.disabled">是</span>
                     <span v-else>否</span>
                       </template>
            </el-table-column>
             <el-table-column label="操作"  align="center" width="200">
                        <template slot-scope="scope">
                          <a class="t-edit" title="修改" @click="routerLink('/articleList/update','update',scope.row.id)">
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
import * as fetch from "@/api/interface";
export default {
  data() {
    return {
      loading: true,
      ids: "",
      disabled: true, //禁用
      items: [], //列表通用变量
      ModelList: [], //模型列表
      params: {
        pageNo: 1,
        pageSize: 10,
        pid: 0,
        modelId: "",
        name:'顶级分类'
      },
      pagination: {//分页参数
        total: 0, 
        currentPage: 1,
        changePageSize: localStorage.getItem('PageSize'),
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
        return resolve([{ name: "顶级分类", id: 0 }]);
      }
      if (node.level > 0) {
        fetch.getChannelTree({
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
    addChannel(typeId){
          this.$router.push(
            {
                path:'/channelList/save',
                query:{
                type:'save',
                topName:this.params.name,
                id:0,
                pid:this.params.pid,
                typeId:typeId
            }
            }
        )
    },
    editForm(id){
         this.$router.push(
            {
                path:'/channelList/update',
                query:{
                type:'update',
                topName:this.params.name,
                id:id,
                pid:this.params.pid
                
            }
            }
        )
    },
    selectList(data, node, el) { //点击查询对应分类
    
      this.loading = true;
       this.params.cid = data.id;
            if(data.id==0){
                  this.params.cid ='';
             this.params.name='顶级分类'
            }else{
              this.params.name=data.name;
            }
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
    } ,
    getItems() {
      //获取接口数据
      fetch.getArticleList(this.params).then(res => {
          this.pagination.total = res.totalCount; //分页
        this.items = res.body;
        this.loading = false;
      });
    },
    
    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteArticleInfo({ ids: ids }).then(res => {
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
    reflash() {
      window.location.reload();
    },
  
  },
  created: function() {
    let id = this.$route.query.id;
    this.loading = true;
     if(id){ 
              this.params.pid=id 
            }
   this.getItems(); //拉去数据
    
    
   
  }
};
</script>

<style scoped>
.tree-list{
  margin-left: 200px;
}
</style>
