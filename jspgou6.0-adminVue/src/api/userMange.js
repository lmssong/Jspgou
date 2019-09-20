import fetch from '@/untils/fetch'
import path from '@/untils/path'


/**获取用户信息列表 */

export function getUserList(params){
    return fetch({
        url:path.getUserList,
        method:'post',
        data:params,
        signValidate:true,
     })
 }

 /**获取用户信息 */
export function getUserInfo(params) {
    return fetch({
        url: path.getUserInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

/**添加用户信息 */
export function addUserInfo(params) {
    return fetch({
        url: path.addUserInfo,
        method: 'post',
        data: params,
        nonceStr:true,
        signValidate: true,
    })
}


/**修改用户信息 */
export function updateUserInfo(params) {
    return fetch({
        url: path.updateUserInfo,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}

/**删除用户信息 */
export function deleteUserInfo(params) {
    return fetch({
        url: path.deleteUserInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}






 /**获取用户等级列表 */
export function getRankList(params){
    return fetch({
        url:path.getRankList,
        method:'post',
        data:params,
        signValidate:true,
     })
 } 

 /**获取用户信息 */
export function getRankInfo(params) {
    return fetch({
        url: path.getRankInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


 /**添加用户等级信息 */
export function addRankInfo(params) {
    return fetch({
        url: path.addRankInfo,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}
  /**修改用户等级信息 */
export function updateRankInfo(params) {
    return fetch({
        url: path.updateRankInfo,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}

 /**删除用户等级信息 */
export function deleteRankInfo(params) {
    return fetch({
        url: path.deleteRankInfo,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}

