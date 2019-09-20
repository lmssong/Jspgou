<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
              
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" >       
          <el-form-item label="邮件服务器:" prop="host" >
            <el-input class="w192" v-model="info.host"></el-input>
            <span class="gray"> 如：smtp.126.com</span>
          </el-form-item>
        </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" >       
          <el-form-item label="邮件编码:" prop="encoding" >
            <el-input class="w192" v-model="info.encoding"></el-input>
            <span class="gray"> 一般使用UTF-8</span>
          </el-form-item>
        </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" >       
          <el-form-item label="邮件用户名:" prop="username" >
            <el-input class="w192" v-model="info.username"></el-input>
            <span class="gray">如：example@126.com</span>
          </el-form-item>
        </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" >       
          <el-form-item label="发件人:" prop="personal" >
            <el-input class="w192" v-model="info.personal"></el-input>
            <span class="gray"> 如：百年老店</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-col :xs="24" :sm="24" :md="24" :lg="12">
         <el-form-item label="邮件密码:" prop="password" >
            <el-input class="w192" v-model="info.password" type="password"></el-input>
            
          </el-form-item>
           </el-col>
        </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24">
         
         <el-form-item label="找回密码标题:" prop="resetPasswordSubject" >
                 <el-input class="w192" v-model="info.resetPasswordSubject"></el-input>
                  <span class="gray"> 支持的标签: uid username resetKey resetPwd</span>
          </el-form-item>
          
        </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="24">   
         <el-form-item label="找回密码内容:" prop="text" >
                    <VueUEditor @ready="editorReady" :index='0'></VueUEditor>
          </el-form-item>
          
        </el-col>
  <el-col :xs="24" :sm="24" :md="24" :lg="24">
        
         <el-form-item label="激活用户标题:" prop="activeTitle" >
                 <el-input class="w192" v-model="info.activeTitle"></el-input>
                  <span class="gray"> 支持的标签: uid username resetKey resetPwd</span>
          </el-form-item>
         
        </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24">
        
                <el-form-item label="激活用户内容:" prop="activeTxt" >
                         <VueUEditor @ready="editorReady" :index='1'></VueUEditor>
                </el-form-item>
         
             </el-col>
      </el-row>
    </el-form>
    <div class="form-bottom-bar">
      <el-button type="primary"  @click="updateForm()">修改</el-button>
      <el-button type="info" @click="restForm()">重置</el-button>
    </div>
  </div>
</template>

<script>
import VueUEditor from '@/components/UEditor';
import * as fetch from "@/api/set";

export default {
   components: {
      VueUEditor
      
      },
  data() {
    
    return {
      loading: true,
      info: {
          encoding:'',
          host:'',
          password:'',
          username:'',
          activeTitle:'',
          activeTxt:'',
          resetPasswordSubject:'',
          text:'',
      }, //列表
      UE:[],
      rules: {
        host:[ {required:true, message: '此项必填', trigger: 'blur'}],
         username:[ {required:true, message: '此项必填', trigger: 'blur'}],
          password:[ {required:true, message: '此项必填', trigger: 'blur'}],
           encoding:[ {required:true, message: '此项必填', trigger: 'blur'}],
            personal:[ {required:true, message: '此项必填', trigger: 'blur'}],
            
      }
    };
  },
  methods: {
       editorReady(editorInstance,index) {
        this.UE[index]=editorInstance;
         setTimeout(() => {
            this.UE[0].setContent(this.info.text);  
              this.UE[1].setContent(this.info.activeTxt);   
         }, 500);
      },
    getInfo() {
        fetch.getEmailInfo().then(res=>{
           
            this.info.encoding=res.body.emailSender[0].encoding;
             this.info.host=res.body.emailSender[0].host;
              this.info.password=res.body.emailSender[0].password;
               this.info.personal=res.body.emailSender[0].personal;
                this.info.username=res.body.emailSender[0].username;
                 this.info.activeTitle=res.body.messageMap[0].activeTitle;
                  this.info.activeTxt=res.body.messageMap[0].activeTxt;
                   this.info.resetPasswordSubject=res.body.messageMap[0].resetPasswordSubject;  
                    this.info.text=res.body.messageMap[0].text;
              setTimeout(() => {
                        this.UE[0].setContent(this.info.text);  
                         this.UE[1].setContent(this.info.activeTxt);   
                     }, 500);
        })
     this.loading=false; 
    },
    updateForm() {//增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
             this.info.text=this.UE[0].getContent();  
             this.info.activeTxt=this.UE[1].getContent();   
    
          fetch.updateEmailInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");   
            }
          }).catch(error=>{this.errorMessage("执行异常"); this.loading = false;});
        }
      });  
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      this.getInfo();
    }
  },
  created: function() {
    this.getInfo();
  }
};
</script>

<style>

</style>
