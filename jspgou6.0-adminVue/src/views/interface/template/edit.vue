<template>
    <div >
        <div class="forum-header">
            <span class="forum-name">{{$route.name}}</span>
            <div class="pull-right">
                <el-button @click="back">返回列表</el-button>
            </div>
        </div>
        <div class="table-body table-responsive" v-loading.body="loading">
            <el-form :rules="rules" :model="resourceInfo" ref="topicInfo">
                <el-form-item label="文件名:" class="form-group left-group" style="margin-top:24px;">
                    <el-col :span="6">
                        <el-input class="w128" v-model="showFileName" :disabled="true" v-if="$route.query.type=='edit'"></el-input>
                        <el-input class="w128" v-model="showFileName" v-if="$route.query.type=='add'"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label=" " class="form-group">
                    <el-col :span="24">
                        <textarea rows="25" style="width:100%;outline:none" v-model="resourceInfo.source" id="tmp">

                        </textarea>
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="margin-md">
                <el-button   type="warning" v-if="$route.query.type=='edit'" @click="updateResourceInfo('topicInfo')" >
                    修改
                </el-button>
                <el-button  value="" type="primary" v-if="$route.query.type=='add'" @click="addTemplateInfo('topicInfo')" >
                    添加
                </el-button>
                <el-button  type="reset" >重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import * as fetch from '@/api/interface'
export default {
    data() {
        return {
            loading: true,
            count: 0,
            state: false,
            resourceInfo: {
                filename: '',
                source: ''
            },
            showFileName: '',
            rules: {
                name: [{ required: true, message: '请填写一个主题分类名', trigger: 'blur' }],
                path: [{ required: true, message: '请填写一个路径', trigger: 'blur' }],
                priority: [{ required: true, type: 'number', message: '请填写一个数字排序', trigger: 'blur' }]
            },
        }
    },
    methods: {
        getTemplateInfo(id) {//获取分类主题信息
            fetch.getTemplateInfo({ name: id })
                .then(res => {
                    this.loading = false;
                    //console.log(res);
                    this.resourceInfo.source = res.body
                })
                .catch(res => {
                    this.loading = false;
                    this.$message.error('网络异常');
                })
        },
        updateResourceInfo(formName) {//修改主题
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   
                    let params = this.resourceInfo;
                    fetch.updateResourceInfo(params)
                        .then(res => {
                            if (res.code == 200) {
                                this.$message.success('修改成功');
                               
                            } else {
                                this.$message.error(res.message);
                            }
                        })
    
                } else {
                    return false;
                }
            });
        },
        addTemplateInfo(formName) {//添加主题
            this.$refs[formName].validate((valid) => {
                if (valid) {
                      this.resourceInfo.root=this.resourceInfo.filename;
                      this.resourceInfo.filename=this.showFileName;
                    let params = this.resourceInfo;
                    fetch.addTemplateInfo(params)
                        .then(res => {
                            if (res.code == 200) {
                                this.$message.success('添加成功');  
                                setTimeout(() => {
                                    this.back();
                                }, 1000);                             
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                        .catch(res => {
                            this.$message.error('添加失败');
                        })
                } else {
                    return false;
                }
            });
        },
        back() {
            this.$router.push({
                path: '/templatelist',
                query: {
                    name: this.$route.query.root,
                    noceStr: Math.round(Math.random() * 10)
                }
            })
        },
        resetForm(formName) {//重置表单
            let id = this.$route.query.id;
            this.$refs[formName].resetFields();
        },
        stringReplace(str) {
            var index = str.lastIndexOf("\/");
            str = str.substring(index + 1, str.length);
            return str;
        }
    },
    created: function() {
         $(window).scrollTop(0);
        let type = this.$route.query.type;
        let id = this.$route.query.id;
        let rootId = this.$route.query.rootId;//上级目录
       
        if (type == 'add') {
            this.resourceInfo.filename = id;
            this.loading = false;
        } else{ 
        
        if (type == 'edit') {
            this.resourceInfo.filename = id;
            this.showFileName = this.stringReplace(id);
            this.getTemplateInfo(id);
        }}
        
    },
    mounted(){
        $("#tmp").slimScroll({
            height: '100%',
            width: '100%',
            color: '#999',
            opacity: 0.5
        });
         $(window).scrollTop(0);
    },
    watch: {
        '$route': function(to, from) {
            let id = this.$route.query.id;
             this.showFileName = this.stringReplace(id); 
             this.resourceInfo.filename = id;
             
            this.loading = true;
            this.getTemplateInfo(id);
             $(window).scrollTop(0);
        }
    }
}
</script>
<style>
.left-group .el-form-item__label{
  width: auto;
  padding-right:6px;
}
</style>
