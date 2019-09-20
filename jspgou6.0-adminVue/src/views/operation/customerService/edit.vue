<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/customerService','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="客服昵称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="类型" :required="true">
            <el-select filterable placeholder="请选择" v-model="info.type" class="w192">
                    <el-option label="QQ" value='QQ'></el-option>
                    <el-option label="Ali" value='Ali'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
             <el-col class="border-none" :span="12">
          <el-form-item label="客服账号" prop="content">
            <el-input class="w192" v-model="info.content"></el-input>
          </el-form-item>
            </el-col>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="排序" :required="true">
            <el-input class="w192" v-model.number="info.priority" type="number"></el-input>
          </el-form-item>
        </el-col>
      
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="是否禁用" :required="true">
            <el-radio v-model="info.disabled" :label="true">是</el-radio>
            <el-radio v-model="info.disabled" :label="false">否</el-radio>
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
            message: "请输入客服名",
            trigger: "blur"
          }],
          content: [{
            required: true,
            message: "请输入客服账号",
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
        fetch.getCustomerServiceInfo({
          id: id
        }).then(res => {
          this.info = res.body;
          this.info.type='QQ';
          this.info.disabled=false;
           this.loading = false;  
        })
      },
      updateForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
          
            fetch.updateCustomerServiceInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('修改成功');
                setTimeout(() => {
                  this.routerLink('/customerService', 'list');
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
          
            fetch.addCustomerServiceInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.imagePath='';
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/customerService', 'list');
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
    },
    created: function() {
      this.getInfo(this.id);
    }
  
  }
</script>

<style>
  
</style>
