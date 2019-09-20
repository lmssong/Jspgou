<template>
  <div class="forum-module" v-loading='loading'>
        <div class="forum-header">
          <span class="forum-name">{{$route.name}}</span>
        </div>
            <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
              <el-row class="form-group">
                   <el-col :xs="24"  :sm="24" :md="12" :lg="12" >
                      <el-form-item label="用户名">
                        <span>{{info.username}}</span>
                     
                      </el-form-item>
                  </el-col>
                   <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="邮箱" prop="email" >
                        <el-input class="w192" v-model="info.email"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="密码"  prop="password"  >
                        <el-input class="w192" v-model="info.password" type="password"></el-input>
                        <label  class="gray">不修改请留空</label>
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="确认密码"  prop="checkPass">
                        <el-input class="w192" v-model="info.checkPass" type="password"></el-input>
                        <label  class="gray">不修改请留空</label>
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="是否禁用">
                        <el-switch active-text="是" inactive-text="否" v-model="info.disabled">
                        </el-switch>
                      </el-form-item>
                  </el-col>
                   <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="只读管理员" :required="true">
                       <el-switch active-text="是" inactive-text="否" v-model="info.viewonlyAdmin"> 
                        </el-switch>
                      </el-form-item>
                  </el-col>
                   <el-col :xs="24" :sm="24" :md="24" :lg="24" >
                      <el-form-item label="角色">
                          <el-checkbox-group v-model="selectRole">
                               <el-checkbox 
                               v-for="(item,index) in roleItems" :key="item.id"
                               :label="item.id" >
                               {{item.name}}
                                 </el-checkbox>                     
                          </el-checkbox-group>
                      </el-form-item>
                  </el-col>       
              </el-row>               
            </el-form>
           <div class="form-bottom-bar">            
              <el-button type="primary" v-if="type=='update'" @click="updateForm()">提交</el-button>
              <el-button type="info" @click="restForm()">重置</el-button>
             </div>   
            
    </div>
</template>

<script>
import axios from "axios";
import * as fetch from "@/api/operation";
import * as untils from "@/untils/global";
export default {
  data() {
    /**验证邮箱 */
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的邮箱地址"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
            if (value === '') {
               callback();
            } else {
                if (this.info.checkPass !== '') {
                    this.$refs.form.validateField('checkPass');
                }
                callback();
               
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
             callback();
            } else if (value !== this.info.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
               
            }
        };
    return {
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {}, //列表
      roleItems: [],
      selectRole: [],
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" },
                { required: true, message: "请输入邮箱地址", trigger: "blur" }
                ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur"}]
      }
    };
  },
  methods: {
    getInfo(id) {
      //有多个请求合并在一起发送统一处理
      axios.all([fetch.getAdminInfo({ id: id }), fetch.getRoleList()]).then(
        axios.spread((res, role) => {
          this.info = res.body;
          this.info.password='';//密码处理
          this.info.checkPass='';//密码处理
          this.selectRole = untils.strToNumberArr(res.body.roleIds);//字符串转数组
          this.roleItems = role.body;
          this.loading = false;
        })
      );
    },
    updateForm(state) {//增加
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading=true;
             this.aesPwd();//密码加密
            fetch.updateAdminInfo(this.info).then(res=>{
              this.loading=false;
              if(res.code==200){
                this.successMessage('修改成功');
                      setTimeout(()=>{
                        this.routerLink('/admin','list');
                      },1000)                                   
              }else{
                 this.info.password='';
                 this.info.checkPass='';
              }
            })
          } 
        });
    },
    restForm() {//重置
         this.$refs['form'].resetFields();
         this.getInfo(this.id);
    },
    aesPwd(){
      this.info.password=untils.aesPassword(this.info.password);
       this.info.checkPass=untils.aesPassword(this.info.checkPass);
    }
  },
  watch: {
    selectRole(newVal, oldVal) {
      let str = newVal.join(",");
      this.info.roleIds = str;
    } 
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
