<template>
  <div class="forum-module"  v-loading="loading">
        <div class="forum-header">
            <span class="forum-name">首页海报</span>
        </div>
        <div class="table-top-bar clearfix" >
            <div class="query-inline-box flex-between">
                <el-button type="primary" @click="addPoster">添加海报</el-button>      
            </div>
        </div>
       <el-form ref="form" :model="items" label-width="120px">
                <div class="poster-24">
                    <div  v-for="(item,index) in items.domains" :key="index" class="poster-flex"> 
                            <div class="w-135">海报{{index+1}}:</div>
                            <div class="pic-flex">
                                <label> 图片:</label>  
                                <imageUpload  @getPath="getPath" 
                                :path="item.picUrl" 
                                :index='index'></imageUpload>
                            </div>
                            <div class="pic-flex">
                                   <el-form-item label="链接地址"
                                   :prop="'domains.' + index + '.interUrl'"
                                   :rules="{required: true, message: '链接地址不能为空', trigger: 'blur'}"
                                   
                                    >
                                        <el-input v-model="item.interUrl"></el-input>
                                      </el-form-item>
                              
                               
                            </div>
                    </div>
                </div>
       </el-form>
         <el-button type="primary" @click="updatePoster" class="updatePoster">提交</el-button>      
        
    </div>
</template>

<script>
import * as fetch from "@/api/operation";
import imageUpload from "@/components/uploadImage.vue";
export default {
  components: { imageUpload },
  data() {
    return {
      loading: true, //提示变量
      items: {
        domains: []
      }, //列表通用变量
      ids: "",
      params: {
        pageNo: 1,
        pageSize: 10
      },
      disabled: true, //禁用
      pagination: {
        //分页参数
        total: 0,
        currentPage: 1,
        changePageSize: localStorage.getItem("PageSize")
      }
    };
  },
  methods: {
    getPosterList() {
      fetch.getPosterList().then(res => {
        this.items.domains = res.body;
        this.loading = false;
      });
    },
    getPath(path, index) {
      this.items.domains[index].picUrl = path;
    },
    addPoster() {
      let obj = {
        id: 0,
        picUrl: "",
        interUrl: ""
      };
      this.items.domains.unshift(obj);
    },
    updatePoster() {
     
      let params = {
        ids: [],
        picUrls: [],
        interUrls: []
      };
      for (let i in this.items.domains) {
        params.ids.push(this.items.domains[i].id);
        params.picUrls.push(this.items.domains[i].picUrl);
        params.interUrls.push(this.items.domains[i].interUrl);
      }
      params.ids = params.ids.join(",");
      params.picUrls = params.picUrls.join(",");
      params.interUrls = params.interUrls.join(",");
      this.$refs["form"].validate(valid => {
        if (valid) {
             this.loading = true;
          fetch.updatePosterInfo(params).then(res => {
            if (res.code == 200) {
              this.loading = false;
              this.successMessage("添加成功");
              setTimeout(() => {
                this.getPosterList();
              }, 1000);
            }
          });
        }
      });
    }
  },
  created: function() {
    this.getPosterList(); //拉去数据
  }
};
</script>

<style scoped>
.poster-24 {
  border-top: 1px solid #eee;
  padding: 0 24px;
  font-size: 14px;
  color: #5a5e66;
}
.poster-flex {
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #efefef;
}
.w-135 {
  width: 135px;
  font-size: 14px;
  color: #5a5e66;
}
.pic-flex {
  display: flex;
  align-items: center;
  margin-right: 85px;
}
.pic-flex > label {
  margin-right: 10px;
  white-space: nowrap;
}
.updatePoster {
  margin: 32px 0;
  margin-left: 205px;
}
</style>

