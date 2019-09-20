<template>
    <div class="login-bg">
        <div class="canvas-bg">
            <canvas id="root" width="1000" height="525"></canvas>
        </div>
         <img src="./../assets/images/login-logo.png" class="login-logo">
        <el-form class="login-group">
            <el-form-item prop="username">
                <div class="val">
                    <input type="text" autocomplete="off" placeholder="用户名" @blur="requireUserName" v-model="params.userName" @keyup.enter="login" class="login-input user">
                    <label id="userName"></label>
                </div>
            </el-form-item>
            <el-form-item prop="pwd">
                <div class="val">
                    <input type="password" autocomplete="off" placeholder="密码" @keyup="changePwd" @blur="requirePwd" v-model="params.passWord" class="login-input pwd" @keyup.enter="login">
                    <label id="pwd"></label>
                </div>
            </el-form-item>
        </el-form>
        <div class="sub-group">
            <el-button :loading="loading" @click="login" class="login-input login-btn">{{loginFont}}</el-button>
        </div>
        <div class="bottom-font">
            <p>ICP备案号：赣ICP备13005266号</p>
            <p>Powered by JeeCms Copyright © 2007-2017 www.jeecms.com, All Rights Reserved</p>
        </div>
    </div>
</template>

<script>
import CanvasAnimate from "../plugs/canvas";
export default {
  data() {
    return {
      params: {
        userName: "",
        passWord: ""
      },
      loginFont: "登录",
      loading: false
    };
  },
  methods: {
    requireUserName() {
      if (this.params.userName == "") {
        $("#userName")
          .addClass("error")
          .text("请填写用户名");
      } else {
        $("#userName")
          .removeClass("error")
          .text(" ");
      }
    },
    requirePwd() {
      if (this.params.passWord == "") {
        $("#pwd")
          .addClass("error")
          .text("请填写密码");
        $("#login").css("background", "#ebcd41");
      } else {
        $("#pwd")
          .removeClass("error")
          .text(" ");
        $("#login").css("background", "#fee300");
      }
    },
    changePwd() {
      $("#pwd")
        .removeClass("error")
        .text(" ");
    },
    login() {
      if (this.params.userName == "" || this.params.passWord == "") {
        this.requireUserName();
        this.requirePwd();
      } else {
        this.loginFont = "登录中";
        this.loading = true;
        debugger;
        // this.$router.addRoutes(this.$store.state.perms.addRouters);
        // this.$router.push("/work");
        // return;
        this.$store.dispatch("userLogin", this.params).then(res => {
          
          this.loginFont = "登录";
          this.loading = false;
          debugger;
          
          if (res.code == 200) {
            this.$store.dispatch("setRouters").then(() => {
              this.$router.addRoutes(this.$store.state.perms.addRouters);
              this.$router.push("/work");
            });
          } else {
              if(res.code=='306'){
                  $("#pwd")
                    .addClass("error")
                    .text("密码或用户不正确");
              }
          }
        });
      }
    },
    canvas() {
      //背景样式
      var root = document.querySelector("#root");
      var a = new CanvasAnimate(root, {
        length: 15,
        clicked: false,
        moveon: true
      });
      a.Run();
    }
  },
  mounted: function() {
    this.canvas();
  }
};
</script>

<style>
.login-bg {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background: #188ae2;
  transition: 0.5s;
}

.canvas-bg {
  width: 1000px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -500px;
  margin-top: -250px;
  text-align: center;
  z-index: 10;
}

.canvas-bg canvas {
  position: relative;
  z-index: 8;
}

.login-logo {
  position: relative;
  z-index: 999;
  display: block;
  margin: 50px auto 48px auto;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.val {
  position: relative;
  width: 320px;
  height: 44px;
  line-height: 44px;
  margin: 0 auto;
}

.val label {
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 999;
  color: #ff0000;
  transition: 0.25s right linear;
  transform: translate(0, 0);
  font-size: 12px;
}

.val label.error {
  right: 48px;
  transition: 0.5s right;
}

@media screen and (min-width: 1366px) {
  .login-logo {
    margin: 10% auto 48px auto;
  }
}

@media screen and (min-width: 1440px) {
  .login-logo {
    margin: 15% auto 48px auto;
  }
}

@media screen and (min-width: 1920px) {
  .login-logo {
    margin: 20% auto 48px auto;
  }
}

.login-input {
  position: relative;
  z-index: 999;
  width: 320px;
  height: 44px;
  
  border-radius: 44px;
  outline: none;
  border: none;
  background: #e6f4ff;
  padding-left: 30px;
  font-size: 14px;
}

.user {
  background: #e6f4ff url(./../assets/images/user-login.png) 275px center
    no-repeat;
}

.user:focus {
  background: #fff url(./../assets/images/user-login.png) 275px center no-repeat;
}

.pwd {
  background: #e6f4ff url(./../assets/images/user-pwd.png) 275px center
    no-repeat;
}

.pwd:focus {
  background: #fff url(./../assets/images/user-pwd.png) 275px center no-repeat;
}

.login-btn {
  background: #ebcd41;
  color: #000;
  padding: 0  ;
   cursor: pointer;
}

.login-btn:hover{
   background: #ebcd41 !important;
   color: #000 !important;
}
.login-btn:active{
  background: #ebcd41 !important;
   color: #000 !important;
}
.login-btn:focus{
   background: #ebcd41 !important;
   color: #000 !important;
}

.login-group {
  text-align: center;
}



.sub-group {
  text-align: center;
  margin: 0 auto;
}

.bottom-font {
  position: absolute;
  width: 100%;
  bottom: 52px;
  font-size: 12px;
  text-align: center;
  color: #0871c2;
  z-index: 9999;
}

.bottom-font p {
  line-height: 2;
}

.loadingLogin {
}
</style>
