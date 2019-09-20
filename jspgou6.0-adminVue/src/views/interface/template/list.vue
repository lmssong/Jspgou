<template>
    <div >
        <div class="table-top-bar clearfix" style="position: relative;">
            <div class="query-inline-box ">
                <div class="query-inline-group" >
                          <i class="iconfont bbs-mulu" style="color: #b3b4b4;font-size: 22px;"></i>
                            <span class="gray" style="flex:auto">当前目录：</span>
                         <span style="flex:auto;font-size:14px;"> {{params.root}}</span>
                </div>

                <div class="query-inline-group">
                    <el-button type="primary" @click="addResource">新建文件</el-button>
                </div>
                <div class="query-inline-group">
                    <el-upload :action="$store.state.sys.templateUpLoad" name="uploadFile" :data="upobj" :multiple="true" :on-success="upSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false" :on-progress="showProgress" class="tpl-block" style="display:inline-block">
                        <el-button :loading="state">{{statefont}}</el-button>
                    </el-upload>
                    <div class="po-progress">
                        <el-progress :percentage="progress" :stroke-width="5" v-show="progressState">
                        </el-progress>
                    </div>
                </div>
                <div class="query-inline-group">
                    <label>新建目录:</label>
                    <el-input v-model="fileName"></el-input>
                </div>
                <div class="query-inline-group">
                    <el-button @click="newFile">新建</el-button>
                </div>
            </div>
        </div>
        <div class="table-responsive" v-loading.body="loading">
            <form class="form-horizontal no-margin">
                <el-table style="width: 100%" :data="resourceList" @selection-change="checkIds">
                    <el-table-column type="selection" align="center" width="68"></el-table-column>
                    <el-table-column label="文件名" prop="filename" align="center">
                        <template slot-scope="scope">
                                <div class="cur" @click="queryChild(scope.row.name,scope.row.path,scope.row.isDirectory)">
                                    <i class="iconfont bbs-wenjianjiabiheicon" v-show="scope.row.isDirectory"></i>
                                    {{scope.row.filename}}
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="大小" prop="size" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.size}} KB</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="最后修改时间" prop="lastModifiedDate" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" :width="300">
                    <template slot-scope="scope">
                        <a href="javascript:void(0)" class="t-rename iconfont bbs-zhongmingming" title="重命名" @click="reName(scope.row.name)">
                        </a>
                        <a href="javascript:void(0)" class="t-edit iconfont bbs-edit" title="编辑" @click="editResource(scope.row.name)" v-show="!scope.row.isDirectory"></a>
                        <a href="javascript:void(0)" class="t-del iconfont bbs-delete" title="删除" @click="deleteTemplateList(scope.row.name)"></a>
                    </template>
                    </el-table-column>
                </el-table>
                <!--收缩隐藏-->
            </form>

        </div>
        <!---bottom-->
        <div class="table-bottom-bar">
            <div class="pull-left">
                <el-button :disabled="disabled" @click="deleteTemplateList(names)">批量删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as fetch from '@/api/interface'
    export default {
        data() {
            return {
                progress: 0,
                progressState: false,
                state: false,
                statefont: '上传文件',
                loading: true,
                resourceList: [],
                names: '', //批量删除列表
                groupList: [], //会员组列表       
                params: { //接口参数
                    pageNo: 1,
                    pageSize: 20,
                    root: ''
                },
                upobj: {
                    root: '',
                    sessionKey: localStorage.getItem('sessionKey'),
                    appId: this.$store.state.sys.appId
                },
                fileName: '',
                totalCount: 0,
                currentPage: 1,
                changePageSize: localStorage.getItem('PageSize'),
                disabled: true
            }
        },
        methods: {
            getTemplateList() { //获取模版信息列表
                let params = this.params;
                fetch.getTemplateList(params)
                    .then(res => {
    
                        if (res.code == 200) {
                            this.resourceList = res.body;
                            this.totalCount = res.totalCount;
                            if (res.body.length > 0) {
                                this.params.root = res.body[0].path;
                                this.upobj.root = res.body[0].path;
                            }
                            this.loading = false;
    
                        } else {
                            this.loading = false;
                          
                        }
                    })
                    .catch(res => {
                        this.loading = false;
                        this.$message.error('网络异常')
                    })
            },
            showProgress(event, file, fileList) {
                this.progressState = true;
                if (event.percent > 0 && event.percent < 100) {
                    this.progress = parseInt(event.percent);
                } else if (event.percent == 100) {
                    this.progressState = false;
                    this.progress = 0;
                    this.getTemplateList();
                }
            },
            beforeAvatarUpload(file) {
                const isHtml = file.type === 'text/html';
                if (!isHtml) {
                    this.$message.error('模版只能上传html文件');
                }
                return isHtml;
            },
            upSuccess(response, file, fileList) {
                this.state = false;
                this.getTemplateList();
            },
            queryChild(name, path, type) { //点击查询列表
                this.params.root = path;
                if (type) {
                    this.$router.push({
                        path: '/templatelist',
                        query: {
                            name: name
                        }
                    })
                }
            },
            newFile() { //创建新目录
                this.loading = true;
                let params = {
                    root: this.params.root,
                    dirName: this.fileName
                }
                fetch.creatTemplateFile(params)
                    .then(res => {
                        //console.log(res);
                        if (res.code == 200) {
                            this.params.root = this.params.root;
                            this.getTemplateList();
                        } else {
                            this.loading = false;
                            this.$message.error(res.message);
                        }
                    })
                    .catch(res => {
                        this.loading = false;
                        this.$message.error('创建失败')
                    })
            },
            editResource(name) { //修改模版
                this.$router.push({
                    path: '/templateedit',
                    query: {
                        type: 'edit',
                        id: name,
                        root: this.params.root
                    }
                });
            },
            addResource() { //添加模版
                this.$router.push({
                    path: '/templateadd',
                    query: {
                        type: 'add',
                        id: this.params.root,
                        root: this.params.root
                    }
                });
            },
            reName(name) { //修改名称
                this.$router.push({
                    path: '/templaterename',
                    query: {
                        name: name,
                        root: this.params.root
                    }
                });
            },
            deleteTemplateList(id) { //删除模版
                this.names = id;
                this.$confirm('您确定要删除模版吗?', '警告', {
                        type: 'warning'
                    })
                    .then(mes => {
                        fetch.deleteTemplateList({
                                names: this.names
                            })
                            .then(res => {
                                //console.log(res);
                                this.loading = false;
                                if (res.code == 200) {
                                    this.$message.success('删除成功');
                                    this.getTemplateList();
                                }
                            })
                            .catch(res => {
                                this.loading = false;
                                this.$message.error('网络异常')
                            })
                    }).catch(mes => {})
            },
            getPage(val) { //获取当前页数
                //console.log(val);
                this.loading = true;
                this.params.pageNo = val;
    
                this.getTemplateList();
            },
            getSize(val) { //分页
                this.loading = true;
                this.params.pageNo = val;
                this.getTemplateList();
            },
            changeSize(event) { //跳页
                let val = event.target.value;
                if (val < 1) {
                    localStorage.setItem('PageSize', 20); //处理异常大小
                    val = 20;
                } else {
                    localStorage.setItem('PageSize', val); //本地存储下每页条数
                }
                this.loading = true;
                this.params.pageSize = parseInt(val);
                this.params.pageNo = 1;
                this.currentPage = 1;
                this.getTemplateList();
            },
            checkIds(res) { //选中当前的names
                let names = [];
                for (let i = 0; i < res.length; i++) {
                    names.push(res[i].name);
                }
                if (names.length == 0) {
                    this.names = '';
                    this.disabled = true;
                } else {
                    this.names = names.join(',');
                    this.disabled = false;
                }
            }
        },
        created: function() {
            let size = localStorage.getItem('PageSize');
            if (size != null) {
                this.params.pageSize = parseInt(size); //取本地存储的条目   
            } else {
                this.changePageSize = 20;
            }
            this.params.root = this.$route.query.name; //获取树形id
            this.upobj.root = this.$route.query.name;
            this.getTemplateList();
        },
        watch: {
            '$route': function(to, from) {
                this.params.root = this.$route.query.name; //获取树形id
                this.upobj.root = this.$route.query.name;
                this.loading = true;
                this.getTemplateList();
                this.fileName = "";
            }
        }
    }
</script>

<style scoped>
    .cur {
        cursor: pointer;
    }
    
    .inline-block {
        display: inline-block;
        width: 500px;
    }
    
    .inline-block>* {
        float: left;
    }
</style>
