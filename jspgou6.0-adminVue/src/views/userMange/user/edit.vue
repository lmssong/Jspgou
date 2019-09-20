<template>
    <div class="forum-module" v-loading='loading'>
        <div class="forum-header">
            <span class="forum-name">{{$route.name}}</span>
        </div>
        <el-form label-width="160px" class="table-body" ref="form" :model="info" :rules="rules">
            <el-row class="form-group">
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="会员名">
                        <span>{{info.username}}</span>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="邮箱" prop="email">
                        <el-input class="w192" v-model="info.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="密码" prop="password">
                        <el-input class="w192" v-model="info.password" type="password"></el-input>
                        <label class="gray">不修改请留空</label>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input class="w192" v-model="info.checkPass" type="password"></el-input>
                        <label class="gray">不修改请留空</label>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="会员组">
                        <el-select v-model="info.groupId" placeholder="请选择" class="w192">
                            <el-option v-for="item in rankList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="积分">
                        <el-input class="w192" v-model="info.score"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="是否禁用" :required="true">
                        <el-switch active-text="是" inactive-text="否" v-model="info.disabled">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="more-info" @click="toggleMore()">更多信息<i class="el-icon-caret-bottom"></i></div>
                </el-col>
            </el-row>
            <el-row class="form-group" v-show="moreInfo">
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input class="w192" v-model="info.realName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="性别" prop="gender">
                        <el-radio v-model="info.gender" :label="true">男</el-radio>
                        <el-radio v-model="info.gender" :label="false">女</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker v-model="info.birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" class="w192">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="婚姻状况" prop="marriage">
                        <el-radio v-model="info.marriage" :label="true">已婚</el-radio>
                        <el-radio v-model="info.marriage" :label="false">未婚</el-radio>
    
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="手机">
                        <el-input class="w192" v-model="info.mobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="电话">
                        <el-input class="w192" v-model="info.tel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="毕业院校">
                        <el-input class="w192" v-model="info.schoolTag"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="毕业时间">
                        <el-date-picker v-model="info.schoolTagDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" class="w192">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="是否有车" :required="true">
                        <el-radio v-model="info.isCar" :label="true">是</el-radio>
                        <el-radio v-model="info.isCar" :label="false">否</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="职位">
                        <el-input class="w192" v-model="info.position"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="身份类型" :required="true">
    
                        <el-select v-model="info.userDegreeId" placeholder="请选择" class="w192">
                            <el-option v-for="item in userDegreeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
    
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="教育程度类型" :required="true">
                        <el-select v-model="info.degreeId" placeholder="请选择" class="w192">
                            <el-option v-for="item in degreeIdList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
    
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="收入状况类型" :required="true">
                        <el-select v-model="info.incomeDescId" placeholder="请选择" class="w192">
                            <el-option v-for="item in incomeDescIdList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
    
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="工作年限类型" :required="true">
                        <el-select v-model="info.workSeniorityId" placeholder="请选择" class="w192">
                            <el-option v-for="item in workSeniorityIdList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="家庭成员类型" :required="true">
                        <el-select v-model="info.familyMembersId" placeholder="请选择" class="w192">
                            <el-option v-for="item in familyMembersIdList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>  
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="公司名称">
                        <el-input class="w192" v-model="info.company"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="头像">
                       <el-upload
                            class="avatar-uploader"
                            :action="this.$store.state.sys.upLoadUrl"
                            name="uploadFile"
                            :data='upload.data'
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :on-progress="handleAvatarProgress"
                           >
                           <div class="uploading" v-if="upload.uploading">
                               <el-progress type="circle" :percentage="upload.percent"></el-progress>
                           </div>
                           <div v-if="upload.imageUrl" class="upload-hover-box">
                                <img  :src="upload.imageUrl" class="avatar">
                                <span class="upload-cover">点击修改头像</span>
                           </div>
                         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="住址">
                        <el-input class="w192" v-model="info.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="最喜欢的品牌">
                        <el-input class="w192" v-model="info.favoriteBrand" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="最喜欢的明星">
                        <el-input class="w192" v-model="info.favoriteStar" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="最喜欢的电影">
                        <el-input class="w192" v-model="info.favoriteMovie" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="form-bottom-bar">
            <el-button type="primary" v-if="type=='update'" @click="updateForm()">提交</el-button>
            <el-button type="info" @click="restForm()">重置</el-button>
        </div>
      
    </div>
</template>

<script>
import axios from "axios";
import * as user from "@/api/userMange";
import * as untils from "@/untils/global";
import { getDictTypeId } from "@/api/dict";
export default {
  data() {
    /**验证邮箱 */
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的邮箱地址"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        if (this.info.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (value !== this.info.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: true,
      moreInfo: false,
      type: this.$route.query.type,
      id: this.$route.query.id,
      info: {}, //列表
      rankList: [], //会员组列表
      userDegreeList: [], //身份类型列表
      degreeIdList: [], //教育程度类型列表
      incomeDescIdList: [], //收入类型列表
      workSeniorityIdList: [], //工作年限类型列表
      familyMembersIdList: [], //家庭成员列表
      upload: {//上传相关变量
        url:process.env.FILE_URL,
        imageUrl: "",
        uploading:false,
        percent:0,  
        data: {
          type: "attach",
          appId: this.$store.state.sys.appId,
          sessionKey: localStorage.getItem("sessionKey")
        }
      },
      rules: {
        email: [
          {
            validator: validateEmail,
            trigger: "blur"
          },
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getInfo(id) {
      //有多个请求合并在一起发送统一处理
      axios
        .all([
          user.getUserInfo({
            id: id
          }),
          user.getRankList(),
          getDictTypeId({typeId: 1}), //身份类型
          getDictTypeId({
            typeId: 5
          }), //教育程度类型
          getDictTypeId({
            typeId: 3
          }), //收入类型列表
          getDictTypeId({
            typeId: 4
          }), //工作年限列表
          getDictTypeId({
            typeId: 2
          }) //家庭成员列表
        ])
        .then(
          axios.spread(
            (
              res,
              rank,
              userDegreeList,
              degreeIdList,
              incomeDescIdList,
              workSeniorityIdList,
              familyMembersIdList
            ) => {
              this.info = res.body;
              this.upload.imageUrl=this.upload.url+res.body.avatar;
              this.rankList = this.creatGroup(rank.body);
              this.userDegreeList = this.creatGroup(userDegreeList.body);
              this.degreeIdList = this.creatGroup(degreeIdList.body);
              this.incomeDescIdList = this.creatGroup(incomeDescIdList.body);
              this.workSeniorityIdList = this.creatGroup(
                workSeniorityIdList.body
              );
              this.familyMembersIdList = this.creatGroup(
                familyMembersIdList.body
              );
              this.info.password = ""; //密码处理
              this.info.checkPass = ""; //密码处理
              this.loading = false;
            }
          )
        );
    },
    updateForm(state) {
      //增加
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.aesPwd(); //密码加密
          user.updateUserInfo(this.info).then(res => {
            this.loading = false;
            if (res.code == 200) {
              this.successMessage("修改成功");
              setTimeout(() => {
                this.routerLink("/userList", "list");
              }, 1000);
            } else {
              this.info.password = "";
              this.info.checkPass = "";
            }
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {//上传成功回调
        this.upload.uploading=false;
         this.upload.percent=0;
         if(res.code==200){
              this.upload.imageUrl = URL.createObjectURL(file.raw);
             this.info.avatar=res.body.url;
         }else{
             this.errorMessage('上传失败，请检查文件类型');
         }
    },
    handleAvatarProgress(event, file, fileList){//上传回调
         this.upload.uploading=true;
         this.upload.percent=parseInt(event.percent);
    },
    restForm() {
      //重置
      this.$refs["form"].resetFields();
      this.getInfo(this.id);
    },
    toggleMore() {
      //显示更多
      if (this.moreInfo == true) {
        this.moreInfo = false;
        $(".more-info")
          .find("i")
          .removeClass("el-icon-caret-top")
          .addClass("el-icon-caret-bottom");
      } else {
        $(".more-info")
          .find("i")
          .removeClass("el-icon-caret-bottom")
          .addClass("el-icon-caret-top");
        this.moreInfo = true;
      }
    },
    aesPwd() {
      this.info.password = untils.aesPassword(this.info.password);
      this.info.checkPass = untils.aesPassword(this.info.checkPass);
    },
    creatGroup(params) {
      let arr = [];
      for (let i in params) {
        let obj = {
          value: "",
          label: ""
        };
        obj.label = params[i].name;
        obj.value = params[i].id;
        arr.push(obj);
      }
      return arr;
    }
  },
  watch: {},
  created: function() {
    this.getInfo(this.id);
  }
};
</script>

<style>

</style>
