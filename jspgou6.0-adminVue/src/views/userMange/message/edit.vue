<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/messageList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" >
            <el-col :xs="24" :sm="24" :md="12" :lg="12" class="border-none"></el-col>
          <el-form-item label="收件人" prop="username" >
            <el-input class="w192" v-model="info.username"></el-input>
          </el-form-item>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" class="border-none"></el-col>
          <el-form-item label="会员组" prop="groupId" >
           <el-select v-model="info.groupId">
               <el-option v-for="(item,index) in typeList" :key="index"
               :label="item.name"
                :value="item.id"
               ></el-option>
           </el-select>
          </el-form-item>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24"> 
          <el-form-item label="标题" prop="msgTitle" >
            <el-input class="w192" v-model="info.msgTitle"></el-input>
          </el-form-item>
        </el-col>   
        <el-col :xs="24" :sm="24" :md="24" :lg="24" >    
          <el-form-item label="内容" prop="msgContent">
            <el-input class="w192" v-model="info.msgContent" type="textarea"></el-input>
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
import * as fetch from "@/api/dict";
import * as user from "@/api/user";
import * as userMange from "@/api/userMange";
export default {
  
  data() {
      var validateName = (rule, value, callback) => {              
            if (value === '') {
                 callback();   
            }else{
                user.getUser({username:value}).then(res=>{
                    if(res.code!=200){
                        callback(new Error('用户名不存在或无效'));
                    }else{
                      callback();      
                    }
                     
                })
            }
        };
    return {
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {
          username:'',
          groupId:'',
          msgTitle:'',
          msgContent:''
      }, //列表
      typeList: [],
      pathUrl: "",
      rules: {
        username: [
          {
            validator:validateName, trigger: 'blur'
          }
        ],
        msgTitle:[ {
            required:true, message: '此项必填', trigger: 'blur'
          }],
          msgContent:[{
            required:true, message: '此项必填', trigger: 'blur'
          }]
      }
    };
  },
  methods: {
    getInfo(id) {
        userMange.getRankList().then(res=>{
            this.typeList=res.body;
        })
     this.loading=false;
     
    },
    saveForm(state) {   
        if(this.info.username===''&&this.info.groupId===''){
                this.errorMessage('用户名和会员组必须填写一项');
        }else{
             //增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch.addMessageInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("发送成功");
              if (state) {
                 
                  this.info.username='';
                  this.info.groupId='';
                  this.info.msgTitle='';
                  this.info.msgContent='';
                  
              } else {
                setTimeout(() => {
                  this.routerLink("/messageList", "list");
                }, 1000);
              }
            }
          });
        }
      });
        }     
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      
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
