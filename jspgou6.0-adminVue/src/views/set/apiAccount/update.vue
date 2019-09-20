<template>
  <div class="forum-module" >
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/webapiaccountlist','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="params" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" >
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input class="w192" v-model="params.oldPwd" type="password"></el-input>
          
          </el-form-item>   
        </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" >
          <el-form-item label="新密码" prop="newPwd">
            <el-input class="w192" v-model="params.newPwd" type="password"></el-input>
            
          </el-form-item>   
        </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="再次输入新密码" prop="newPwd2">
            <el-input class="w192" v-model="params.newPwd2" type="password"></el-input>
          
            
          </el-form-item>   
        </el-col>
        

      </el-row>
  
    </el-form>
    <div class="form-bottom-bar">
     
      <el-button type="primary"  @click="updateApiPwd('form')">修改</el-button>
      <el-button type="ModelInfo" @click="restForm()"  >重置</el-button>
    </div>
  
  </div>
</template>

<script>
import * as fetch from "@/api/set";
import {Encrypt}  from "@/untils/aes";
export default {
   
  data() {
       var validatePwd = (rule, value, callback) => {              
            if (value === '') {
                callback(new Error('请输入独立密码'));
                this.valueType='password'
            }  else {
                   let pwd=Encrypt(value,this.$store.state.sys.aesKey,this.$store.state.sys.ivKey);
                 fetch.checkApiPassword({oldPassword:pwd})
                 .then(res=>{
                     if(res.code=='200'){
                        callback();
                       this.show=true;
                     }else{
                         this.show=false;
                         callback(new Error('密码不正确'));}}
                 )  
            }
        };
              var validatePass = (rule, value, callback) => {
            if (value === '') {
               callback(new Error('请输入新密码'));
            } else {
                // if (this.params.newPwd !== '') {
                //     this.$refs.topicInfo.validateField('newPwd');
                // }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
             callback(new Error('请再次输入密码'));
            } else if (value !== this.params.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };    
    return {
       params:{
                    oldPwd:'',
                   newPwd:'',
                   newPwd2:''
            },
            rules: {
                    oldPwd:[{validator:validatePwd,trigger:'blur'}],
                     newPwd:[{validator:validatePass,trigger:'blur'}],
                      newPwd2:[{validator:validatePass2,trigger:'blur'}]
            },
    };
  },
    methods: {
        updateApiPwd(formName) {//添加账户
            this.$refs[formName].validate((valid) => {
                if (valid) {
                         this.params.oldPassword= Encrypt(this.params.oldPwd, this.$store.state.sys.aesKey, this.$store.state.sys.ivKey);
                     this.params.password= Encrypt(this.params.newPwd, this.$store.state.sys.aesKey, this.$store.state.sys.ivKey);
                    
                    fetch.updateApiPassword(this.params)
                        .then(res => {
                            //console.log(res);
                            if (res.code == '200') {
                                this.$message.success('修改成功');
                                setTimeout(() => {
                                    this.$router.push({ path: '/webapiaccountlist' })
                                }, 1000);
                            }
                        })
                        .catch(res => {
                            this.$message.error('添加异常');
                        })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {//重置表单
            this.$refs[formName].resetFields();
        }
    }
 
};
</script>

<style>

</style>
