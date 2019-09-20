<template>
    <div class="forum-module" v-loading='loading'>
        <div class="forum-header">
            <span class="forum-name">{{$route.name}}</span>
            <div class="pull-right">
                <el-button class="back" @click="routerLink('/commodityCategoryList','list',parentId);">返回列表</el-button>
            </div>
        </div>
        <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
            <el-row class="form-group dynamic-layout ">
                <el-col class="flex-50">
                    <el-form-item label="上级分类" :required="true" >
                        <el-select filterable placeholder="请选择" v-model="parentId" class="w192">
                            <el-option label="所有分类" :value='0'></el-option>
                            <el-option v-for="item in parantList" :key="item.id" :label="item.categoryName" :value="item.id">
                                <span :style="{paddingLeft:item.leval*10+'px'}" v-if="item.leval>1">>{{item.categoryName}}</span>
                                <span :style="{paddingLeft:item.leval*10+'px'}" v-else>{{item.categoryName}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="flex-50">
                    <el-form-item label="商品模型">
                        <span>{{info.typeName}}</span>
    
                    </el-form-item>
                </el-col>
                <el-col :class="[model.single ? 'flex-100' :'flex-50']" v-for="(model,index) in modelInfo" :key="model.id" v-if="model.field!='standardTypeIds'">
                    <el-form-item :label="model.propertyName" :prop="model.field">
    
                        <!-- 商品分类模版 -->
                        <el-select filterable placeholder="请选择"
                         v-model="info.tplChannel" v-if="model.dataType==6&&model.field=='tplChannel'" class="w192">
                            <el-option label="默认" value=""></el-option>
                            <el-option v-for="item in tplChannelList" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <!-- 商品模版 -->
                        <el-select filterable placeholder="请选择" 
                        v-model="info.tplContent"
                         v-if="model.dataType==6&&model.field=='tplContent'" class="w192">
                            <el-option label="默认" value=""></el-option>
                            <el-option v-for="item in tplContentList" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <!-- 关联品牌 -->
                        <div v-if="model.field=='refBrand'">
                            <el-button @click="dialogTableVisible=true" type="primary">关联品牌</el-button>
                            <el-dialog title="选择关联品牌" :visible.sync="dialogTableVisible" center>
                                <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange">全选</el-checkbox>
                                <div style="margin: 15px 0;"></div>
                                <el-checkbox-group v-model="checkedBrands" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="brand in brandList" :label="brand.brandId" :key="brand.brandId">{{brand.brandName}}</el-checkbox>
                                </el-checkbox-group>
                            </el-dialog>
                            <el-checkbox-group v-model="checkedBrands" @change="handleCheckedCitiesChange" class="group-checkbox">
                                <el-checkbox v-for="brand in checkBrandsList" :label="brand.brandId" :key="brand.brandId">{{brand.brandName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!-- 关联规格 -->
    
                        <div v-if="model.field=='colorsize'">
                            <el-button @click="dialogTableVisible2=true" type="primary">关联规格</el-button>
                            <el-dialog title="选择关联规格" :visible.sync="dialogTableVisible2" center>
                                <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
                                <div style="margin: 15px 0;"></div>
                                <el-checkbox-group v-model="checkedStandardType" @change="handleCheckedCitiesChange2" >
                                    <el-checkbox v-for="item in standardTypeList" :label="item.id" :key="item.id">
                                        {{item.name}}[{{item.remark}}]</el-checkbox>
                                </el-checkbox-group>
                            </el-dialog>
                            <el-checkbox-group v-model="checkedStandardType" @change="handleCheckedCitiesChange2" class="group-checkbox">
                                <el-checkbox v-for="item in checkStandardTypeList" :label="item.id" :key="item.id">
                                    {{item.name}} [{{item.remark}}]
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!-- 图片上传 -->
                        <imageUpload v-if="model.field=='imagePath'" @getPath="getPath" :path="imagePath"></imageUpload>
    
                        <el-input class="w192" v-model.number="info[model.field]" v-if="model.dataType==1&&model.field!='imagePath'"></el-input>
                        <el-input class="w192" v-model="info[model.field]" v-if="model.dataType==2"></el-input>
                        <el-input class="w192" v-model="info[model.field]" v-if="model.dataType==3"></el-input>
                        <el-input class="w192" v-model="info[model.field]" type="textarea" v-if="model.dataType==4"></el-input>
                        <el-date-picker v-model="info[model.field]" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-if="model.dataType==5">
                        </el-date-picker>
    
                        <el-checkbox-group v-model="info[model.field]" v-if="model.dataType==7&&model.field!='refBrand'&&model.field!='standardTypeIds'&&model.field!='colorsize'">
                            <el-checkbox v-for="item in model.optValue" :key="item" :label="item"></el-checkbox>
                        </el-checkbox-group>
                        <el-radio-group v-model="info[model.field]" v-if="model.dataType==8">
                            <el-radio v-for="item in model.optValue" :key="item" :label="item">{{item}}</el-radio>
                        </el-radio-group>
    
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="form-bottom-bar">
            <el-button type="primary" v-if="type=='update'" @click="saveForm(false)">提交</el-button>
            <el-button type="info" @click="restForm()">重置</el-button>
        </div>
    
    </div>
</template>

<script>
    import axios from "axios";
    import * as fetch from "@/api/commodity";
    import * as untils from "@/untils/global";
    import imageUpload from '@/components/uploadImage.vue'
    import {
        getDictTypeId
    } from "@/api/dict";
    export default {
        components: {
            imageUpload
        },
        data() {
            return {
                loading: false,
                type: this.$route.query.type,
                modelId: this.$route.query.typeId,
                parentId: 0,
                id: this.$route.query.id,
                info: {}, //列表
                imagePath: '',
                modelInfo: [], //模型
                parantList: [],
                tplChannelList: [],
                tplContentList: [],
                checkAll1: false,
                checkedBrands: [],
                checkBrandsList: [],
                brandList: [],
                isIndeterminate1: true,
                dialogTableVisible: false, //品牌弹窗
                checkAll2: false,
                checkedStandardType: [],
                checkStandardTypeList: [],
                standardTypeList: [],
                isIndeterminate2: true,
                dialogTableVisible2: false, //品牌弹窗
                upload: {
                    //上传相关变量
                    url: process.env.FILE_URL,
                    imageUrl: "",
                    uploading: false,
                    percent: 0,
                    data: {
                        type: "attach",
                        appId: this.$store.state.sys.appId,
                        sessionKey: localStorage.getItem("sessionKey")
                    }
                },
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
                        trigger: "change"
                    }],
                }
            };
        },
    
        methods: {
            getModelInfo(modelId) {
                let params = {
    
                };
    
            },
            getInfo(id) {
                fetch.getCommodityCategoryInfo({
                    id: id
                }).then(res1 => {
                    if (res1.code == 200) {
                      
                        this.info = res1.body;
                        fetch.getModelInfo({
                            typeId: res1.body.typeId,
                            isCategory: true
                        }).then(res2 => {
                            this.modelInfo = res2.body;
                            this.imagePath = res1.body.imagePath;
                            axios.all([
                                    fetch.getCommodityTopCategory({
                                        id: res1.body.parantId
                                    }),
                                    fetch.getCommodityTemplate({
                                        typeId: res1.body.typeId
                                    }), //模版,
                                    fetch.getCommodityBrand(), //获取品牌
                                    fetch.getCommodityStandardType(), //获取规格
                                ])
                                .then(
                                    axios.spread((parantList, tpl, brand, standard) => {
                                            console.log(standard.body);
                                        this.parentId = res1.body.parentId;
                                        this.parantList = parantList.body;
                                        this.tplChannelList = tpl.body.channelTpls;
                                        this.tplContentList = tpl.body.contentTpls;
                                        this.brandList = brand.body;
                                        this.standardTypeList = standard.body;
                                        this.checkedBrands = res1.body.brandIds;
                                        this.checkedStandardType = res1.body.standardTypeIds;
                                    })
                                );
                        });
    
                    }
                })
            },
            creatInfoObj(obj) {
                let curObj = {};
                for (let i in obj) {
                    if (obj[i].dataType === 7) {
                        curObj[obj[i].field] = [];
                    } else {
                        curObj[obj[i].field] = "";
                    }
                }
                return curObj;
            },
            saveForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.info.parentId = this.parentId; //选择父层
                        this.info.brandIds = this.checkedBrands.join(',');
                        this.info.standardTypeIds = this.checkedStandardType.join(',');
                        if (this.checkedStandardType.length > 0) {
                            this.info.colorsize = true;
                        } else {
                            this.info.colorsize = false;
                        }
                        fetch.updateCommodityCategoryInfo(this.info).then(res => {
                            this.loading = false;
                            if (res.code == 200) {
                                this.successMessage('修改成功');
                                setTimeout(() => {
                                    this.routerLink('/commodityCategoryList', 'list', this.parentId);
                                }, 1000)
    
                            }
                        })
                    }
                });
            },
            getPath(path) { //获取上传后的路径  
                this.imagePath = path;
                this.info.imagePath = path;
            },
            restForm() {
                //重置
                this.$refs["form"].resetFields();
                this.getInfo(this.id);
            },
            handleCheckAllChange(val) {
                let arr = [];
                for (let i in this.brandList) {
                    arr.push(this.brandList[i].brandId);
                }
                this.checkedBrands = val ? arr : [];
                this.isIndeterminate1 = false;
            },
            handleCheckedCitiesChange(value) {
    
                let checkedCount = value.length;
                this.checkAll1 = checkedCount === this.brandList.length;
                this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.brandList.length;
            },
            handleCheckAllChange2(val) {
                let arr = [];
                for (let i in this.standardTypeList) {
                    arr.push(this.standardTypeList[i].id);
                }
               
                this.checkedStandardType = val ? arr : [];
                this.isIndeterminate2 = false;
            },
            handleCheckedCitiesChange2(value) {
                let checkedCount = value.length;
                this.checkAll2 = checkedCount === this.standardTypeList.length;
                this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.standardTypeList.length;
            },
        },
        watch: {
            checkedBrands: {
                handler(newVal, oldVal) {
    
                    let arr = [];
                    let allList = this.brandList;
                    for (let i in allList) {
                        for (let j in newVal) {
                            if (allList[i].brandId == newVal[j]) {
                                arr.push(allList[i]);
                            }
                        }
                    }
                    this.checkBrandsList = arr;
                },
                deep: true
            },
            checkedStandardType: {
                handler(newVal, oldVal) {
                    console.log(this.checkStandardTypeList);
                    let arr = [];
                    let allList = this.standardTypeList;
                    for (let i in allList) {
                        for (let j in newVal) {
                            if (allList[i].id == newVal[j]) {
                                arr.push(allList[i]);
                            }
                        }
                    }
                    this.checkStandardTypeList = arr;
    
                },
                deep: true
            },
        },
        created: function() {
            this.getInfo(this.id);
        }
    };
</script>

<style>
    
</style>
