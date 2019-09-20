<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/logistics','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="公司名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="官网网址" prop="webUrl">
            <el-input class="w192" v-model="info.webUrl"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="排列顺序" prop="priority">
             <el-input class="w192" v-model.number="info.priority"></el-input>
          </el-form-item>
        </el-col>
       
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="logo图" prop="description">
              <imageUpload  @getPath="getPath" :path="info.logoPath"></imageUpload>
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
        name: [{required: true, message: "请输入名称",trigger: "blur"}],
        logisticsType: [{required: true, message: "此项必填",trigger: "change"}],
        logisticsId: [{required: true, type:'number', message: "此项必填",trigger: "change"}],
        priority:[{required: true,type:'number', message: "请输入数字排序",trigger: "blur"}],
      }
    };
  },
  methods: {
    getInfo(id) {
      fetch
        .getLogisticsInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
          if(this.type=='save'){
              
          }
           
          this.loading = false;
        });
      fetch.getLogisticsList().then(res => {
        this.typeList = res.body;
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
          fetch.updateLogisticsInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/logistics", "list");
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

          fetch.addLogisticsInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("添加成功");
              if (state) {
                this.getInfo(this.id);
                 this.pathUrl='';
              } else {
                setTimeout(() => {
                  this.routerLink("/logistics", "list");
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
