<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/dictList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" class="border-none"></el-col>
          <el-form-item label="字典名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
          </el-col>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="字典类型" prop="adspaceId">
              <el-select v-model="info.typeId" class="w192">
                  <el-option v-for="(item,index) in typeList" :key="index"
                    :label="item.name"
                    :value="item.id"
                  
                  ></el-option>
              </el-select>
          </el-form-item>
        </el-col>
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
import * as fetch from "@/api/dict";

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
        name: [
          {
            required: true,
            message: "请输入版位名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getInfo(id) {
      fetch
        .getDictInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
    
          this.loading = false;
        });
      fetch.getDictTypeAll().then(res => {
        this.typeList = res.body;
      });
    },
 
    updateForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch.updateDictInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/dictList", "list");
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

          fetch.addDictInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("添加成功");
              if (state) {
                this.getInfo(this.id);
                 this.pathUrl='';
              } else {
                setTimeout(() => {
                  this.routerLink("/dictList", "list");
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
