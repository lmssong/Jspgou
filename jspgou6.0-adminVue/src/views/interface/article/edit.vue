<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/articleList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="栏目" prop="channelId">
            <el-select filterable placeholder="请选择" v-model="info.channelId" class="w192">
                            <el-option label="顶级分类" :value="0"></el-option>
                            <el-option v-for="item in topList"
                             :key="item.id" 
                              :label="item.name"
                                 :value="item.id">
                                <span :style="{paddingLeft:item.leval*10+'px'}" v-if="item.leval>1">>{{item.name}}</span>
                                 <span :style="{paddingLeft:item.leval*10+'px'}" v-else>{{item.name}}</span>
                            </el-option>
                        </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="标题" prop="title">
            <el-input class="w192" v-model="info.title"></el-input>
          </el-form-item>
        </el-col>
        
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="是否禁用">
                    <el-radio v-model="info.disabled" :label="true">是</el-radio>
                    <el-radio v-model="info.disabled" :label="false">否</el-radio>
                </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <el-form-item label="内容">
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
  import * as fetch from "@/api/interface";
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
        topList:[],
        rules: {
          title: [{
            required: true,
            message: "此项必填",
            trigger: "blur"
          }],
          channelId: [{
            required: true,
            type:'number',
            message: "此项必填",
            trigger: "change"
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
            if(this.type=='save'){
               id=0;
            }


        fetch.getArticleInfo({
          id: id
        }).then(res => {
          this.info = res.body;
          if(this.info.channelId=this.id);
           this.loading = false;
           this.UE.setContent(this.info.content);
            fetch.getArticleChannelList().then(res2=>{//获取父目录
                          this.topList=res2.body;
                     }); 
         
        })
      },
      updateForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.info.content=this.UE.getContent();
            fetch.updateArticleInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('修改成功');
                setTimeout(() => {
                  this.routerLink('/articleList', 'list');
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
            this.info.content=this.UE.getContent();
            if(this.info.channelId==0){
              this.info.channelId='';
            }
            fetch.addArticleInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.imagePath='';
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/articleList', 'list');
                  }, 1000)
                }
              }
            })
          }
        });
      },
      restForm() { //重置
        this.$refs['form'].resetFields();
        if(this.type=='save'){
           this.getInfo(0);
        }else{
          this.getInfo(this.id)
        }
       
      },
      getPath(path) {
        this.info.logoPath = path;
  
      },
      editorReady(editorInstance) {
        this.UE=editorInstance;
        // this.UE.setContent(this.info.content);
      }
    },
    created: function() {
    
      this.getInfo(this.id);
    }
  
  }
</script>

<style>
  
</style>
