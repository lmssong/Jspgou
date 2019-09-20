<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">类型列表-分类列表</span>
        </div>
        <div class="table-top-bar clearfix">
             <div class="query-inline-box">
            <div class="bread-box">
              <label class="">当前类型：</label>  
               <ul class="type-bread">
                 <li class="bread-items">
                   <a href="javascript:void(0)">{{typeName}}</a>
                  </li>            
                 </ul> 
            </div>
           
          </div>
         
        </div>
        <!-- table -->
        <el-table style="width:100%" :data="items"  stripe  @selection-change="checkIds">
            <el-table-column type="selection" align="center" :width="68"></el-table-column>
          
            <el-table-column label="字段" prop="field" align="center"></el-table-column>
            <el-table-column label="数据类型" prop="dataType" align="center"  v-if="items.length>0">
                    <template slot-scope="scope">
                         <span v-if="scope.row.dataType==1">字符串文本</span>
                          <span v-if="scope.row.dataType==2">整形文本</span>
                           <span v-if="scope.row.dataType==3">浮点形文本</span>
                            <span v-if="scope.row.dataType==4">文本区</span>
                             <span v-if="scope.row.dataType==5">日期</span>
                              <span v-if="scope.row.dataType==6">下拉列表</span>
                              <span v-if="scope.row.dataType==7">复选框</span>
                              <span v-if="scope.row.dataType==8">单选框</span>
                    </template>
            </el-table-column>
           <el-table-column label="属性名称" prop="propertyName" align="center">
                     <template slot-scope="scope">
                       <el-input style="width:150px" v-model="scope.row.propertyName"></el-input>
                    </template>
           </el-table-column>
            <el-table-column label="排序" prop="sort" align="center" >
              <template slot-scope="scope">
                       <el-input class="w50" type='number' min="0" v-model="scope.row.sort"></el-input>
                    </template>
            </el-table-column>
               <el-table-column label="独占一行" prop="single" align="center" width="100">
                     <template slot-scope="scope">
                         <el-checkbox v-model="scope.row.single"></el-checkbox>
                    </template>
            </el-table-column>
            <el-table-column label="操作"  align="center" width="200">
                <template slot-scope="scope">
                    <a class="t-del" title="删除"  @click="deleteItems(scope.row.id)"></a>
                </template>
            </el-table-column>
        </el-table>
        <div class="default-size"  v-if="defaultTypeList.length>0">保存选中默认字段</div>
        <el-table :data="defaultTypeList"  stripe  v-if="defaultTypeList.length>0"   @selection-change="defaultTypeChange">
                <el-table-column type="selection" align="center" :width="68"></el-table-column>
            <el-table-column label="字段" prop="field" align="center"></el-table-column>
            <el-table-column label="数据类型" prop="dataType" align="center">
                    <template slot-scope="scope">
                         <span v-if="scope.row.dataType==1">字符串文本</span>
                          <span v-if="scope.row.dataType==2">整形文本</span>
                           <span v-if="scope.row.dataType==3">浮点形文本</span>
                            <span v-if="scope.row.dataType==4">文本区</span>
                             <span v-if="scope.row.dataType==5">日期</span>
                              <span v-if="scope.row.dataType==6">下拉列表</span>
                              <span v-if="scope.row.dataType==7">复选框</span>
                              <span v-if="scope.row.dataType==8">单选框</span>
                    </template>
            </el-table-column>
           <el-table-column label="属性名称" prop="propertyName" align="center">
                     <template slot-scope="scope">
                       <el-input style="width:150px" v-model="scope.row.propertyName"></el-input>
                    </template>
           </el-table-column>
            <el-table-column label="排序" prop="sort" align="center" >
              <template slot-scope="scope">
                       <el-input class="w50" type='number' min="0" v-model="scope.row.sort"></el-input>
                    </template>
            </el-table-column>
               <el-table-column label="独占一行" prop="single" align="center" width="100">
                     <template slot-scope="scope">
                         <el-checkbox v-model="scope.row.single"></el-checkbox>
                    </template>
            </el-table-column>
               <el-table-column label="操作"  align="center" width="200">
               </el-table-column>
        </el-table>
        <!---分页底部-->
        <div class="table-bottom-bar">
            <div class="pull-left">
               <el-button   @click="saveDefaultItems(checkDefaultTypeList)" v-if="defaultTypeList.length>0">保存默认选中字段</el-button> 
                <el-button  :disabled="disabled" @click="saveItems(saveTypeList)">保存内容</el-button> 
               <el-button :disabled="disabled"  @click="deleteItems(ids)">删除</el-button>
        
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
      typeName: "默认",
      items: [null], //列表通用变量
      params: {
        typeId: 0,
        isCategory: true
      },
      defaultTypeList: [
        {
          propertyName: "分类名称",
          field: "name",
          dataType: 1,
          single: false,
          sort: 10,
          optValue: [],

          typeId: 29
        },
        {
          propertyName: "访问路径",
          field: "path",

          dataType: 1,
          single: false,
          sort: 10,
          optValue: [],

          typeId: 29
        },
        {
          propertyName: "页面标题",
          field: "title",
          dataType: 1,
          single: false,
          sort: 10,
          optValue: [],
          typeId: 29
        },
        {
          propertyName: "页面关键词",
          field: "keywords",
          dataType: 1,
          single: false,
          sort: 10,
          optValue: [],
          typeId: 29
        },
        {
          propertyName: "页面描述",
          field: "description",
          dataType: 4,
          single: true,
          sort: 10,
          optValue: [],
          typeId: 29
        },
        {
          propertyName: "分类模板",
          field: "tplChannel",

          dataType: 6,
          single: false,
          sort: 10,
          optValue: [""],
          typeId: 29
        },
        {
          propertyName: "商品模板",
          field: "tplContent",

          dataType: 6,
          single: false,
          sort: 10,
          optValue: [""],
          typeId: 29
        },
        {
          propertyName: "排序",
          field: "priority",
          dataType: 2,
          single: true,
          sort: 10,
          optValue: [],
          typeId: 29
        },
        {
          propertyName: "图片",
          field: "imagePath",
          dataType: 1,
          single: true,
          sort: 10,
          optValue: [],

          typeId: 29
        },
        {
          propertyName: "关联品牌",
          field: "refBrand",
          dataType: 7,
          single: true,
          sort: 10,
          optValue: [""],
          typeId: 29
        },
        {
          propertyName: "扩展属性",
          field: "standardTypeIds",
          dataType: 7,
          single: true,
          sort: 10,
          optValue: [""],
          typeId: 29
        },
        {
          propertyName: "规格",
          field: "colorsize",
          dataType: 7,
          single: true,
          sort: 10,
          optValue: [""],
          typeId: 29
        }
      ],
      copyDefaultTypeList: [],
      checkDefaultTypeList: [],
      saveTypeList:[],
      disabledDefault: true,
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
      fetch.getModelInfo(this.params).then(res => {
        this.items = res.body;
        this.loading = false;
      });
    },
    saveDefaultItems(defObj) {
      let params = {
        typeId: this.$route.query.typeId,
        isCategory: this.$route.query.isCategory,
        field: [],
        propertyName: [],
        dataType: [],
        sort: [],
        single: []
      };
      for (let i in defObj) {
        params.field.push(defObj[i].field);
        params.propertyName.push(defObj[i].propertyName);
        params.dataType.push(defObj[i].dataType);
        params.sort.push(defObj[i].sort);
        params.single.push(defObj[i].single);
      }
      params.field = params.field.join(",");
      params.propertyName = params.propertyName.join(",");
      params.sort = params.sort.join(",");
      params.dataType = params.dataType.join(",");
      params.single = params.single.join(",");

      fetch.addDefaultTypeProperty(params).then(res => {
        if (res.code == 200) {
          this.successMessage("保存默认字段成功");
          this.getItems();
        }
      });
    },
    saveItems(defObj) {
        let params = {
        typeId: this.$route.query.typeId,
        isCategory: this.$route.query.isCategory,
        id: [],
        propertyName: [],
        dataType: [],
        sort: [],
        single: []
      };
      for (let i in defObj) {
        params.id.push(defObj[i].id);
        params.propertyName.push(defObj[i].propertyName);
        params.dataType.push(defObj[i].dataType);
        params.sort.push(defObj[i].sort);
        params.single.push(defObj[i].single);
      }
      params.id = params.id.join(",");
      params.propertyName = params.propertyName.join(",");
      params.sort = params.sort.join(",");
      params.dataType = params.dataType.join(",");
      params.single = params.single.join(",");
      fetch.addTypePropertyContent(params).then(res => {
        if (res.code == 200) {
          this.successMessage("保存成功");
          this.getItems();
        }
      });

    },
    deleteItems(ids) {
      this.$confirm("确定要删除吗?", "警告", { type: "error" })
        .then(mes => {
          fetch
            .deleteTypePropertyContent({
              ids: ids,
              typeId: this.$route.query.typeId,
              isCategory: this.$route.query.isCategory
            })
            .then(res => {
              if (res.code == 200) {
                this.successMessage("删除成功");
                this.defaultTypeList = [
                  {
                    propertyName: "分类名称",
                    field: "name",
                    dataType: 1,
                    single: false,
                    sort: 10,
                    optValue: [],

                    typeId: 29
                  },
                  {
                    propertyName: "访问路径",
                    field: "path",

                    dataType: 1,
                    single: false,
                    sort: 10,
                    optValue: [],

                    typeId: 29
                  },
                  {
                    propertyName: "页面标题",
                    field: "title",
                    dataType: 1,
                    single: false,
                    sort: 10,
                    optValue: [],
                    typeId: 29
                  },
                  {
                    propertyName: "页面关键词",
                    field: "keywords",
                    dataType: 1,
                    single: false,
                    sort: 10,
                    optValue: [],
                    typeId: 29
                  },
                  {
                    propertyName: "页面描述",
                    field: "description",
                    dataType: 4,
                    single: true,
                    sort: 10,
                    optValue: [],
                    typeId: 29
                  },
                  {
                    propertyName: "分类模板",
                    field: "tplChannel",

                    dataType: 6,
                    single: false,
                    sort: 10,
                    optValue: [""],
                    typeId: 29
                  },
                  {
                    propertyName: "商品模板",
                    field: "tplContent",

                    dataType: 6,
                    single: false,
                    sort: 10,
                    optValue: [""],
                    typeId: 29
                  },
                  {
                    propertyName: "排序",
                    field: "priority",
                    dataType: 2,
                    single: true,
                    sort: 10,
                    optValue: [],
                    typeId: 29
                  },
                  {
                    propertyName: "图片",
                    field: "imagePath",
                    dataType: 1,
                    single: true,
                    sort: 10,
                    optValue: [],

                    typeId: 29
                  },
                  {
                    propertyName: "关联品牌",
                    field: "refBrand",
                    dataType: 7,
                    single: true,
                    sort: 10,
                    optValue: [""],
                    typeId: 29
                  },
                  {
                    propertyName: "扩展属性",
                    field: "standardTypeIds",
                    dataType: 7,
                    single: true,
                    sort: 10,
                    optValue: [""],
                    typeId: 29
                  },
                  {
                    propertyName: "规格",
                    field: "colorsize",
                    dataType: 7,
                    single: true,
                    sort: 10,
                    optValue: [""],
                    typeId: 29
                  }];
                setTimeout(() => {
                    this.getItems();
                },500);
                
              }
            });
        })
        .catch(error => {});
    },
    defaultTypeChange(val) {
      this.checkDefaultTypeList = val;
    },
    checkIds(res) {
      this.saveTypeList=res;
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
    }
  },
  watch: {
    items: {
      handler(curVal, oldVal) {
        let defList = this.defaultTypeList;
        for (let i in defList) {
          for (let j in curVal) {
            if (curVal[j].field == defList[i].field) {
              defList.splice(i, 1);
            }
          }
        }
      },
      deep: true
    }
  },
  created: function() {
    let typeId = this.$route.query.typeId;
    let isCategory = this.$route.query.isCategory;
    this.typeName = this.$route.query.typeName;
    this.params.typeId = typeId;
    this.params.isCategory = isCategory;
    this.getItems();
  }
};
</script>

<style scoped>
.default-size {
  padding: 12px 24px;
  font-size: 14px;
  color: red;
}
</style>

