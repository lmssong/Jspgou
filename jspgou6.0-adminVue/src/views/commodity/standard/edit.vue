<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/standardList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="规格名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="字段名称" :required="true">

            <el-input class="w192" v-model="info.field"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-col :span="12" class="border-none">
          <el-form-item label="备注">
            <el-input class="w192" v-model="info.remark"></el-input>
          </el-form-item>
            </el-col>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="规格类型">
            <el-radio v-model="info.dataType" :label="true">图片</el-radio>
            <el-radio v-model="info.dataType" :label="false">文字</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-col class="border-none" :span="12">
            <el-form-item label="排序" prop="priority">
              <el-input class="w192" v-model.number="info.priority" type="number" min="0"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        
       
  
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="规格值" >
               <el-button @click="addInfoItems">添加规格值</el-button>
               
                 <div class="flex-group">
                        <div class="s-102">规格值名称</div>
                        <div class="s-266">颜色 <span class="gray">(仅当规格为颜色时使用)</span></div>
                        <div class="s-64">排序</div>
                        <div class="s-30">操作</div>
                 </div>
                    <div class="flex-group" v-for="(item,index) in infoItems" :key="item.itemId">
                        <div class="s-102"><el-input v-model="item.itemName"></el-input></div>
                        <div class="s-266">
                            <el-input
                         placeholder="输入颜色代码或在右侧选择"
                         style="width:225px" v-model="item.itemColor"></el-input>
                         <el-color-picker v-model="item.itemColor"></el-color-picker>
                         </div>
                         <div class="s-64"><el-input v-model.number="item.itemPriority" type="number" min="0"></el-input></div>
                        <div class="s-30"><span class="iconfont bbs-delete" @click="deleteInfoItems(index)"></span></div>
                 </div>
                    
                 
          </el-form-item>
        </el-col>
      
      </el-row>
  
    </el-form>
    <div class="form-bottom-bar">
      <el-button type="warning" v-if="type=='save'" @click="saveForm(true)">提交并继续添加</el-button>
      <el-button type="primary" v-if="type=='save'" @click="saveForm(false)">添加</el-button>
      <el-button type="primary" v-if="type=='update'" @click="updateForm()">修改</el-button>
      <el-button type="info" @click="restForm()">重置</el-button>
       <div class="help-info" v-if="type=='save'">选择“提交并继续添加”按钮会停留在添加页面；选择“添加”按钮后将跳转到对应的列表页。</div>
    </div>
  
  </div>
</template>

<script>
  import * as fetch from "@/api/commodity";
  export default {
    data() {
      return {
        loading: true,
        type: this.$route.query.type,
        id: this.$route.query.id,
        info: {}, //列表
        infoItems:[],
        itemName:[],
        itemColor:[],
        itemPriority:[],
         itemId:[],
        categoryIdList: [],
       
        rules: {
          name: [{
            required: true,
            message: "请输入分类名",
            trigger: "blur"
          }],
          path: [{
            required: true,
            message: "请输入路径",
            trigger: "blur"
          }],
          priority: [{
            required: true,
            message: "请输入排序",
            type: 'number',
            trigger: "blur"
          }],
        }
      }
    },
    methods: {
      getInfo(id) {
        fetch.getStandardInfo({id: id
        }).then(res => {
          this.info = res.body.standardType;    
          this.infoItems=res.body.standard;

          this.loading = false;
        })
      },
      addInfoItems(){//添加项
        let obj={
            itemName:'',
            itemColor:'',
            itemPriority:'',
            itemId:''
        };
        this.infoItems.push(obj);
      },
      deleteInfoItems(index){//删除项
            this.infoItems.splice(index,1);
      },
      updateForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
             this.info.itemName=this.itemName.join(',');
             this.info.itemColor= this.itemColor.join(',');
             this.info.itemPriority=this.itemPriority.join(',');
             this.info.itemId=this.itemId.join(',');
            fetch.updateStandardInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('修改成功');
                setTimeout(() => {
                  this.routerLink('/standardList', 'list');
                }, 1000)

              }
            })
          }
        });
      },
      saveForm(state) { //增加
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.info.itemName=this.itemName.join(',');
             this.info.itemColor= this.itemColor.join(',');
             this.info.itemPriority=this.itemPriority.join(',');
            fetch.addStandardInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/standardList', 'list');
                  }, 1000)
                }
              }
            })
          }
        });
      },
      restForm() { //重置
        this.$refs['form'].resetFields();
        this.getInfo(this.id);
      }
    },
    watch:{
            infoItems:{
                handler(newVal,oldVal){
                   let arr1=[];
                     let arr2=[];
                     let arr3=[];
                     let arr4=[];
                   for(let i in newVal){        
                     arr1.push(newVal[i].itemName);
                      arr2.push(newVal[i].itemColor);
                       arr3.push(newVal[i].itemPriority);    
                         arr4.push(newVal[i].itemId)            
                   }
                   this.itemName=arr1;
                    this.itemColor=arr2;
                     this.itemPriority=arr3;
                     this.itemId=arr4;
                         
            },
            deep:true}
    },
    created: function() {
      this.getInfo(this.id);
    }
  
  }
</script>

<style>
 .flex-group{
     display: flex;
     align-items:center;
      text-align:center;
      color:#8a8e98;
      font-size: 14px;
      margin:6px 0;
 }
  .flex-group .gray{
      color:#d8dce5;
  }
 
  .s-102{
      width: 102px;
        text-align:center;
      margin-right: 36px;
  }
  .s-266{
 width: 266px;  
      margin-right: 36px;
      display:flex;
    justify-content: center;
  }
  .s-64{
      width: 64px;
       margin-right: 62px;
  }
  .s-30{
   width:30px;
   height: 36px;
   line-height: 36px; 
   cursor: pointer;
  }
  .el-color-picker__trigger{
      width: 36px;
      height: 36px;
      margin-left: 7px;
  }
  .bbs-delete{
      font-size: 22px;
  }
</style>
