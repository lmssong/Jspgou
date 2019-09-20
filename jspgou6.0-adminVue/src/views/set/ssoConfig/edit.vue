<template>
    <div class="forum-module">
       <div class="forum-header">
         <span class="forum-name">单点登录设置</span>
    </div>
        
            <el-form :model="systemInfo" :rules="rules" ref="topicInfo" label-width="160px" class="table-body">
                 <el-row class="form-group">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                    <el-form-item label="是否开启单点认证" class="form-group" >
                                            <el-radio v-model="systemInfo.attr_ssoEnable" :label="true">是</el-radio>
                                            <el-radio v-model="systemInfo.attr_ssoEnable" :label="false">否</el-radio>
                                    </el-form-item>
                            </el-col>

                   <el-col :xs="24" :sm="24" :md="24" :lg="12" v-show="systemInfo.attr_ssoEnable">                            
                            <el-form-item label="认证地址" class="form-group">
                                <el-col :span="20">
                                    <el-row :gutter="15" class="mb10" v-for="(item,index) in systemInfo.attr" :key="item.key">
                                        <el-col :span="10">
                                            <el-input v-model="item.value"></el-input>
                                        </el-col>
                                        <el-col :span="1" class="required">
                                            <el-button type="danger" @click="deledeItems(index)">删除</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-col :span="1" class="required">
                                        <el-button type="warning" @click="addSso">添加</el-button>
                                    </el-col>
                                </el-col>
                            </el-form-item>
                </el-col>    
           </el-row>
            </el-form>
            <div class="form-bottom-bar">
               
                <el-button type="primary"  @click="updateSsoInfo('topicInfo')">修改</el-button>
                <el-button type="info" @click="restForm()">重置</el-button>
            </div>
        
    </div>
</template>

<script>
    import * as fetch from '@/api/set'
   
    export default {
        data() {
            return {
                loading: true,
                systemInfo: {},
               
                groupList: [],
                rules: {
                    exchangetax: [{
                        required: true,
                        type: 'number',
                        message: '请输入一个数字',
                        trigger: 'blur'
                    }],
                    miniBalance: [{
                        required: true,
                        type: 'number',
                        message: '此项必填',
                        trigger: 'blur'
                    }]
                },
                params:''
            }
        },
        methods: {
    
            getSsoInfo() { //获取系统信息
                fetch.getSsoInfo()
                    .then(res => {
                        if (res.code == '200') {
                          
                            this.loading = false;
                            this.systemInfo = res.body;
                        }
                    })
                    .catch(res => {
                        this.loading = false;
                       
                    })
            },
            updateSsoInfo(formName) { //修改系统信息
                this.$refs[formName].validate((valid) => {
                    document.querySelector("#main").scrollTop = 0;
                    if (valid) {
                        this.loading = true;
                        let params = this.params;
                        fetch.updateSsoInfo(params)
                            .then(res => {
                                this.loading = false;
                                if (res.code == '200') {
    
                                    this.$message.success('修改成功');
                                }
                            })
                            .catch(res => {
                                this.loading = false;
                                this.$message.error('修改异常');
                            })
                    } else {
                        document.querySelector("#main").scrollTop = 0;
                        return false;
                    }
                });
            },
            deledeItems(index) {
                this.systemInfo.attr.splice(index, 1);
            },
            addSso() {
             let index= this.systemInfo.attr.length+1;
                let obj = {
                    value: '',
                    key: 'attr_sso_' + index
                }
                this.systemInfo.attr.push(obj);
            }
        },
    
        created: function() {
            this.getSsoInfo();
        },
        watch: {
            '$route': function(to, from) {
                this.loading = true;
                this.getSsoInfo()
            },
            systemInfo:{
                handler(newVal,oldVal){
                  let arr =newVal.attr;
                  this.params={
                      attr_ssoEnable:newVal.attr_ssoEnable
                  }
                  for(let i in arr){
                     this.params[arr[i].key]=arr[i].value
                 }
                },
                deep:true

            }
        }
    }
</script>

<style scoped>
    .mb10 {
        margin-bottom: 10px;
    }
</style>
