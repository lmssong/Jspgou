<template>
    <div >
      
        <div class="table-top-bar clearfix" style="position: relative;">
            <div class="query-inline-box ">
                <div class="query-inline-group">
                    <i class="iconfont bbs-mulu" style="color: #b3b4b4;font-size: 22px;position: relative;"></i>
                            <span class="gray">当前目录：</span>
                            <span> {{params.root}}</span>
                </div>
                <div class="query-inline-group">
                    <el-button type="primary" @click="addResource">新建文件</el-button>
                </div>
                <div class="query-inline-group">
                    <el-upload ref="upload" :action="$store.state.sys.resourceUpLoad" name="uploadFile" :data="upobj" :multiple="true" :on-success="upSuccess" :show-file-list="false" :on-progress="showProgress" style="display:inline-block" class="tpl-block">
                        <el-button>{{statefont}}</el-button>
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
    <a href="javascript:void(0)" class="t-edit iconfont bbs-edit" title="编辑" @click="editResource(scope.row.name)" v-show="scope.row.edit"></a>
    <a href="javascript:void(0)" class="t-del iconfont bbs-delete" title="删除" @click="deleteResourceList(scope.row.name)"></a>
</template>
                    </el-table-column>
                </el-table>
                <!--收缩隐藏-->
            </form>

        </div>
        <!---bottom-->
        <div class="table-bottom-bar">
            <div class="pull-left">
                <el-button :disabled="disabled" @click="deleteResourceList(names)">批量删除</el-button>
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
                state: true,
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
            getResourceList() { //获取资源信息列表
                let params = this.params;
                fetch.getResourceList(params)
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
                            this.$message.error(res.message);
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
                    this.getResourceList();
                }
            },
            upSuccess(response, file, fileList) {
                this.getResourceList();
            },
            queryChild(name, path, type) { //点击查询列表
                this.params.root = path;
                if (type) {
                    this.$router.push({
                        path: '/resourcelist',
                        query: {
                            name: name
                        }
                    })
                } else {
                    window.open(this.$store.state.baseUrl + name);
                }
            },
            newFile() { //创建新目录
                this.loading = true;
                let params = {
                    root: this.params.root,
                    dirName: this.fileName
                }
                fetch.creatResourceFile(params)
                    .then(res => {
    
                        if (res.code == 200) {
                            this.params.root = this.params.root;
                            this.getResourceList();
                        } else {
                            this.loading = false;
                            this.$message.error('创建失败');
                        }
                    })
                    .catch(res => {
                        this.loading = false;
                        this.$message.error('创建异常')
                    })
            },
            editResource(name) { //修改资源
                this.$router.push({
                    path: '/resourceedit',
                    query: {
                        type: 'edit',
                        id: name,
                        root: this.params.root
                    }
                });
            },
            addResource() { //添加资源
                this.$router.push({
                    path: '/resourceadd',
                    query: {
                        type: 'add',
                        id: this.params.root,
                        root: this.params.root
                    }
                });
            },
            reName(name) { //修改名称
                this.$router.push({
                    path: '/resourcerename',
                    query: {
                        name: name,
                        root: this.params.root
                    }
                });
            },
            deleteResourceList(id) { //删除资源
                this.names = id;
                this.$confirm('您确定要删除资源吗?', '警告', {
                        type: 'warning'
                    })
                    .then(mes => {
                        fetch.deleteResourceList({
                                names: this.names
                            })
                            .then(res => {
                                //console.log(res);
                                this.loading = false;
                                if (res.code == 200) {
                                    this.$message.success('删除成功');
                                    this.getResourceList();
                                }
                            })
                            .catch(res => {
                                this.loading = false;
                                this.$message.error('网络异常')
                            })
                    }).catch(mes => {})
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
            this.params.root = this.$route.query.name; //获取树形id
            this.upobj.root = this.$route.query.name;
            this.getResourceList();
        },
        watch: {
            '$route': function(to, from) {
                this.params.root = this.$route.query.name; //获取树形id
                this.upobj.root = this.$route.query.name;
                this.loading = true;
                this.getResourceList();
    
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
