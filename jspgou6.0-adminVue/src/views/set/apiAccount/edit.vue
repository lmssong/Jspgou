<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/webapiaccountlist','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="params" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="type=='update'">
          <el-form-item label="独立密码" prop="apiPwd">
            <el-input class="w192" v-model="params.apiPwd" type="password"></el-input>
            <el-button @click="showpwd" v-if="type=='update'">查看</el-button>
            <span class="gray" v-if="type=='update'">输入密码后查看信息</span>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="appid" prop="acount">
            <el-input class="w192" v-model="params.acount"  
            :disabled="true"
           :type='valueType'
                           ></el-input>
            <el-button @click="creatAppId" v-if="type=='save'">生成</el-button>               
          </el-form-item>   
        </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="appKey" prop="appKey">
            <el-input class="w192" v-model="params.appKey" 
             :disabled="true"
            :type='valueType'
            ></el-input>
             <el-button @click="creatAppKey" v-if="type=='save'">生成</el-button>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="aesKey" prop="aesKey">
            <el-input class="w192" v-model="params.aesKey"
             :disabled="true"
            :type='valueType'
            ></el-input>
             <el-button @click="creatAesKey" v-if="type=='save'">生成</el-button>
          </el-form-item>   
        </el-col>
       <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="ivKey" prop="ivKey">
            <el-input class="w192" v-model="params.ivKey"
             :disabled="true"
            :type='valueType'
            ></el-input>
              <el-button @click="creatIvKey" v-if="type=='save'">生成</el-button>
          </el-form-item>   
        </el-col>

         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="type=='save'">
          <el-form-item label="是否禁用" prop="disabled">
           <el-radio v-model="params.disabled" :label="true">是</el-radio>
             <el-radio v-model="params.disabled" :label="false">否</el-radio>
          </el-form-item>   
        </el-col>
      </el-row>
  
    </el-form>
    <div class="form-bottom-bar">
     
      <el-button type="primary" v-if="type=='save'" @click="addApiAccountInfo">添加</el-button>
      <el-button type="ModelInfo" @click="restForm()"  v-if="type=='save'">重置</el-button>
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
    return {
       loading: true,
            count: 0,
            state: false,
            show:false,
            type:this.$route.query.type,
            id:this.$route.query.id,
            ModelInfo: {},
            valueType:'password',
            params:{
                    apiPwd:'',
                    acount:'',
                    appKey:'',
                    aesKey:'',
                    ivKey:''
            },
            paramNames: [],
            defaultValues: [],
            rules: {
                    apiPwd:[{validator:validatePwd,trigger:'blur'}]
            },
    };
  },
  methods: {
        getApiAccountInfo(id) {//获取分类模型信息
            fetch.getApiAccountInfo({ id: id })
                .then(res => {
                    if (res.code == '200') {
                      let type = this.$route.query.type;
                        this.loading = false;
                        this.ModelInfo = res.body;
                         this.params.apiPwd='';
                        this.params=res.body;
                                                     
                    } else {
                        this.loading = false;                      
                    }
                })
                .catch(res => {
                    this.loading = false;
                })
        },
        showpwd(){
           if(this.show){
                  this.valueType='text'
           }else{
                this.valueType='password' 
           }  
        },
        creatAppId(){
            this.params.acount=this.randomWord(false,true,16);  
        },
         creatAppKey(){
            this.params.appKey=this.randomWord(false,false,32);  
        },
         creatAesKey(){
            this.params.aesKey=this.randomWord(false,false,16);  
        },
         creatIvKey(){
            this.params.ivKey=this.randomWord(false,false,16);  
        },
         randomWord(randomFlag,numFlag,min,max) {
            var str = "",
                range = min,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

            // 随机产生
            if (randomFlag) {
                range = Math.round(Math.random() * (max - min)) + min;
            }
            //纯数字组合
            if (numFlag) {
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            }
            for (var i = 0; i < range; i++) {
                let pos = Math.round(Math.random() * (arr.length - 1));
                str += arr[pos];
            }
            return str;
        },
        addApiAccountInfo() {//添加账户
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let params = this.ModelInfo;
                        //   params.apiPwd= Encrypt(this.params.apiPwd, this.$store.state.aesKey, this.$store.state.ivKey);
                          params.acount=this.params.acount;
                             params.appKey=this.params.appKey;
                               params.aesKey=this.params.aesKey;
                                 params.ivKey=this.params.ivKey;
                    fetch.addApiAccountInfo(params)
                        .then(res => {
                            //console.log(res);
                            if (res.code == '200') {
                                this.$message.success('添加成功');
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
        back() {
            this.$router.push({
                path: '/webapiaccountlist',
                query: {
                    noceStr: Math.round(Math.random() * 10)
                }
            })
        },
        resetForm(formName) {//重置表单
            let id = this.$route.query.id;
            this.$refs[formName].resetFields();
        }
    },
  created: function() {
     if (this.type == 'save') {
            this.valueType='text';
            this.getApiAccountInfo(this.id);
        } else if (this.type == 'update') {
           this.valueType='password';
            this.getApiAccountInfo(this.id);
        };
  }
};
</script>

<style>

</style>
