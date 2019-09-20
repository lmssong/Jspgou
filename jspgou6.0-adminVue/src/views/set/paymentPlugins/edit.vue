<template>
  <div class="forum-module" v-loading='loading'>
    <div class="forum-header">
      <span class="forum-name">{{$route.name}}</span>
      <div class="pull-right">
                <el-button class="back" @click="routerLink('/paymentPlugins','list');">返回列表</el-button>
            </div>
    </div>
    <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
      <el-row class="form-group">

        <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="名称:"  prop="name">
            <el-input class="w192" v-model="info.name"></el-input>
          </el-form-item>
         </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="排列顺序:" prop="priority" >
            <el-input class="w192" v-model.number="info.priority" type="number"></el-input>
          </el-form-item>
         </el-col>

        <!--微信扫码支付-->
          <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='weChatPayment'">       
          <el-form-item label="合作身份者appid:" prop="partner" >
            <el-input class="w192" v-model="info.partner"  type="password"></el-input>
          </el-form-item>
         </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='weChatPayment'">       
          <el-form-item label="商户密钥:" prop="sellerKey" >
            <el-input class="w192" v-model="info.sellerKey" type="password"></el-input>
          </el-form-item>
         </el-col> 
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='weChatPayment'">       
          <el-form-item label="微信商户号:" prop="sellerEmail" >
            <el-input class="w192" v-model="info.sellerEmail" type="password"></el-input>
          </el-form-item>
         </el-col>  
      <!--支付宝及时支付-->
  <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipay'">       
          <el-form-item label="合作身份者ID:" prop="partner" >
            <el-input class="w192" v-model="info.partner"  type="password"></el-input>
          </el-form-item>
         </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipay'">       
          <el-form-item label="交易安全检验码:" prop="sellerKey" >
            <el-input class="w192" v-model="info.sellerKey" type="password"></el-input>
          </el-form-item>
         </el-col> 
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipay'">       
          <el-form-item label="签约支付宝账号:" prop="sellerEmail" >
            <el-input class="w192" v-model="info.sellerEmail" type="password"></el-input>
          </el-form-item>
         </el-col>  
 <!--微信公众号支付-->
  <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='weChatPublicPay'">       
          <el-form-item label="合作身份者appid:" prop="partner" >
            <el-input class="w192" v-model="info.partner"  type="password"></el-input>
          </el-form-item>
         </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='weChatPublicPay'">       
          <el-form-item label="微信商户号:" prop="sellerEmail" >
            <el-input class="w192" v-model="info.sellerEmail" type="password"></el-input>
          </el-form-item>
         </el-col> 
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='weChatPublicPay'">       
          <el-form-item label="商户支付密钥:" prop="sellerKey" >
            <el-input class="w192" v-model="info.sellerKey" type="password"></el-input>
          </el-form-item>
         </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='weChatPublicPay'">       
          <el-form-item label="公众号密钥:" prop="publicKey" >
            <el-input class="w192" v-model="info.publicKey" type="password"></el-input>
          </el-form-item>
         </el-col>
 <!--支付宝移动端网页支付-->
 <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayMobile'">       
          <el-form-item label="合作身份者ID:" prop="partner" >
            <el-input class="w192" v-model="info.partner"  type="password"></el-input>
          </el-form-item>
         </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayMobile'">       
              <el-form-item label="应用appid:" prop="publicKey" >
                <el-input class="w192" v-model="info.publicKey" type="password"></el-input>
              </el-form-item>
         </el-col> 
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayMobile'">       
          <el-form-item label="支付宝公钥:" prop="sellerEmail" >
            <el-input class="w192" v-model="info.sellerEmail" type="password"></el-input>
          </el-form-item>
         </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayMobile'">       
          <el-form-item label="开发者应用私钥:" prop="sellerKey" >
            <el-input class="w192" v-model="info.sellerKey" type="password"></el-input>
          </el-form-item>
         </el-col>
 <!--支付宝转账给个人-->
  <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayToaccountTransfer'">       
          <el-form-item label="appid:" prop="partner" >
            <el-input class="w192" v-model="info.partner"  type="password"></el-input>
          </el-form-item>
         </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayToaccountTransfer'">       
              <el-form-item label="应用appid:" prop="sellerKey" >
                <el-input class="w192" v-model="info.sellerKey" type="password"></el-input>
              </el-form-item>
         </el-col> 
         <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayToaccountTransfer'">       
          <el-form-item label="私钥:" prop="sellerEmail" >
            <el-input class="w192" v-model="info.sellerEmail" type="password"></el-input>
          </el-form-item>
         </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="24" v-if="info.code=='alipayToaccountTransfer'">       
          <el-form-item label="公钥:" prop="publicKey" >
            <el-input class="w192" v-model="info.publicKey" type="password"></el-input>
          </el-form-item>
         </el-col>


         <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="是否禁用:" prop="disabled" >
           <el-radio v-model="info.disabled" :label="true">是</el-radio>
                <el-radio v-model="info.disabled" :label="false">否</el-radio>
          </el-form-item>
         </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">       
          <el-form-item label="是否默认:" prop="name">
           <el-radio v-model="info.isDefault" :label="true">是</el-radio>
                <el-radio v-model="info.isDefault" :label="false">否</el-radio>
          </el-form-item>
         </el-col>

          <!-- 微博-->
         <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="描述:"  >
                <VueUEditor @ready="editorReady"></VueUEditor>
            </el-form-item>
        </el-col>   
        
   

    
      </el-row>
    </el-form>
    <div class="form-bottom-bar">
      <el-button type="primary"  @click="updateForm()">修改</el-button>
      <el-button type="info" @click="restForm()">重置</el-button>
    </div>
  </div>
</template>

<script>
import VueUEditor from "@/components/UEditor";
import * as fetch from "@/api/set";

export default {
  components: {
    VueUEditor
  },
  data() {
    return {
      loading: true,
      info: {}, //列表
      UE: "",
      type: this.$route.query.type,
      id: this.$route.query.id,
      rules: {
        name:[{required:true,trigger: "blur",message: "此项必填",}],
       priority:[{required:true,type:'number', trigger: "blur",}],
       partner:[{required:true,trigger: "blur", message: "此项必填",}],
        sellerEmail:[{required:true,trigger: "blur", message: "此项必填",}],
         sellerKey:[{required:true,trigger: "blur", message: "此项必填",}],
      }
    };
  },
  methods: {
      editorReady(editorInstance,index) {
        this.UE=editorInstance;
         setTimeout(() => {
            this.UE.setContent(this.info.description);  
         }, 500);
      },
    getInfo(id) {
      fetch.getPaymentPluginsInfo({id:id}).then(res => {
        this.info = res.body;
      });
      this.loading = false;
    },
    updateForm() {
      //增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch
.updatePaymentPluginsInfo(this.info)
            .then(res => {
              this.loading = false;
              if (res.code == 200) {
                this.successMessage("修改成功");
              }
            })
            .catch(error => {
              this.errorMessage("执行异常");
              this.loading = false;
            });
        }
      });
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      this.getInfo();
    }
  },
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
