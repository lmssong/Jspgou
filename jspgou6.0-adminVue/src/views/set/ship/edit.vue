<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/shipList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="物流公司" prop="logisticsId">
              <el-select v-model="info.logisticsId" class="w192">
                        <el-option v-for="(item,index) in typeList" :key="index"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
              </el-select>
          
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="物流类型" prop="logisticsType">
            <el-select v-model="info.logisticsType"  class="w192">
                <el-option value="EXPRESS" label="快递"></el-option>
                  <el-option value="POST" label="">平邮</el-option>
                    <el-option value="EMS" label="">EMS</el-option>
            </el-select>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="计价方式" prop="method">
                <el-radio v-model="info.method" :label="1">统一价格</el-radio>
                  <el-radio  v-model="info.method" :label="2">按重量</el-radio>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.method==1">
          <el-form-item label="统一价格">
                <el-input class="w192" v-model="info.uniformPrice"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.method==2">
          <el-form-item label="按重量" >
                <label for="">首重量</label>
                 <el-inputclass="w50" type='number' min="0" v-model="info.firstWeight"></el-input>
                   <label for="">续重量</label>
                 <el-inputclass="w50" type='number' min="0" v-model="info.additionalWeight"></el-input>
                   <label for="">首重价</label>
                 <el-inputclass="w50" type='number' min="0" v-model="info.firstPrice"></el-input>
                   <label for="">续重价</label>
                 <el-inputclass="w50" type='number' min="0"  v-model="info.additionalPrice"></el-input>
          </el-form-item>   
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="排列顺序" prop="priority">
             <el-input class="w192" v-model.number="info.priority"></el-input>
          </el-form-item>
        </el-col>
       <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="是否启用" prop="disabled">
                <el-radio v-model="info.disabled" :label="false">是</el-radio>
                  <el-radio  v-model="info.disabled" :label="true">否</el-radio>
                  
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="是否默认" prop="isDefault">
               <el-radio v-model="info.isDefault" :label="true">是</el-radio>
                  <el-radio  v-model="info.isDefault" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="描述" prop="description">
              <el-input class="w192" v-model="info.description" type="textarea"></el-input>
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

export default {
  
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
        .getShipInfo({
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
 
    updateForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch.updateShipInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/shipList", "list");
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

          fetch.addShipInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("添加成功");
              if (state) {
                this.getInfo(this.id);
                 this.pathUrl='';
              } else {
                setTimeout(() => {
                  this.routerLink("/shipList", "list");
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
