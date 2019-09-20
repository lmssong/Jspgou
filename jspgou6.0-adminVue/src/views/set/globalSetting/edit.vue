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
          <el-form-item label="部署路径" prop="contextPath" >
            <el-input class="w192" v-model="info.contextPath"></el-input>
            <span class="gray"> 如部署在根目录下，请留空</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
         <el-form-item label="端口" prop="port" >
            <el-input class="w192" v-model="info.port"></el-input>
             <span class="gray"> 可以留空，默认端口为80</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24"> 
          <el-form-item label="激活积分" prop="activeScore" >
            <el-input class="w192" v-model="info.activeScore"></el-input>
             <span class="gray">激活用户，送积分</span>
          </el-form-item>
        </el-col>   
        <el-col :xs="24" :sm="24" :md="24" :lg="24" >    
          <el-form-item label="库存预警值" prop="stockWarning">
            <el-input class="w192" v-model.number="info.stockWarning" ></el-input>
            <span class="gray"></span>
          </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" >    
          <el-form-item label="默认图片" prop="defImg">
            <el-input class="w192" v-model.number="info.defImg" ></el-input>
             <span class="gray">图片不存在时显示</span>
          </el-form-item>
        </el-col> 
         <el-col :xs="24" :sm="24" :md="24" :lg="24" >    
          <el-form-item label="用户协议" prop="treaty">
                <VueUEditor @ready="editorReady" ></VueUEditor>
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
      info: {}, //列表
      UE:'',
     
      rules: {
        defImg:[ {
            required:true, message: '此项必填', trigger: 'blur'
          }],

      }
    };
  },
  methods: {
       editorReady(editorInstance) {
        this.UE=editorInstance;
         setTimeout(() => {
            this.UE.setContent(this.info.treaty);     
         }, 500);
      },
    getInfo() {
        fetch.getGlobalInfo().then(res=>{
            this.info=res.body;
             ;
              setTimeout(() => {
                         this.UE.setContent(this.info.treaty);     
                     }, 500);
        })
     this.loading=false; 
    },
    updateForm() {//增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
             this.info.treaty=this.UE.getContent(); 
          fetch.updateGlobalInfo(this.info).then(res => {
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
