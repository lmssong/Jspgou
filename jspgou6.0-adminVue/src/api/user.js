import fetch from '@/untils/fetch'
import path from '@/untils/path'

/**管理员登录**/
 export function userLogin(params){
     debugger;
    return fetch({
        url:path.userLogin,
        method:'post',
        data:params,
        signValidate:true,
        sessionKeyValidate:false
     })
 }
 /*** 获取管理员权限信息*/
  export function getLoginUser(params){
    return fetch({
        url:path.getLoginUser,
        method:'post',
        data:params,
        signValidate:true,
     })
 }
 /**退出登录 */
 export function loginOut(params){
    return fetch({
        url:path.loginOut,
        method:'post',
        data:params,
        signValidate:true,
     })
 }

/**获取用户是否存在 */

export function getUser(params) {
    return fetch({
        url: path.getUser,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


export function pwdUpdate(params) {
    return fetch({
        url: '/api/admin/admin/updpwd',
        method: 'post',
         nonceStr: true,
        data: params,
        signValidate: true,
    })
}

