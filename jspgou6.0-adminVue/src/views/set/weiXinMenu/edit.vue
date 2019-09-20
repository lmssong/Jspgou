<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
     <span class="forum-name tab-name " @click="routerLink('/wechatset','list')" >公众号设置</span>
            <span class="forum-name tab-name active" @click="routerLink('/wechatset/wechatmenu','list')" >自定义菜单</span>
            <span class="forum-name tab-name" >自定义回复</span>
           <span class="forum-name tab-name" @click="routerLink('/wechatset/wechatdefaultMessage','list')">默认回复</span>
             <div class="pull-right">
                <el-button class="back" @click="routerLink('/wechatset/wechatmenu','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">

        <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="菜单名称:" prop="name" >
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
         </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="菜单类型:" prop="type" >
            <el-radio v-model="info.type" label="key">点击事件</el-radio>
            <el-radio v-model="info.type" label="link">url地址</el-radio>
          </el-form-item>
         </el-col>

         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="this.info.type=='key'">       
          <el-form-item label="key:" prop="key" >
            <el-input class="w192" v-model="info.key"></el-input>
             <span class="gray">点击事件KEY(自定义回复关键字)</span>   
          </el-form-item>
         </el-col>

       <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="this.info.type=='link'">       
          <el-form-item label="链接地址:" prop="url" >
            <el-input class="w192" v-model="info.url"></el-input>
            
          </el-form-item>
         </el-col>
        <!--支付异常-->  
      </el-row>
    </el-form>
    <div class="form-bottom-bar">
         <el-button type="warning" v-if="type=='save'" @click="saveForm(true)">提交并继续添加</el-button>
      <el-button type="primary" v-if="type=='save'" @click="saveForm(false)">添加</el-button>
      <el-button type="primary" v-if="type=='update'" @click="updateForm()">修改</el-button>
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
      parentId:this.$route.query.parentId,
      rules: {
        name:[{required:true, message: '此项必填', trigger: 'blur'}]
      }
    };
  },
  methods: {
     
    getInfo(id) {
      fetch.getWeiXinMenuInfo({id:id}).then(res => {
        this.info = res.body;
     if(this.type=='save'){
         this.info.type='key';
     }  
      });
      this.loading = false;
    },
     getPath(path) {
        this.info.pic = path;
      },

saveForm(state) { //增加
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.info.parentId=this.parentId;
            fetch.addWeiXinMenuInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.imagePath='';
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/wechatset/wechatmenu', 'list');
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
            .updateWeiXinMenuInfo(this.info)
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
