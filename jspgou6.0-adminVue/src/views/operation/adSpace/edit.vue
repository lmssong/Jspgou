<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/adspace','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="版位名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
            <span class="gray">一般用来表明广告所在的位置，同一版位下可以有多个广告</span>
          </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            
          <el-form-item label="版位说明" prop="description">
            <el-input class="w192" v-model="info.description" type="textarea"></el-input>
          </el-form-item>
           
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="是否启用" :required="true">
            <el-radio v-model="info.enabled" :label="true">是</el-radio>
            <el-radio v-model="info.enabled" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
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


  import * as fetch from "@/api/operation";
  export default {
  
    data() {
      return {
        loading: true,
        type: this.$route.query.type,
        id: this.$route.query.id,
        info: {}, //列表
        categoryIdList: [],
        
        imagePath: '',
        rules: {
          name: [{
            required: true,
            message: "请输入版位名称",
            trigger: "blur"
          }]    
         
        }
      }
    },
    methods: {
      getInfo(id) {
        fetch.getAdspaceInfo({
          id: id
        }).then(res => {
          this.info = res.body;
          this.info.enabled=true;
           this.loading = false;  
        })
      },
      updateForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.updateAdspaceInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('修改成功');
                setTimeout(() => {
                  this.routerLink('/adspace', 'list');
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
          
            fetch.addAdspaceInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/adspace', 'list');
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
      },
    },
    created: function() {
      this.getInfo(this.id);
    }
  
  }
</script>

<style>
  
</style>
