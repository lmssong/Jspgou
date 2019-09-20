<template>
  <div class="forum-module" v-loading='loading'>
      <iframe :src="tmplateUrl" frameborder="0" width="100%" height="800"></iframe>
  
  </div>
</template>

<script>
import * as fetch from "@/api/set";
import imageUpload from "@/components/uploadImage.vue";
export default {
   components: { imageUpload },
  data() {
    return {
      loading: false,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {}, //列表
      tmplateUrl:'',
      typeList: [],
      pathUrl: "",
      rules: {
        name: [{required: true, message: "请输入名称",trigger: "blur"}],
        logisticsType: [{required: true, message: "此项必填",trigger: "change"}],
        logisticsId: [{required: true, type:'number', message: "此项必填",trigger: "change"}],
        priority:[{required: true,type:'number', message: "请输入数字排序",trigger: "blur"}],
      }
    };
  },
  methods: {
    getInfo(id) {
      fetch
        .getLogisticsInfo({
          id: id
        })
        .then(res => {
          this.info = res.body;
          if(this.type=='save'){
              
          }
           
          this.loading = false;
        });
      fetch.getLogisticsList().then(res => {
        this.typeList = res.body;
      });
    },
  getPath(path){
        this.info.logoPath=path;
        this.pathUrl=path;
    },
    updateForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          fetch.updateLogisticsInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/logistics", "list");
              }, 1000);
            }
          });
        }
      });
    },
    saveForm(state) {
      //增加

      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;

          fetch.addLogisticsInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("添加成功");
              if (state) {
                this.getInfo(this.id);
                 this.pathUrl='';
              } else {
                setTimeout(() => {
                  this.routerLink("/logistics", "list");
                }, 1000);
              }
            }
          });
        }
      });
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      this.getInfo(this.id);
      this.pathUrl='';
    }
  },
  created: function() {
      if(this.$route.query.type){
        this.tmplateUrl= process.env.FILE_URL+'/api/admin/logistics/v_courierEdit?id='+this.$route.query.id+'&appId='+this.$store.state.sys.appId;
      }else{
          this.tmplateUrl= process.env.FILE_URL+'/api/admin/logistics/v_courierAdd?id='+this.$route.query.id+'&appId='+this.$store.state.sys.appId;
      }
     
  }
};
</script>

<style>

</style>
