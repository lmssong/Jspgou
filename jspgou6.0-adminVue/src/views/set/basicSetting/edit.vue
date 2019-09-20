<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
              
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" >     
               <el-col :xs="24" :sm="24" :md="12" :lg="12" >     
          <el-form-item label="网站名称" prop="name" >
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
        </el-col>
         </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
             <el-col :xs="24" :sm="24" :md="12" :lg="12" >     
         <el-form-item label="网站域名" prop="domain" >
             
            <el-input class="w192" v-model="info.domain"></el-input>
          </el-form-item>
        </el-col>
    </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" >    
         <el-form-item label="根域名" prop="baseDomain" >
            <el-input class="w192" v-model="info.baseDomain"></el-input>
             <span class="gray">如域名为www.jeecms.com,则填写.jeecms.com</span>
          </el-form-item>
        </el-col> 
 </el-col> 
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
         <el-form-item label="使用相对路径" prop="relativePath" >
               <el-radio v-model="info.relativePath" :label="true">是</el-radio>
              <el-radio v-model="info.relativePath" :label="false">否</el-radio>
             <span class="gray">有多个站点或开启远程附件时，不能使用相对路径</span>
          </el-form-item>
        </el-col> 
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" >    
         <el-form-item label="访问后缀" prop="suffix" >
             <el-select v-model="info.suffix" class="w192">
                 <el-option value=".htm"></el-option>
                  <el-option value=".jhtml"></el-option>
             </el-select>
                
          </el-form-item>
           </el-col> 
        </el-col>       
 <el-col :xs="24" :sm="24" :md="24" :lg="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" >   
         <el-form-item label="前台本地化" prop="localeFront" >
            <el-input class="w192" v-model="info.localeFront"></el-input>            
          </el-form-item>
        </el-col>  
          </el-col>  
 <el-col :xs="24" :sm="24" :md="24" :lg="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" >   
         <el-form-item label="后台本地化" prop="localeAdmin" >
            <el-input class="w192" v-model="info.localeAdmin"></el-input>            
          </el-form-item>
        </el-col>  
         </el-col>  
 <el-col :xs="24" :sm="24" :md="24" :lg="24">
         <el-form-item label="静态页自动同步FTP" prop="pageSync" >
             <el-radio v-model="info.pageSync" :label="true">是</el-radio>
              <el-radio v-model="info.pageSync" :label="false">否</el-radio>
                      
          </el-form-item>
        </el-col> 
 <el-col :xs="24" :sm="24" :md="24" :lg="24">
         <el-form-item label="资源自动同步FTP" prop="resouceSync" >
            <el-radio v-model="info.resouceSync" :label="true">是</el-radio>
              <el-radio v-model="info.resouceSync" :label="false">否</el-radio>            
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
import VueUEditor from "@/components/UEditor";
import * as fetch from "@/api/set";

export default {
  components: {
    VueUEditor
  },
  data() {
    return {
      loading: true,
      info: {}, //列表
      UE: "",

      rules: {
        name: [{required: true,message: "此项必填",trigger: "blur"}],
         domain: [{required: true,message: "此项必填",trigger: "blur"}],
         
           suffix: [{required: true,message: "此项必填",trigger: "blur"}],
            localeFront: [{required: true,message: "此项必填",trigger: "blur"}],
             localeAdmin: [{required: true,message: "此项必填",trigger: "blur"}],
             

      }
    };
  },
  methods: {
    getInfo() {
      fetch.getBasicInfo().then(res => {
        this.info = res.body;
      });
      this.loading = false;
    },
    updateForm() {
      //增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch
            .updateBasicInfo(this.info)
            .then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage("修改成功");
              }
            })
            .catch(error => {
              this.errorMessage("执行异常");
              this.loading = false;
            });
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
