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
      <div class="tree-list"  >
      
        <div class="table-top-bar clearfix">
          
          <div class="query-inline-box">
            <div class="bread-box">
              <label class="">当前分类：</label>  
               <ul class="type-bread">
                 <li v-for="(item,index) in breads" :key="item.id" class="bread-items">
                   <a href="javascript:void(0)" @click="clickBread(item.id,index)">{{item.name}}</a>
                  </li>            
                 </ul> 
            </div>
           <el-select v-model="params.modelId" filterable placeholder="添加子类型(支持模糊搜索)" @change="creatForm">      
              <el-option
                v-for="item in ModelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
        </el-select>
          </div>
        </div>
        <div  v-loading="loading">
          <el-table style="width:100%" :data="items"  stripe @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="分类名称" prop="categoryName" align="center"></el-table-column>
            <el-table-column label="访问路径" prop="path" align="center"></el-table-column>
            <el-table-column label="商品类型" prop="typeName" align="center"></el-table-column>
            <el-table-column label="排序" prop="priority" align="center">
                  <template slot-scope="scope">
                          <el-input class="w50" type='number' min="0"  v-model="scope.row.priority"></el-input>
                    </template>
            </el-table-column>
             <el-table-column label="操作"  align="center" width="200">
                        <template slot-scope="scope">
                          <a class="t-edit" title="修改" @click="editForm(scope.row.id,scope.row.typeId)">
                          </a>
                          <a class="t-del" title="删除" @click="deleteItems(scope.row.id)"></a>
                        </template>
                </el-table-column>
        </el-table>
        </div>
          <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
              <el-button  @click="savePriority">保存排序</el-button>
               <el-button :disabled="disabled" @click="deleteItems(ids)">批量删除</el-button>
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
      params: {
        pid: 0,
        modelId: ""
      },
      breads: [{ name: "所有分类", id: 0 }],
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
        return resolve([{ name: "所有分类", id: 0 }]);
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
    creatBread(node, arr) {//构造面包屑
      if (node.parent != null) {
        let params = { name: node.data.name, id: node.data.id };
        arr.push(params);
        this.creatBread(node.parent, arr);
      } else {
        this.breads = arr.reverse();
        return false;
      }
    },
    clickBread(id, index) {//点击面包屑
      let length = this.breads.length;
      this.breads.splice(index + 1, length - 1);
      this.params.pid = id;
      this.getItems();
    },
    selectList(data, node, el) { //点击查询对应分类
      this.creatBread(node, []);
      this.loading = true;
      this.params.pid = data.id;
      this.getItems();
    },
    getModelList() {//获取模型列表
      fetch.getModelListAll().then(res => {
        this.ModelList = this.creatGroup(res.body);
      });
    },
    creatForm(val) {//添加商品分类信息
        let parentId=this.breads[this.breads.length-1].id;
      this.$router.push({
        path: "/commodityCategoryList/save",
        query: { type: "save", 
                  modelId: val,
                  id:0,
                  parentId:parentId,

                   }
      });
    },
    editForm(id,typeId) {
       let parentId=this.breads[this.breads.length-1].id;
      this.$router.push({
        path: "/commodityCategoryList/update",
        query: { type: "update",
        typeId:typeId,
        id:id,
        }
      });
    },
    getItems() {
      //获取接口数据
      fetch.getCommodityCategoryList(this.params).then(res => {
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
      fetch.priorityCommodityCategoryInfo(params).then(res => {
        this.loading = false;
        if (res.code == 200) {
          this.successMessage("修改排序成功");
        }
        this.getItems();
      });
    },
    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch.deleteCommodityCategoryInfo({ ids: ids }).then(res => {
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
    }
  },
  created: function() {
    let id = this.$route.query.id;
    this.loading = true;
     if(id){ 
              this.params.pid=id
             
            }
   this.getItems(); //拉去数据
    this.getModelList();
    
   
  }
};
</script>

<style scoped>
.tree-list{
  margin-left: 200px;
}
</style>
