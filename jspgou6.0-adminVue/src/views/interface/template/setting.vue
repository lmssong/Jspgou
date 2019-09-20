<template>
    <div >
        <div class="forum-header">
            <span class="forum-name">{{$route.name}}-{{mobileState}}</span>
            <div class="pull-right">
                <el-button  @click="routerLink('/templatelist','list')">返回列表</el-button>
            </div>
        </div>
        <div class="table-body table-responsive" style="margin-top:24px;">
            <el-form>
                <el-form-item label="方案" class="form-group">
                    <el-col :span="4">
                        <el-select v-model="params.solution">
                            <el-option v-for="item in solutions" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" style="margin-left:15px" @click="setSolutions">设置</el-button>
                    </el-col>
                </el-form-item>

                <el-form-item label="导出" class="form-group">
                    <el-col :span="4">
                        <el-select v-model="solution">
                            <el-option v-for="item in solutions" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                         <a :href="exportLink" class="el-button el-button--primary" style="margin-left:15px">导出</a>
                    </el-col>
                </el-form-item>

                 <el-form-item label="导入" class="form-group">
                    <el-col :span="6">
                         <el-upload
            :action="$store.state.importTpl"
             name="uploadFile" 
             :data="upobj"
             :show-file-list="true"
              style="display:inline-block">
             <el-button>导入</el-button>
            </el-upload>
                    </el-col>
                </el-form-item>
            </el-form>
            <div class="margin-md">

            </div>
        </div>
    </div>
</template>

<script>
import * as fetch from '@/api/interface'
import * as exportExcel from '@/api/exportLink'
export default {
    data() {
        return {
            solutions: [],//方案
            params: {//接口参数
                solution: '',
                mobile: true
            },
            solution:'',
            exportLink: "#",
            mobileState:'PC',
            upobj: {
                sessionKey: localStorage.getItem('sessionKey'),
                appId: this.$store.state.sys.appId
            },
        }
    },
    methods: {
        getSolutions() {
            fetch.getSolutions()
                .then(res => {
                    //console.log(res);
                    this.solutions = res.body;
                    this.params.solution=res.body[0];
                    this.solution=res.body[0];
                })
        },
          setSolutions(){
              fetch.setSolutions(this.params)
                .then(res => {
                     if(res.code=='200'){
                          this.$message.success('设置成功');
                     }else{
                          this.$message.success('设置失败');
                     }

                })
          }
       
    },
    created: function() {
        this.params.mobile=this.$route.query.mobile;
         if(this.$route.query.mobile){
             this.mobileState='mobile'
         }else{
             this.mobileState='PC'
         }
        this.getSolutions();
        this.exportLink=exportExcel.templateExport({solution:this.solution});　
    },
    watch: {
        '$route': function(to, from) {
             if(this.$route.query.mobile){
             this.mobileState='mobile'
         }else{
             this.mobileState='PC'
         }
        },
         'solution':{
             handler(curVal,oldVal){
　　　　　　　　　　this.exportLink=exportExcel.templateExport({solution:this.solution});　
　　　　　　　　　　}　　　　　
        }
    }
}
</script>

<style>

</style>
