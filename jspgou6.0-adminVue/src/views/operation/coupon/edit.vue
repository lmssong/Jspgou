<template>
  <div class="forum-module" v-loading='loading'>
        <div class="forum-header">
          <span class="forum-name">{{$route.name}}</span>
           <div class="pull-right">
                <el-button class="back" @click="routerLink('/coupon','list');">返回列表</el-button>
            </div>

        </div>
            <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
              <el-row class="form-group">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" >
                      <el-form-item label="优惠卷名称" prop="couponName" >
                        <el-input class="w192" v-model="info.couponName" :minlength="2" :maxlength="50"></el-input>
                      </el-form-item>
                  </el-col>
                   <el-col :xs="24"  :sm="24" :md="12" :lg="12" >
                      <el-form-item label="开始时间" prop="couponTime">
                       
                         <el-date-picker
                         class="w192" 
                           v-model="info.couponTime" 
                              type="datetime"
                               value-format="yyyy-MM-dd HH:mm:ss"
                                
                         placeholder="选择开始时间">
                    </el-date-picker>

                      </el-form-item>
                  </el-col>
                   <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="结束时间" prop="couponEndTime" >
                        
                         <el-date-picker
                        class="w192" v-model="info.couponEndTime"
                              type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerOptions2"
                         placeholder="选择结束时间">
                    </el-date-picker>
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="规则">
                                <div style="display:inline-block">满&nbsp;<el-input class="w50" type='number' min="0" v-model="info.leastPrice"></el-input> &nbsp;元</div>
                                 <div style="display:inline-block;margin-left:10px;">减 &nbsp;<el-input class="w50" type='number' min="0" v-model="info.couponPrice"></el-input>&nbsp;元</div>
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="发放数量"  prop="couponCount">
                        <el-input class="w192" v-model.number="info.couponCount" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="是否启用">
                          <el-radio :label="true" v-model="info.isusing">是</el-radio>
                          <el-radio :label="false"  v-model="info.isusing">否</el-radio>
                      </el-form-item>
                  </el-col>
                   <el-col :xs="24" :sm="24" :md="12" :lg="12" >
                      <el-form-item label="选择适用分类" :required="true">
                          <el-select filterable placeholder="请选择" v-model="info.categoryId" class="w192">
                            <el-option label="所有分类" value=''></el-option>
                            <el-option v-for="item in parantList" :key="item.id" :label="item.categoryName" :value="item.id">
                                <span :style="{paddingLeft:item.leval*10+'px'}" v-if="item.leval>1">>{{item.categoryName}}</span>
                                <span :style="{paddingLeft:item.leval*10+'px'}" v-else>{{item.categoryName}}</span>
                            </el-option>
                        </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" >
                      <el-form-item label="优惠卷图片">
                            <imageUpload  @getPath="getPath" :path="pathUrl"></imageUpload>
                      </el-form-item>
                  </el-col>  
                   <el-col :xs="24" :sm="24" :md="24" :lg="24" >
                      <el-form-item label="活动说明">
                          <el-input  type="textarea" v-model="info.comments" :rows="8" class="w192"></el-input>
                      </el-form-item>
                  </el-col>       
              </el-row>               
            </el-form>
           <div class="form-bottom-bar">
              <el-button type="warning" v-if="type=='save'"  @click="saveForm(true)">提交并继续添加</el-button>
              <el-button type="primary" v-if="type=='save'" @click="saveForm(false)">添加</el-button>
              <el-button type="info" @click="restForm()">重置</el-button>
               <div class="help-info" v-if="type=='save'">选择“提交并继续添加”按钮会停留在添加页面；选择“添加”按钮后将跳转到对应的列表页。</div>
             </div>   
            
    </div>
</template>

<script>
import axios from "axios";
import * as fetch from "@/api/operation";
  import * as commodity from "@/api/commodity";
import * as untils from "@/untils/global";
  import imageUpload from '@/components/uploadImage.vue'
export default {
     components: { imageUpload },
  data() {
    return {
      loading: true,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {
        couponTime:'',
        couponEndTime:''
      }, //列表
      roleItems: [],
      pathUrl:'',
    
      parantList: [],
      rules: {
        couponName: [{ required: true, message: "请输入优惠卷名", trigger: "blur" }],
        couponEndTime:[{ required: true, message: "请输入截止时间", trigger: "blur" }],
        couponTime:[{ required: true, message: "请输入开始时间", trigger: "blur" }],
      },
       pickerOptions2:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          }

       }  
    };
  },
  methods: {
   
    getInfo(id) {
      //有多个请求合并在一起发送统一处理
      axios.all([fetch.getCouponInfo({ id: id }),commodity.getCommodityTopCategory()]).then(
        axios.spread((res,parantList) => {
          this.info = res.body;
           this.info.isusing=true;
            this.parantList = parantList.body;
          this.loading = false;
        })
      );
    },
    getPath(path){
        this.info.couponPicture=path;
        this.pathUrl=path;
    },
    saveForm(state) {//增加
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading=true;
            fetch.addCouponInfo(this.info).then(res=>{
              this.loading=false;
              if(res.code==200){
                this.successMessage('添加成功');
                    if(state){                      
                       this.getInfo(0);
                         this.pathUrl='';
                    }else{
                      setTimeout(()=>{
                        this.routerLink('/coupon','list');
                      },1000)  
                    }               
              }
            })
          } 
        });
    },
    restForm() {//重置
         this.$refs['form'].resetFields();
         this.getInfo(0);
         this.pathUrl='';
       
    },
  
  },
  watch: {
    selectRole(newVal, oldVal) {
      let str = newVal.join(",");
      this.info.roleIds = str;
    } 
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
