<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/ftpList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="服务器IP" prop="ip">
            <el-input class="w192" v-model="info.ip"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="FTP端口号" prop="port">
             <el-input class="w192" v-model.number="info.port"></el-input>
             <span class="gray">默认端口21</span>
          </el-form-item>
        </el-col>
       
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="传输超时时间" prop="timeout">
             <el-input class="w192" v-model.number="info.timeout"></el-input>
                <span class="gray">单位：秒，0为服务器默认</span>
          </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="FTP用户名" prop="username">
             <el-input class="w192" v-model="info.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="FTP密码" prop="password">
             <el-input class="w192" v-model="info.password" type="password"></el-input>
             
          </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="远程目录">
             <el-input class="w192" v-model="info.path"></el-input>
             <span class="gray">留空为根目录</span>
          </el-form-item>
        </el-col>
           <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="编码" prop="encoding">
             <el-input class="w192" v-model="info.encoding"></el-input>
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="访问URL" prop="url">
             <el-input class="w192" v-model="info.url"></el-input>
               <span class="gray">访问该FTP的url地址</span>
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
import * as fetch from "@/api/set";

export default {
  data() {
    return {
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {}, //列表
      typeList: [],
      pathUrl: "",
      rules: {
          password:[{required: true, message: "请输入密码",trigger: "blur"}],
        name:[{required: true, message: "请输入名称",trigger: "blur"}],
        ip:[{required: true, message: "此项必填",trigger: "blur"}],
        timeout:[{required: true,type:'number',message: "此项必填",trigger: "blur"}],
        port:[{required: true,type:'number', message: "请输入数字排序",trigger: "change"}],
        encoding: [{required: true,  message: "此项必填",trigger: "blur"}],
        path: [{required: true, message: "此项必填",trigger: "blur"}],
        url: [{required: true,message: "此项必填",trigger: "blur"}],
        username: [{required: true,  message: "此项必填",trigger: "blur"}],
      }
    };
  },
  methods: {
    getInfo(id) {
      fetch
        .getFtpInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;   
          this.info.encoding='utf-8';    
          this.loading = false;
        });
   
    },
  getPath(path){
        this.info.logoPath=path;
        this.pathUrl=path;
    },
    updateForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch.updateFtpInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/ftpList", "list");
              }, 1000);
            }
          });
        }
      });
    },
    saveForm(state) {
      //增加

      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;

          fetch.addFtpInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("添加成功");
              if (state) {
                this.getInfo(this.id);
                 this.pathUrl='';
              } else {
                setTimeout(() => {
                  this.routerLink("/ftpList", "list");
                }, 1000);
              }
            }
          });
        }
      });
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      this.getInfo(this.id);
      this.pathUrl='';
    }
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
