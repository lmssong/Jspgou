<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
            <span class="forum-name tab-name active" @click="routerLink('/wechatset','list')" >公众号设置</span>
            <span class="forum-name tab-name  "@click="routerLink('/wechatset/wechatmenu','list')" >自定义菜单</span>
            <span class="forum-name tab-name"  @click="routerLink('/wechatset/wechatmessage','list')">自定义回复</span>
             <span class="forum-name tab-name" @click="routerLink('/wechatset/wechatdefaultMessage','list')">默认回复</span>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">

        <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="App Key:" prop="appKey" >
            <el-input class="w192" v-model="info.appKey"></el-input>
          </el-form-item>
         </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="App Secret:" prop="appSecret" >
            <el-input class="w192" v-model="info.appSecret"></el-input>
          </el-form-item>
         </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="App Token:" prop="token" >
            <el-input class="w192" v-model="info.token"></el-input>
          </el-form-item>
         </el-col>
<el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="关注欢迎语" prop="welcome" >
            <el-input class="w192" v-model="info.welcome" type="textarea"></el-input>
          </el-form-item>
         </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="微信二维码"  >
               <imageUpload @getPath="getPath" :path="imagePath"></imageUpload>
          </el-form-item>
         </el-col>
        <!--支付异常-->  
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
import imageUpload from '@/components/uploadImage.vue'
import * as fetch from "@/api/set";

export default {
  components: {
   imageUpload
  },
  data() {
    return {
      loading: true,
      info: {}, //列表
      UE: "",
       imagePath: '',
      type: this.$route.query.type,
      id: this.$route.query.id,
      rules: {
       
      }
    };
  },
  methods: {
     
    getInfo() {
      fetch.getWeiXinSetInfo().then(res => {
        this.info = res.body;
          this.imagePath = res.body.pic;
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
            .updateWeiXinSetInfo(this.info)
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
