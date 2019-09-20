<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
     <span class="forum-name tab-name " @click="routerLink('/wechatset','list')" >公众号设置</span>
            <span class="forum-name tab-name "@click="routerLink('/wechatset/wechatmenu','list')" >自定义菜单</span>
            <span class="forum-name tab-name  "  @click="routerLink('/wechatset/wechatmessage','list')">自定义回复</span>
           <span class="forum-name tab-name active" @click="routerLink('/wechatset/wechatdefaultMessage','list')">默认回复</span>
            
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
         <el-col :xs="24" :sm="24" :md="24" :lg="24" >       
          <el-form-item label="消息类型:">
           <el-select class="w192" v-model="info.type">
             <el-option  :value="0" label="带图文链接消息"></el-option>
              <el-option  :value="1" label="内容加关键字提示消息"></el-option>
               <el-option  :value="2" label="仅有内容消息"></el-option>
           </el-select>
            
          </el-form-item>
         </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="标题:" prop="title" >
            <el-input class="w192" v-model="info.title"></el-input>
          </el-form-item>
         </el-col>
        
       <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.type==0">       
          <el-form-item label="链接地址:" prop="url" >
            <el-input class="w192" v-model="info.url"></el-input> 
          </el-form-item>
         </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24"   v-if="info.type==0">       
                <el-form-item label="图片:" prop="path" >
                  <imageUpload @getPath="getPath" :path="imagePath"></imageUpload>
                </el-form-item>
                </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" >       
          <el-form-item label="内容:" prop="content" >
            <el-input class="w192" v-model="info.content"  type="textarea"></el-input> 
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
      parentId:this.$route.query.parentId,
      rules: {
        number:[{required:true, message: '此项必填', trigger: 'blur'}],
          title:[{required:true, message: '此项必填', trigger: 'blur'}]
      }
    };
  },
  methods: {
     
    getInfo() {
      fetch.getDefaultWeiXinMessageInfo().then(res => {
        this.info = res.body;
        this.imagePath=this.info.path;
      });
      this.loading = false;
    },
     getPath(path) {
        this.info.path = path;
      },

saveForm(state) { //增加
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            fetch.addWeiXinMessageInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.imagePath='';
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/wechatset/wechatmessage', 'list');
                  }, 1000)
                }
              }
            })
          }
        });
      },
    updateForm() {
      //增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch
            .updateDefaultWeiXinMessageInfo(this.info)
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
