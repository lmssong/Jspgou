<template>
    <div >
        
        <div class="table-body table-responsive" >
            <el-form :model="params" :rules="rules" ref="topicInfo">
                <el-form-item label="原名称" class="form-group" style="margin-top:20px;margin-bottom:0">
                    <el-col :span="6">
                        {{params.origName}}
                    </el-col>
                    <el-col :span="1" class="required">&nbsp; </el-col>
                    <el-col :span="7" class=""></el-col>
                </el-form-item>
                 <el-form-item label="新名称" class="form-group" prop="distName">
                    <el-col :span="6">
                        <el-input v-model="params.distName"></el-input>
                    </el-col>
                    <el-col :span="1" class="required">*</el-col>
                    <el-col :span="7" class=""></el-col>
                </el-form-item>
            </el-form>
            <div class="margin-md">
                <input type="button" value="提交" class="bbs-submit" @click="reName('topicInfo')" />
                <input type="reset" value="重置" class="bbs-reset" />
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
            rules: {
                distName: [{ required: true, message: '此项必填', trigger: 'blur' }]
            },
            params:{
                origName:'',
                distName:'',
                root:''
            }
        }
    },
    methods: {
        reName(formName) {//修改系统信息
            this.$refs[formName].validate((valid) => {
                document.querySelector("#main").scrollTop = 0;
                if (valid) {
                    let params = this.params;
                    fetch.reName(params)
                        .then(res => {
                             this.loading = false;
                            if (res.code == 200) {
                                this.$message.success('修改成功');
                           this.$router.push({path: '/resourcelist',query:{name:this.params.root}})
                            } else {
                                this.$message.error(res.message);
                                 this.$router.push({path: '/resourcelist',query:{name:this.params.root}})
                            }
                        })
                        .catch(res => {
                             this.loading = false;
                            this.$message.error('修改失败');
                            this.$router.push({path: '/resourcelist',query:{name:this.params.root}})
                        })
                } else {
                    document.querySelector("#main").scrollTop = 0;
                    return false;
                }
            });
        },
        back(){
              this.$router.push({path: '/resourcelist',query:{name:this.params.root}})
        }
    },

    created: function() {
        let name = this.$route.query.name;
        let root=this.$route.query.root;
        this.params.origName=name;
        this.params.distName=name;
        this.params.root=root;
    }
   
}
</script>
<style>

</style>
