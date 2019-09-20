<template>
    <div class="forum-module" v-loading='loading'>
        <div class="forum-header">
            <span class="forum-name">{{$route.name}}</span>
            <div class="pull-right">
                <el-button class="back" @click="routerLink('/productList','list');">返回列表</el-button>
            </div>
        </div>
        <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
            <el-row class="form-group dynamic-layout ">
                <el-col :class="[model.single ? 'flex-100' :'flex-50']" v-for="(model,index) in modelInfo" :key="model.id" v-if="model.field!='tagIds'&&model.field!='coverImg'">     
                   <!-- 商品名称-->
                    <el-form-item :label="model.propertyName" :prop="model.field" v-if='model.field=="name"'>
                       <el-input class="w192" v-model="info[model.field]" :maxlength='25'></el-input>
                    </el-form-item>
                    <!-- 分类 -->
                    <el-form-item :label="model.propertyName" :prop="model.field" v-if='model.field=="categoryId"'>
                        <span v-if="model.field=='categoryId'">{{$route.query.categoryName}}</span>
                    </el-form-item>

                     <!-- 品牌 -->
                       <el-form-item :label="model.propertyName" :prop="model.field" v-if='model.field=="brandId"'>
                         <el-select filterable placeholder="请选择品牌" v-model="info[model.field]"  class="w192" >
                            <el-option v-for="item in brandList"
                            :key="item.id" 
                              :label="item.name"
                                 :value="item.id">     
                            </el-option>
                        </el-select>    
                          </el-form-item>
                        <!--价格-->
               <el-form-item :label="model.propertyName" :prop="model.field" v-if='model.field=="price"&&!typeInfo.colorsize'>
                          <div class="price-group">
                                  <label for="">销售价: </label>
                                   <el-input class="w-50" v-model="info.salePrice"></el-input>
                                  </div>
                                  <div class="price-group">
                                  <label for="">市场价: </label>
                                   <el-input class="w-50" v-model="info.marketPrice"></el-input>
                                  </div> 
                                  <div class="price-group">
                                  <label for="">成本价: </label>
                                   <el-input class="w-50" v-model.number="info.costPrice"></el-input>
                                  </div> 
                          </el-form-item>
                    <!-- 商品库存 -->
                      <el-form-item :label="model.propertyName" :prop="model.field" v-if='model.field=="stockCount"&&!typeInfo.colorsize'>
                                 <el-input class="w192" v-model="info[model.field]"></el-input>
                          </el-form-item>
                      <!-- 商品重量 -->
                      <el-form-item :label="model.propertyName" :prop="model.field" v-if='model.field=="weight"'>
                                 <el-input class="w192" v-model="info[model.field]"></el-input>
                                 <span class="gray" >克(g)</span>
                          </el-form-item>
                           <!-- 设置 -->

                 <el-form-item :label="model.propertyName" :prop="model.field" v-if='model.field=="attr"' class="border-bottom">
                                    <el-checkbox  v-model="info['recommend']">推荐</el-checkbox>
                                   <el-checkbox  v-model="info['special']">特价</el-checkbox>
                                  <el-checkbox  v-model="info['hotsale']">热卖</el-checkbox>
                                  <el-checkbox  v-model="info['newProduct']">新品</el-checkbox>     
                          </el-form-item>
                                <!--是否上架-->
                <el-form-item label="是否上架" v-if='model.field=="attr"' class="border-bottom">
                    <el-radio v-model="info.status" :label="1">是</el-radio>
                         <el-radio v-model="info.status" :label="2">否</el-radio>
                </el-form-item> 

                <!-- 规格功能开启 -->
            <el-form-item label="规格" v-if='model.field=="attr"&&typeInfo.colorsize&&infoReady' >
                        <colorSizeUpdate :id='categoryId' 
                        :obj="{
                                    standardId:info.standardId,
                                    productStandardImg:info.productStandardImg,
                                    productFashion:info.productFashion,
                                    productStandardImgId:info.productStandardImgId
                                 }" 
                         @getData='getSizeData'></colorSizeUpdate>   
                </el-form-item> 
                <!-- 规格功能开启 -->
                <!--款式集-->
                    <el-form-item :label="model.propertyName" :prop="model.field"  v-if='model.field=="productstyle"'>
                                  <imageUpload  v-for="(item,index) in 5" style="display:inline-block;margin-right:25px;" 
                                  :key="index" @getPath="getPath" :index='index' :path="fashionSwitchPic[index]">
                                  </imageUpload>  
                          </el-form-item>

                            <!--富文本编辑器商品详情  -->
                          <el-form-item :label="model.propertyName" :prop="model.field"  v-if='model.field=="text"'>
                                   <VueUEditor   :defaultMsg="defaultMsg" :index='0' @ready='editorReady'></VueUEditor>
                          </el-form-item>
                          <!--富文本编辑器售后服务  -->
 <el-form-item :label="model.propertyName" :prop="model.field"  v-if='model.field=="text1"'>
                                  <VueUEditor   :defaultMsg="defaultMsg"  :index='1' @ready='editorReady'></VueUEditor>
                          </el-form-item>


                             <!-- 普通表单渲染 -->
                            <el-form-item :label="model.propertyName" :prop="model.field"  v-if="
                            model.dataType==1
                            &&model.field!='productstyle'
                            &&model.field!='name'
                            &&model.field!='stockCount'
                            &&model.field!='weight'">
                                    <el-input class="w192" v-model="info[model.field]"></el-input>   
                              </el-form-item>  
                    
                           <el-form-item :label="model.propertyName" :prop="model.field" 
                            v-if="model.dataType==2
                            &&model.field!='price'
                            &&model.field!='stockCount'
                            &&model.field!='weight'">
                                <el-input class="w192" v-model="info[model.field]"></el-input>   
                          </el-form-item>   
                            <el-form-item :label="model.propertyName" :prop="model.field" 
                            v-if="model.dataType==3&&model.field!='price'&&model.field!='stockCount'&&model.field!='weight'">
                                <el-input class="w192" v-model="info[model.field]"></el-input>   
                          </el-form-item>  
                          <el-form-item :label="model.propertyName" :prop="model.field" 
                                    v-if="model.dataType==4&&model.field!='text'&&model.field!='text1'">
                                          <el-input class="w192" v-model="info[model.field]" type="textarea" ></el-input>
                                    </el-form-item>  
                         
                         <el-form-item :label="model.propertyName" :prop="model.field" 
                                    v-if="model.dataType==5">
                                          <el-date-picker v-model="info[model.field]" 
                                          type="date" 
                                          placeholder="选择日期" 
                                          format="yyyy 年 MM 月 dd 日" 
                                          value-format="yyyy-MM-dd" >                            
                                    </el-date-picker>
                                     </el-form-item> 
                         
          <el-form-item :label="model.propertyName" :prop="model.field" 
                            v-if="model.dataType==7
                            &&model.field!='refBrand'
                            &&model.field!='standardTypeIds'
                            &&model.field!='colorsize'
                            &&model.field!='attr'">
                                   <el-checkbox-group v-model="info[model.field]"  >
                                            <el-checkbox  v-for="item in model.optValue" :key="item" :label="item"></el-checkbox>                        
                                </el-checkbox-group>    
                      </el-form-item> 
                        
                         <el-form-item :label="model.propertyName" :prop="model.field" 
                           v-if="model.dataType==8">
                                     <el-radio-group v-model="info[model.field]" >
                                       <el-radio  v-for="item in model.optValue" :key="item" :label="item">{{item}}</el-radio>
                                </el-radio-group>
                      </el-form-item>                                                          
             </el-col>
            </el-row>
        </el-form>
        <div class="form-bottom-bar">
            <el-button type="warning" @click="saveForm(true)">提交</el-button>           
            <el-button type="info" @click="restForm()">重置</el-button>  
        </div>
    </div>
</template>

<script>
import axios from "axios";
import * as fetch from "@/api/commodity";
import * as untils from "@/untils/global";
import imageUpload from "@/components/uploadImage.vue";
import VueUEditor from "@/components/UEditor";
import colorSizeUpdate from "@/components/colorSizeUpdate";
export default {
  components: {
    VueUEditor,
    imageUpload,
    colorSizeUpdate
  },
  data() {
    var validateInt = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("此项必填"));
      } else {
        let reg = /^[0-9]+$/;
        if (!reg.test(value)) {
          callback(new Error("只能输入正整数"));
        } else {
          callback();
        }
      }
    };
    return {
      loading: false,
      type: this.$route.query.type,
      typeId: this.$route.query.typeId,
      categoryId: this.$route.query.categoryId,
      id: this.$route.query.id,
      infoReady:false,//等待数据加载完成再渲染
      info: {}, //列表
      typeInfo: {},
      imagePath: "",
      modelInfo: [], //模型
      defaultMsg: "",
      ueList: [], //编辑器列表
      fashionSwitchPic: [],
      dataArr: [], //款式组合属性的数组
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
      rules: {
         name: [{required: true,message: "请输入商品名",trigger: "blur"},
        {min:2,max:25,message: "商品名称最短2字符，最长不能超过25个字符",trigger: "blur"}],
        stockCount:[{ validator: validateInt,trigger: "blur"}],
        weight:[{ required: true,validator: validateInt,trigger: "blur"}],
        path: [
          {
            required: true,
            message: "请输入路径",
            trigger: "blur"
          }
        ],
        priority: [
          {
            required: true,
            message: "请输入排序",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    getModelInfo(typeId) {
      //获取模型信息
      let params = {
        typeId: typeId,
        isCategory: false
      };
      fetch.getModelInfo(params).then(res => {
        this.modelInfo = res.body;
        fetch
          .getProductInfo({
            id: this.id
          })
          .then(res2 => {
            this.info = res2.body;
            this.infoReady=true;
            console.log('第一步');
            this.fashionSwitchPic=res2.body.fashionSwitchPic;
            setTimeout(() => {
              this.ueList[0].setContent(this.info.text);
              this.ueList[1].setContent(this.info.text1);
            }, 500);
          });
      });
    },
    getInfo() {
      this.loading = true;
      axios
        .all([
          fetch.getCommodityCategoryInfo({
            id: this.categoryId
          }),
          fetch.getCommodityTopCategory({ id: this.typeId }), //分类
          fetch.getBrandListByCategoryId({ categoryId: this.categoryId })
        ])
        .then(
          axios.spread((typeInfo, parantList, brandList) => {
            this.typeInfo = typeInfo.body;
            this.parantList = parantList.body;
            this.brandList = brandList.body;
            this.loading = false;
          })
        );
    },
    editorReady(ue, index) {
      this.ueList[index] = ue;
      setTimeout(() => {
        this.ueList[0].setContent(this.info.text);
        this.ueList[1].setContent(this.info.text1);
      }, 500);
    },
    getPath(path, index) {
      this.fashionSwitchPic[index] = path;
    },
    getSizeData(obj) {
      this.dataArr = obj;
    },
    saveForm() {
      let params = {}; //构造参数
            for(let key in this.info){
                  if(typeof this.info[key]!='object'){
                       params[key] = this.info[key];
                  }
            }
        params.categoryId=this.categoryId; 
      params.fashionSwitchPic = this.fashionSwitchPic.join(",");
      for (let key in this.dataArr) {
        if (this.dataArr.hasOwnProperty(key)) {      
          params[key] = this.dataArr[key];
        }
      }
     
      params.text = this.ueList[0].getContent(); //第一个编辑器
      params.text1 = this.ueList[1].getContent(); //第二个编辑器
       
      this.$refs["form"].validate(valid => {
        if (valid) {

                  if(this.typeInfo.colorsize){
                      if (!params.paramsState) {
                        this.errorMessage("请在【开启规格】所提供的每种规格中至少选择一项规格属性");
                        return false;
                      }

                        if (!params.pictureState) {
                          this.errorMessage("有图规格必须上传图片");
                          return false;
                        }
                        if (!params.countState) {
                          this.errorMessage("规格的所有属性必须填写");
                          return false;
                        }
                  } 

              this.loading = true;
              fetch.updateProductList(params).then(res => {
                this.loading = false;
                if (res.code == 200) {
                  this.successMessage("修改成功");
                   setTimeout(() => {
                      this.routerLink("/productList", "list");
                    }, 1000);
                }
              });
        }
      });
    },
    restForm() {}
  },
  created: function() {
    this.getModelInfo(this.typeId);
    this.getInfo();
  }
};
</script>

<style>
.w-50 {
  width: 100px;
}
.price-group {
  display: inline-block;
  margin-right: 15px;
}
.price-group label {
  font-size: 14px;
  color: #5a5e66;
  margin-right: 5px;
}
</style>
