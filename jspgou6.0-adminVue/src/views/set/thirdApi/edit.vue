<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
          <!-- qq -->
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="QQ登陆:"  >
                <el-radio v-model="info.qqEnable" :label="true">是</el-radio>
                <el-radio v-model="info.qqEnable" :label="false">否</el-radio>
                <span class="gray">(为了安全起见，填写完成提交后，密钥不可见)</span>
            </el-form-item>
        </el-col>   
        
        <el-col :xs="24" :sm="24" :md="24" :lg="12"  v-if="info.qqEnable">       
          <el-form-item label="APP ID:" prop="name" >
            <el-input class="w192" v-model="info.qqID"></el-input>
          </el-form-item>
         </el-col>
   <el-col :xs="24" :sm="24" :md="24" :lg="12"  v-if="info.qqEnable">       
          <el-form-item label="APP KEY:" prop="name" >
            <el-input class="w192" v-model="info.qqKey"></el-input>
          </el-form-item>
         </el-col>

          <!-- 微博-->
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="新浪微博登陆:"  >
                <el-radio v-model="info.sinaEnable" :label="true">是</el-radio>
                <el-radio v-model="info.sinaEnable" :label="false">否</el-radio>
                <span class="gray">(为了安全起见，填写完成提交后，密钥不可见)</span>
            </el-form-item>
        </el-col>   
        <el-col :xs="24" :sm="24" :md="24" :lg="12" v-if="info.sinaEnable">       
          <el-form-item label="App Key:"  >
            <el-input class="w192" v-model="info.sinaID"></el-input>
          </el-form-item>
         </el-col>
   <el-col :xs="24" :sm="24" :md="24" :lg="12"  v-if="info.sinaEnable">       
          <el-form-item label="App Secret:" prop="name" >
            <el-input class="w192" v-model="info.sinaKey"></el-input>
          </el-form-item>
         </el-col>
  <!-- 微信-->
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="微信登录:" prop="relativePath" >
                <el-radio v-model="info.weixinEnable" :label="true">是</el-radio>
                <el-radio v-model="info.weixinEnable" :label="false">否</el-radio>
                <span class="gray">(为了安全起见，填写完成提交后，密钥不可见)</span>
            </el-form-item>
        </el-col>   
        <el-col :xs="24" :sm="24" :md="24" :lg="12"  v-if="info.weixinEnable">       
          <el-form-item label="App Key:" prop="name" >
            <el-input class="w192" v-model="info.weixinID"></el-input>
          </el-form-item>
         </el-col>
   <el-col :xs="24" :sm="24" :md="24" :lg="12"  v-if="info.weixinEnable">       
          <el-form-item label="App Secret:" prop="name" >
            <el-input class="w192" v-model="info.weixinKey"></el-input>
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
       
      }
    };
  },
  methods: {
    getInfo() {
      fetch.getThirdApiInfo().then(res => {
        this.info = res.body[0];
      });
      this.loading = false;
    },
    updateForm() {
      //增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch
            .updateThirdApiInfo(this.info)
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
