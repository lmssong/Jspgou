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
           <el-col :xs="24" :sm="24" :md="24" :lg="24"> 
          <el-form-item label="标题"  >
               <span>{{info.msgTitle}}</span>
          </el-form-item>
        </el-col> 

        <el-col :xs="24" :sm="24" :md="24" :lg="24"> 
      <el-form-item label="收件人" >
               <span>{{info.receiverUserName}}</span>
          </el-form-item>
        </el-col> 
       
        <el-col :xs="24" :sm="24" :md="24" :lg="24"> 
                <el-form-item label="发送时间" >
                        <span>{{info.sendTime}}</span>
                    </el-form-item>
        </el-col> 
          <el-col :xs="24" :sm="24" :md="24" :lg="24"> 
                <el-form-item label="内容"  >
                        <span>{{info.msgContent}}</span>
                    </el-form-item>
        </el-col> 
      </el-row>
  
    </el-form>
   
  
  </div>
</template>

<script>
import * as fetch from "@/api/dict";
import * as user from "@/api/user";
import * as userMange from "@/api/userMange";
export default {
  data() {
    return {
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {
         
      }, //列表
      typeList: [],
      pathUrl: "",
      rules: {
      }
    };
  },
  methods: {
    getInfo(id) {
        fetch.getMessageInfo({id:id}).then(res=>{
            this.info=res.body;
        })
     this.loading=false;
     
    }
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
