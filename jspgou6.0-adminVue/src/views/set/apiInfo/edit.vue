<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/apiInfoList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="接口名称" prop="apiName">
            <el-input class="w192" v-model="info.apiName"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="接口URL" prop="apiUrl">
            <el-input class="w192" v-model="info.apiUrl"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="接口代码" prop="apiCode">
             <el-input class="w192" v-model.number="info.apiCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="每日限制调用次数" prop="limitCallDay">
             <el-input class="w192" v-model.number="info.limitCallDay"></el-input>
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="是否禁用" prop="disabled">
            <el-radio v-model="info.disabled" :label="true">是</el-radio>
             <el-radio v-model="info.disabled" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
  
    </el-form>
    <div class="form-bottom-bar">
      <el-button type="warning" v-if="type=='save'" @click="saveForm(true)">提交并继续添加</el-button>
      <el-button type="primary" v-if="type=='save'" @click="saveForm(false)">添加</el-button>
      <el-button type="primary" v-if="type=='update'" @click="updateForm()">修改</el-button>
      <el-button type="info" @click="restForm()">重置</el-button>
       <div class="help-info" v-if="type=='save'">选择“提交并继续添加”按钮会停留在添加页面；选择“添加”按钮后将跳转到对应的列表页。</div>
    </div>
  
  </div>
</template>

<script>
import * as fetch from "@/api/set";
import imageUpload from "@/components/uploadImage.vue";
export default {
   components: { imageUpload },
  data() {
    return {
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {}, //列表
      typeList: [],
      pathUrl: "",
      rules: {
        apiName: [{required: true, message: "请输入名称",trigger: "blur"}],
        apiUrl: [{required: true, message: "此项必填",trigger: "blur"}],
        apiCode: [{required: true,  message: "此项必填",trigger: "blur"}],
        limitCallDay:[{required: true,type:'number', message: "此项必填",trigger: "blur"}],
      }
    };
  },
  methods: {
    getInfo(id) {
      fetch
        .getApiInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
          if(this.type=='save'){
              
          }   
          this.loading = false;
        });
     
    },
  getPath(path){
        this.info.logoPath=path;
        this.pathUrl=path;
    },
    updateForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch.updateApiInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/apiInfoList", "list");
              }, 1000);
            }
          });
        }
      });
    },
    saveForm(state) {
      //增加

      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;

          fetch.addApiInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("添加成功");
              if (state) {
                this.getInfo(this.id);
                 this.pathUrl='';
              } else {
                setTimeout(() => {
                  this.routerLink("/apiInfoList", "list");
                }, 1000);
              }
            }
          });
        }
      });
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      this.getInfo(this.id);
      this.pathUrl='';
    }
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
