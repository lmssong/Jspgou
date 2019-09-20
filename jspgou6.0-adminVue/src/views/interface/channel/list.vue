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
               <el-button type="primary" @click="addChannel(1)">添加单页栏目</el-button> 
               <el-button type="primary"  @click="addChannel(2)">添加文章栏目</el-button> 
               <el-button type="primary"  @click="addChannel(3)">添加链接栏目</el-button> 
          </div>
        </div>
        <div style="width:100%;" v-loading="loading">
          <el-table style="width:100%" :data="items"  stripe @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="id" prop="id" align="center" :width="68"></el-table-column>
            <el-table-column label="栏目名称" prop="name" align="center">
                      <template slot-scope="scope">
                            <span v-if="scope.row.type==1">{{scope.row.name}}[单页栏目]</span>
                             <span v-if="scope.row.type==2">{{scope.row.name}}[文章栏目]</span>
                              <span v-if="scope.row.type==3">{{scope.row.name}}[链接栏目]</span>
                    </template>

            </el-table-column>
            <el-table-column label="访问路径" prop="path" align="center">
               <template slot-scope="scope">
                    <span v-if="scope.row.type==3">{{scope.row.outerUrl}}</span>
                     <span v-else>{{scope.row.path}}</span>
                       </template>
            </el-table-column>
            <el-table-column label="栏目页模板" prop="tplChannel" align="center"></el-table-column>
             <el-table-column label="内容页模板" prop="tplContent" align="center"></el-table-column>
              <el-table-column label="是否显示" prop="display" align="center">
                  <template slot-scope="scope">
                         <span v-if="scope.row.display">是</span>
                         <span v-else>否</span>
                    </template>
            </el-table-column>
            <el-table-column label="排序" prop="priority" align="center">
                  <template slot-scope="scope">
                          <el-input class="w50" type='number' min="0" v-model="scope.row.priority"></el-input>
                    </template>
            </el-table-column>
             <el-table-column label="操作"  align="center" width="200">
                        <template slot-scope="scope">
                          <a class="t-edit" title="修改" @click="editForm(scope.row.id)">
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
        pid: 0,
        modelId: "",
        name:'顶级分类'
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
    console.log(data);
      this.loading = true;
      this.params.pid = data.id;
      this.getItems();
      if(data.isChild){
        this.editForm(data.id);
      }else{
            if(data.id==0){
             this.params.name='顶级分类'
            }else{
              this.params.name=data.name;
            }
      }




    },
    getItems() {
      //获取接口数据
      fetch.getChannelList(this.params).then(res => {
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
        prioritys: priority
      };
      fetch.priorityChannelInfo(params).then(res => {
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
          fetch.deleteChannelInfo({ ids: ids }).then(res => {
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
