<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/channelList','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="上级分类" prop="name">
                       <span >{{topName}}</span>
                    </el-form-item>
             </el-col>  
             <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="栏目类型" prop="name">
                       <span v-if="typeId==1">单页栏目</span>
                       <span v-if="typeId==2">文章栏目</span>
                       <span v-if="typeId==3">链接栏目</span>
                    </el-form-item>
             </el-col>  
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="栏目名称" prop="name">
                    <el-input class="w192" v-model="info.name"></el-input>
                </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12" v-if="typeId!=3">
                <el-form-item label="访问路径" prop="path">
                    <el-input class="w192" v-model="info.path"></el-input>
                </el-form-item>
        </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" v-else>
                <el-form-item label="链接地址" prop="outerUrl">
                    <el-input class="w192" v-model="info.outerUrl"></el-input>
                </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12" v-if="typeId!=3"> 
                <el-form-item label="栏目页模版" prop="tplChannel">
                      <el-select filterable placeholder="请选择" v-model="info.tplChannel" class="w192">
                            <el-option label="默认" value=""></el-option>
                            <el-option v-for="item in channelList" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12" v-if="typeId==2">
                <el-form-item label="内容页模版" prop="tplContent">
                     <el-select filterable placeholder="请选择" v-model="info.tplContent" class="w192">
                            <el-option label="默认" value=""></el-option>
                            <el-option v-for="item in contentList" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                </el-form-item>
        </el-col>
 <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="是否显示" prop="display">
                     <el-radio v-model="info.display" :label="true">是</el-radio>
                      <el-radio v-model="info.display" :label="false">否</el-radio>
                </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="是否新窗口显示" prop="blank">
                     <el-radio v-model="info.blank" :label="true">是</el-radio>
                      <el-radio v-model="info.blank" :label="false">否</el-radio>
                </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <el-form-item label="排列顺序" prop="priority">
                      <el-input class="w192" v-model.number="info.priority"></el-input>
                </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="typeId!=3">
                <el-form-item label="内容" >
                     <VueUEditor @ready="editorReady"></VueUEditor>
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
        pid:this.$route.query.pid,
        id: this.$route.query.id,
        topName:this.$route.query.topName,
        typeId:this.$route.query.typeId,
        info: {}, //列表
        categoryIdList: [],
        channelList:[],
        contentList:[],
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
         fetch.getChannelTpl({type:this.typeId}).then(res=>{//获取模版
           this.channelList=res.body.channelTpls;
            this.contentList=res.body.contentTpls;
         });
         fetch.getParentChannelList({id:this.pid}).then(res=>{//获取父目录
          console.log(res);
         });
        fetch.getChannelInfo({
          id: id
        }).then(res => {
          this.info = res.body;
           this.loading = false;
           this.UE.setContent(this.info.text); 
        
        })
      },
      updateForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.info.text=this.UE.getContent();
            fetch.updateChannelInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('修改成功');
                setTimeout(() => {
                  this.routerLink('/channelList', 'list');
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
            this.info.pid=this.pid;
            this.info.type=this.typeId;
            if(this.typeId!=3){
                  this.info.content=this.UE.getContent();
            }
            fetch.addChannelInfo(this.info).then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage('添加成功');
                if (state) {
                  this.imagePath='';
                  this.getInfo(this.id);
                } else {
                  setTimeout(() => {
                    this.routerLink('/channelList', 'list');
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
