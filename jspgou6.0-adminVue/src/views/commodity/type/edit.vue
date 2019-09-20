<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/typeList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-col :span="12" class="border-none">
          <el-form-item label="类型名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
          </el-col>
        </el-col>
      
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="商品分类模板前缀" prop="channelPrefix">
            <el-input class="w192" v-model="info.channelPrefix"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="商品内容模板前缀" prop="contentPrefix">
            <el-input class="w192" v-model="info.contentPrefix"></el-input>
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
        categoryIdList: [],
      
        rules: {
          name: [{
            required: true,
            message: "请输入类型名",
            trigger: "blur"
          }],
          path: [{
            required: true,
            message: "请输入路径",
            trigger: "blur"
          }],
          channelPrefix: [{
            required: true,
            message: "此项必填",
            trigger: "blur"
          }],
            contentPrefix: [{
            required: true,
            message: "此项必填",
            trigger: "blur"
          }],
        }
      }
    },
    methods: {
      getInfo(id) {
        fetch.getTypeInfo({
          id: id
        }).then(res => {
          this.info = res.body;
           this.loading = false;

        })
      },
      updateForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            
            fetch.updateTypeInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('修改成功');
                setTimeout(() => {
                  this.routerLink('/typeList', 'list');
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
          
            fetch.addTypeInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.imagePath='';
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/typeList', 'list');
                  }, 1000)
                }
              }
            })
          }
        });
      },
      restForm() { //重置
        this.$refs['form'].resetFields();
        this.getInfo(0);
      },
      getPath(path) {
        this.info.logoPath = path;
  
      },
     
    },
    created: function() {
      this.getInfo(this.id);
    }
  
  }
</script>

<style>
  
</style>
