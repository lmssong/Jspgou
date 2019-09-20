<template>
  <div class="forum-module" v-loading='loading'>
        <div class="forum-header">
          <span class="forum-name">{{$route.name}}</span>
        </div>
            <el-form label-width="160px" class="table-body" ref="form" :model="roleInfo" :rules="rules">
              <el-row class="form-group">
                   <el-col :xs="24"  :sm="24" :md="12" :lg="12" >
                      <el-form-item label="角色名" prop="name">
                            <el-input class="w192" v-model="roleInfo.name"></el-input>    
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24"  :sm="24" :md="12" :lg="12" >
                      <el-form-item label="排列顺序" prop="priority">
                            <el-input class="w192" v-model="roleInfo.priority" type="number"></el-input>    
                      </el-form-item>
                  </el-col>
                  <el-col :xs="24"  :sm="24" :md="24" :lg="24" >
                      <el-form-item label="是否拥有所有权限" :required="true">
                             <el-switch active-text="是" inactive-text="否" v-model="roleInfo.super">
                        </el-switch>
                      </el-form-item>
                  </el-col> 
                    <el-col :xs="24"  :sm="24" :md="24" :lg="24" >
                      <el-form-item label="权限">
                             <ul id="treeDemo" class="ztree"></ul>
                        </el-switch>
                      </el-form-item>
                  </el-col>            
              </el-row>               
            </el-form>
           <div class="form-bottom-bar">
                <el-button type="warning" v-if="type=='save'" @click="addRoleInfo(true)">保存并继续添加</el-button>   
                <el-button type="primary" v-if="type=='save'" @click="addRoleInfo(false)">添加</el-button>          
              <el-button type="primary" v-if="type=='update'" @click="updateRoleInfo()">提交</el-button>
              <el-button type="info" @click="restForm()">重置</el-button>
               <div class="help-info" v-if="type=='save'">选择“提交并继续添加”按钮会停留在添加页面；选择“添加”按钮后将跳转到对应的列表页。</div>
             </div>   
            
    </div>
</template>

<script>
import axios from "axios";
import * as fetch from "@/api/operation";
import * as untils from "@/untils/global";
import roles from "@/router/roles";
export default {
  data() {
    return {
      type: this.$route.query.type,
      id: this.$route.query.id,
      loading: true,
      roleInfo: {},
      rolesList: [],
      perms: [],
      rules: {
        name: [{ required: true, message: "请输入一个角色名", trigger: "blur" }],
        priority: [
          {
            type: "number",
            required: true,
            message: "请输入数字排列顺序",
            trigger: "blur"
          }
        ]
      },
      roleList: roles, //角色表
      treeObj: {},
      zNodes: roles,
      setting: {
        //配置
        check: {
          enable: true
        },
        data: {},
        callback: {
          onClick: this.onShow,
          onCheck: this.creatRoles //获取点击的name
        },
        view: {
          dblClickExpand: false //屏蔽掉双击事件
        }
      }
    };
  },
  methods: {
    getRoleInfo(id) {
      //获取系统信息
      fetch
        .getRoleInfo({ id: id })
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.roleInfo = res.body;
            this.showRoles(res.body.perms);
            let indexNode = this.treeObj.getNodesByParam("role", "index"); //锁定首页权限
            this.treeObj.checkNode(indexNode[0], true, false, true);
            this.treeObj.setChkDisabled(indexNode[0], true);
            let type = this.$route.query.type;
            if (type == "save") {
              this.roleInfo.priority = 10;
            }
            for (let i in this.rolesList) {
              let tmpNode = this.treeObj.getNodesByParam("role",
                this.rolesList[i]
              );
              if (tmpNode.length > 0) {
                this.treeObj.checkNode(tmpNode[0], true, false, true);
              }
            }
          } else {
            this.loading = false;
          }
        })
        .catch(res => {
          this.loading = false;
          this.$message.error("网络异常");
        });
    },
    clockPerms(role) {
      //锁定权限
      let index = [];
      let perms;
      let indexNode = this.treeObj.getNodesByParam("role", "index"); //锁定首页权限
      this.treeObj.checkNode(indexNode[0], true, false, true);
      this.treeObj.setChkDisabled(indexNode[0], true);
      index.push(indexNode[0].role);
      for (let i in indexNode[0].api) {
        index.push(indexNode[0].api[i]);
      }
      perms = index.concat(role);
      perms = perms.join(",");
      return perms;
    },
    onShow(e, treeId, treeNode) {
      //单击显示
      this.treeObj.expandNode(treeNode);
    },
    creatRoles(event, treeId, treeNode) {
      //构造权限
      let role = [];
      let nodes = this.treeObj.getCheckedNodes(true);
      for (let i in nodes) {
        role.push(nodes[i].role);
        if (nodes[i].api != undefined) {
          for (let j in nodes[i].api) {
            let rep_str = nodes[i].api[j];
            role.push(rep_str);
          }
        }
      }
      this.perms = role;
    },
    showRoles(roleStr) {
      let roleArr = roleStr.split(",");
      this.rolesList = roleArr;
    },
    updateRoleInfo() {
      //修改角色信息
      this.$refs['form'].validate(valid => {
        if (valid) {
          let params = this.roleInfo;
          params.perms = this.clockPerms(this.perms);
          fetch
            .updateRoleInfo(params)
            .then(res => {
              if (res.code == 200) {
                this.successMessage("修改成功");
                setTimeout(() => {
                  this.routerLink("/role", "list");
                }, 1000);
              }
            })
            .catch(res => {});
        } else {
          return false;
        }
      });
    },
    addRoleInfo(state) {
      //修改角色信息
      this.$refs["form"].validate(valid => {
        document.querySelector("#main").scrollTop = 0;
        if (valid) {
          //非空不修改
          let params = this.roleInfo;
          params.perms = this.clockPerms(this.perms);
          fetch.addRoleInfo(params).then(res => {
            if (res.code == 200) {
              this.successMessage("添加成功");
              if (state) {
                this.getRoleInfo(this.id);
              } else {
                setTimeout(() => {
                  this.routerLink("/role", "list");
                }, 1000);
              }
            }
          });
        } else {
          document.querySelector("#main").scrollTop = 0;
          return false;
        }
      });
    }
  },
  created: function() {
    this.loading = true;
    let type = this.$route.query.type;
    let id = this.$route.query.id;
    let self = this;
    $(document).ready(function() {
      self.setting.check.chkboxType = { Y: "ps", N: "ps" };
      self.treeObj = $.fn.zTree.init($("#treeDemo"), self.setting, self.zNodes);
      if (type == "save") {
        self.getRoleInfo(id);
      } else if (type == "update") {
        self.getRoleInfo(id);
      }
    });
  },
  watch: {
    $route: function(to, from) {
      this.loading = true;
      let id = this.$route.query.id;
      this.getRoleInfo(id);
    }
  }
};
</script>

<style>

</style>
