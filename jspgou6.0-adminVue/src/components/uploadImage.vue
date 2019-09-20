<template>
    <div style=" position:relative;" class="gou-upload">
    <el-upload class="avatar-uploader" :action="this.$store.state.sys.upLoadUrl" name="uploadFile" :data='upload.data' :show-file-list="false" :on-success="handleAvatarSuccess" :on-progress="handleAvatarProgress">
                            <div class="uploading" v-if="upload.uploading">
                                <el-progress type="circle" :percentage="upload.percent"></el-progress>
                            </div>
                            <div v-if="upload.imageUrl" class="upload-hover-box">
                                <img :src="upload.imageUrl" class="avatar">
                                      <span class="upload-cover" v-if="upload.imageUrl">点击修改图片</span>
                            </div>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      
                          <i class="iconfont bbs-delete pos-del" title="删除" @click.prevent="delImg" v-if="upload.imageUrl"></i>
                         
                        </div>
</template>

<script>
export default {
   name: 'imageUpload',
   props:{
       path:{
            type: String,
            default: ''
       },
       index:{
           type:Number,
           default:0
       }
   },
    data(){
        return{
      upload: {
        //上传相关变量
        url: process.env.FILE_URL,
        imageUrl: "",
        uploading: false,
        percent: 0,
        data: {
          type: "image",
          appId: this.$store.state.sys.appId,
          sessionKey: localStorage.getItem("sessionKey")
        }
      }
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
      //上传成功回调
      this.upload.uploading = false;
      this.upload.percent = 0;
      if (res.code == 200) {
        this.upload.imageUrl = URL.createObjectURL(file.raw);   
        this.$emit('getPath',res.body.url,this.index);
      } else if(res.code==209) {
        this.errorMessage("无上传权限");
         this.$emit('getPath','',this.index);
      }else{
                this.errorMessage("上传失败，请检查文件类型");
                  this.$emit('getPath','',this.index);
      }
    },
    handleAvatarProgress(event, file, fileList) {
      //上传回调
      this.upload.uploading = true;
      this.upload.percent = parseInt(event.percent);
    },
    delImg(){
        this.upload.imageUrl='';
         this.$emit('getPath','',this.index);
    }
    },
    created(){
       
        if(this.path==''||this.path==null){
            this.upload.imageUrl=''
        }else{
               
               if(this.path.indexOf('http://')>=0){
                   this.upload.imageUrl=this.path;
               }else{
                this.upload.imageUrl= this.upload.url+this.path;
               }
            
        }
    },
    watch:{
        path(newVal,oldVal){
            if(this.path==''||this.path==null){
            this.upload.imageUrl=''
                }else{
                    this.upload.imageUrl= this.upload.url+this.path;
                }
        }
    }
}
</script>

<style scoped>
.gou-upload{
    width: 178px;
}
    .pos-del{
        position:absolute;
        width: 45px;
        height: 45px;
        color: #fff;
        cursor: pointer;
        top: 0;
        right: 0;
         font-size: 25px;
         display: none;
         z-index: 15;
         text-align: center;
    }
    .gou-upload:hover .upload-cover{
        display: block;
    }
    .gou-upload:hover .pos-del{
            display: block;
    }
</style>
