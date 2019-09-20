<template>
    <div class="forum-module" v-loading='loading'>
        <div class="forum-header">
            <span class="forum-name">{{$route.name}}</span>
        </div>
        <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
            <el-row class="form-group">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-col class="border-none" :span="12">
                        <el-form-item label="等级名称" prop="name">
                            <el-input class="w192" v-model="info.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-col class="border-none" :span="12">
                        <el-form-item label="积分" prop="score">
                            <el-input class="w192" v-model.number="info.score" type="number" min="0"></el-input>
                        </el-form-item>
                    </el-col class="border-none">
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-col class="border-none" :span="12">
                        <el-form-item label="折扣额" prop="discount">
                            <el-input class="w192" v-model.number="info.discount" type="number" min="0" max="99"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
        </el-form>
        <div class="form-bottom-bar">
            <el-button type="warning" v-if="type=='save'" @click="saveForm(true)">提交并继续添加</el-button>
            <el-button type="primary" v-if="type=='save'" @click="saveForm(false)">添加</el-button>
            <el-button type="primary" v-if="type=='update'" @click="updateForm()">提交</el-button>
            <el-button type="info" @click="restForm()">重置</el-button>
             <div class="help-info" v-if="type=='save'">选择“提交并继续添加”按钮会停留在添加页面；选择“添加”按钮后将跳转到对应的列表页。</div>
        </div>
    
    </div>
</template>

<script>
    import axios from "axios";
    import * as fetch from "@/api/userMange";
    import * as untils from "@/untils/global";
    export default {
        data() {
            return {
                loading: true,
                type: this.$route.query.type,
                id: this.$route.query.id,
                info: {}, //列表
                rules: {
                    name: [{
                        required: true,
                        message: "请输入用户等级名称",
                        trigger: "blur"
                    }],
                    score: [{
                        required: true,
                        type: 'number',
                        message: "请输入积分",
                        trigger: "blur"
                    }],
                    discount: [{
                        required: true,
                        type: 'number',
                        message: "请输入折扣额",
                        trigger: "blur"
                    }],
                }
            };
        },
        methods: {
            getInfo(id) {
                fetch.getRankInfo({
                        id: id
                    })
                    .then(res => {
                        this.info = res.body;
                        this.loading = false;
                    })
            },
            updateForm(state) { //更新
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        fetch.updateRankInfo(this.info).then(res => {
                            this.loading = false;
                            if (res.code == 200) {
                                this.successMessage('修改成功');
                                setTimeout(() => {
                                    this.routerLink('/rankList', 'list');
                                }, 1000)
                            }
                        })
                    }
                });
            },
            saveForm(state) {
                //增加
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        fetch.addRankInfo(this.info)
                            .then(res => {
                                this.loading = false;
                                if (res.code == 200) {
                                    this.successMessage("添加成功");
                                    if (state) {
                                        this.moreInfo = false;
                                        this.getInfo(0);
                                    } else {
                                        setTimeout(() => {
                                            this.routerLink("/rankList", "list");
                                        }, 1000);
                                    }
                                }
                            })
                            .catch(error => {
                                this.errorMessage("执行异常");
                                this.loading = false;
                            });
                    }
                });
            },
            restForm() { //重置
                this.$refs['form'].resetFields();
                this.getInfo(this.id);
            },
    
        },
        created: function() {
            this.getInfo(this.id);
        }
    };
</script>

<style>
    
</style>
