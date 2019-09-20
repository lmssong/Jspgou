import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import { Encrypt } from "@/untils/aes";
/**
 *  全局通用的方法
 */

//页面跳转方法
/**
 * path 路径
 * type：添加修改 save，update
 * id
 */
Vue.prototype.routerLink=function(path,type,id){
      router.push(
            {
                path:path,
                query:{
                type:type,
                noce_str:Math.random()*100,
                id:id||0
            }
            }
        )
  }

  Vue.prototype.successMessage=function(value){
    this.$message({
        showClose: true,
        message: value,
        type: 'success',
        duration:1000
      });
    }
  Vue.prototype.errorMessage = function (value) {
      this.$message({
          showClose: true,
          message: value,
          type: 'error',
          duration: 4000
      });
  }
Vue.prototype.test = {
    required: { trigger: "blur", required: true,message:'该项为必填项'}
}


/**字符串转数组 */
 export function strToNumberArr(str){
    let num=[]
     if(str==null||str==''){
        return num;
     }else{
        let arr=str.split(',');       
        for(let i in arr){
            num.push(parseInt(arr[i]));
        } 
        return num;
     } 
 }

 /**密码加密方法 */
 export function aesPassword(pwd){
   let aes= Encrypt(pwd, store.state.sys.aesKey, store.state.sys.ivKey);//加密
   return aes;
 }