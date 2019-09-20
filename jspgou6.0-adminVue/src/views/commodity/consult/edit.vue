<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
           <span class="forum-name">{{$route.name}}</span>
             <div class="pull-right">
                <el-button class="back" @click="routerLink('/consultList','list',0);">返回列表</el-button>
            </div>  
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="商品名称:">
           {{info.productName}}
          </el-form-item>
         </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="咨询内容:" prop="consult" >
            <el-input class="w192" v-model="info.consult" type="textarea"></el-input>
          </el-form-item>
         </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="回复咨询:" prop="adminReplay" >
            <el-input class="w192" v-model="info.adminReplay" type="textarea"></el-input>
          </el-form-item>
         </el-col>

      </el-row>
    </el-form>
    <div class="form-bottom-bar">
      <el-button type="primary"  @click="updateForm()">回复</el-button>
      <el-button type="info" @click="restForm()">重置</el-button>
    </div>
  </div>
</template>

<script>

import * as fetch from "@/api/commodity";

export default {
 
  data() {
    return {
      loading: true,
      info: {}, //列表
     
       imagePath: '',
      type: this.$route.query.type,
      id: this.$route.query.id,
      rules: {
       
      }
    };
  },
  methods: {
     
    getInfo(id) {
      fetch.getConsultInfo({id:id}).then(res => {
        this.info = res.body;
          
      });
      this.loading = false;
    },
     getPath(path) {
        this.info.pic = path;
      },
    updateForm() {
      //增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch
            .updateConsultInfo(this.info)
            .then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage("回复成功");
                setTimeout(() => {
                    this.routerLink('/consultList','list',0);
                }, 1000);
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
      this.getInfo(this.id);
    }
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
