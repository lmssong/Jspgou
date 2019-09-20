<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/brandList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="品牌名称" prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="品牌类型" :required="true">
            <el-select filterable placeholder="请选择" v-model="info.categoryId" class="w192">
              <el-option label="根目录" :value='0'></el-option>
              <el-option v-for="item in categoryIdList" :key="item.id" :label="item.categoryName" :value="item.id">
                <span :style="{paddingLeft:item.leval*10+'px'}" v-if="item.leval>1">>{{item.categoryName}}</span>
                <span :style="{paddingLeft:item.leval*10+'px'}" v-else>{{item.categoryName}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="品牌简称">
            <el-input class="w192" v-model="info.alias"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="官方网址">
            <el-input class="w192" v-model="info.webUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="精选品牌">
            <el-radio v-model="info.sift" :label="true">是</el-radio>
            <el-radio v-model="info.sift" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <el-form-item label="是否禁用">
            <el-radio v-model="info.disabled" :label="true">是</el-radio>
            <el-radio v-model="info.disabled" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
  
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="品牌图片" prop="username">
            <!-- 图片上传 -->
            <imageUpload @getPath="getPath" :path="imagePath"></imageUpload>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-col class="border-none" :span="12">
            <el-form-item label="排序" prop="priority">
              <el-input class="w192" v-model.number="info.priority"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="品牌故事">
            <VueUEditor @ready="editorReady" ></VueUEditor>
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
  import VueUEditor from '@/components/UEditor';
  import imageUpload from '@/components/uploadImage.vue'
  import * as fetch from "@/api/commodity";
  export default {
    components: {
      VueUEditor,
      imageUpload
    },
    data() {
      return {
        loading: true,
        type: this.$route.query.type,
        id: this.$route.query.id,
        info: {}, //列表
        categoryIdList: [],
        UE:'',
        imagePath: '',
        rules: {
          name: [{
            required: true,
            message: "请输入分类名",
            trigger: "blur"
          }],
          path: [{
            required: true,
            message: "请输入路径",
            trigger: "blur"
          }],
          priority: [{
            required: true,
            message: "请输入排序",
            type: 'number',
            trigger: "blur"
          }],
        }
      }
    },
    methods: {
      getInfo(id) {
        fetch.getBrandInfo({
          id: id
        }).then(res => {
          this.info = res.body;
          
           this.loading = false;
          this.imagePath = res.body.logoPath;
           this.UE.setContent(this.info.text); 
          fetch.getBrandTypeInfo().then(res1 => {
            this.categoryIdList = res1.body;
          })
        })
      },
      updateForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.info.text=this.UE.getContent();
            fetch.updateBrandInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('修改成功');
                setTimeout(() => {
                  this.routerLink('/brandList', 'list');
                }, 1000)
  
              }
            })
          }
        });
      },
      saveForm(state) { //增加
       

        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.info.text=this.UE.getContent();
            fetch.addBrandInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.imagePath='';
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/brandList', 'list');
                  }, 1000)
                }
              }
            })
          }
        });
      },
      restForm() { //重置
        this.$refs['form'].resetFields();
        this.getInfo(0);
      },
      getPath(path) {
        this.info.logoPath = path;
  
      },
      editorReady(editorInstance) {
        this.UE=editorInstance;
        // this.UE.setContent(this.info.text);
      }
    },
    created: function() {
      this.getInfo(this.id);
    }
  
  }
</script>

<style>
  
</style>
