/**
 * 运营接口方法
 */
import fetch from '@/untils/fetch'
import path from '@/untils/path'


//管理员列表
export function getAdminList(params){
    return fetch({
        url:path.getAdminList,
        method:'post',
        data:params,
        signValidate:true,
     })
 }

 //管理员信息
 export function getAdminInfo(params){
    return fetch({
        url:path.getAdminInfo,
        method:'post',
        data:params,
        signValidate:true,
     })
 }

 //管理员增加
 export function addAdminInfo(params){
    return fetch({
        url:path.addAdminInfo,
        method:'post',
        data:params,
        signValidate:true,
        nonceStr:true
     })
 }

 //管理员删除
 export function deleteAdminInfo(params){
    return fetch({
        url:path.deleteAdminInfo,
        method:'post',
        data:params,
        nonceStr: true,
        signValidate:true,
     })
 }

//管理员更新
export function updateAdminInfo(params){
    return fetch({
        url:path.updateAdminInfo,
        method:'post',
        data:params,
        signValidate:true,
     })
 }

 //角色列表
 export function getRoleList(params){
    return fetch({
        url:path.getRoleList,
        method:'post',
        data:params,
        signValidate:true,
     })
 }

  //角色信息
 export function getRoleInfo(params) {
     return fetch({
         url: path.getRoleInfo,
         method: 'post',
         data: params,
         signValidate: true,
     })
 }

//角色添加
 export function addRoleInfo(params) {
     return fetch({
         url: path.addRoleInfo,
         method: 'post',
         data: params,
         nonceStr: true,
         signValidate: true,
     })
 }
//角色更新
 export function updateRoleInfo(params) {
     return fetch({
         url: path.updateRoleInfo,
         method: 'post',
         data: params,
         nonceStr:true,
         signValidate: true,
     })
 }
 //角色删除 
 export function deleteRoleInfo(params) {
 return fetch({
     url: path.deleteRoleInfo,
     method: 'post',
     data: params,
     signValidate: true,
 })
 }


//优惠卷列表
export function getCouponList(params) {
    return fetch({
        url: path.getCouponList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//优惠卷信息
export function getCouponInfo(params) {
    return fetch({
        url: path.getCouponInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}



//优惠卷添加
export function addCouponInfo(params) {
    return fetch({
        url: path.addCouponInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//优惠卷删除
export function deleteCouponInfo(params) {
    return fetch({
        url: path.deleteCouponInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//优惠卷禁用
export function disabledCouponInfo(params) {
    return fetch({
        url: path.disabledCouponInfo,
        method: 'post',
        data: params,
        nonceStr:true,
        signValidate: true,
    })
}




//在线客服列表
export function getCustomerServiceList(params) {
    return fetch({
        url: path.getCustomerServiceList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//在线客服信息
export function getCustomerServiceInfo(params) {
    return fetch({
        url: path.getCustomerServiceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//在线客服添加
export function addCustomerServiceInfo(params) {
    return fetch({
        url: path.addCustomerServiceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//在线客服x修改
export function updateCustomerServiceInfo(params) {
    return fetch({
        url: path.updateCustomerServiceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//在线客服x删除
export function deleteCustomerServiceInfo(params) {
    return fetch({
        url: path.deleteCustomerServiceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//在线客服排序
export function priorityCustomerServiceInfo(params) {
    return fetch({
        url: path.priorityCustomerServiceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//首页海报信息
export function getPosterList(params) {
    return fetch({
        url: path.getPosterList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//首页海报更新
export function updatePosterInfo(params) {
    return fetch({
        url: path.updatePosterInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//系统操作日志
 export function getLogList(params) {
     return fetch({
         url: path.getLogList,
         method: 'post',
         data: params,
         signValidate: true,
     })
 }



//广告版位列表
export function getAdspaceList(params) {
    return fetch({
        url: path.getAdspaceList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//广告版位信息
export function getAdspaceInfo(params) {
    return fetch({
        url: path.getAdspaceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//广告版位添加
export function addAdspaceInfo(params) {
    return fetch({
        url: path.addAdspaceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//广告版位更新
export function updateAdspaceInfo(params) {
    return fetch({
        url: path.updateAdspaceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//广告版位删除
export function deleteAdspaceInfo(params) {
    return fetch({
        url: path.deleteAdspaceInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//广告版位列表
export function getAdvertiseList(params) {
    return fetch({
        url: path.getAdvertiseList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//广告信息
export function getAdvertiseInfo(params) {
    return fetch({
        url: path.getAdvertiseInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//广告添加
export function addAdvertiseInfo(params) {
    return fetch({
        url: path.addAdvertiseInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//广告更新
export function updateAdvertiseInfo(params) {
    return fetch({
        url: path.updateAdvertiseInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//广告删除
export function deleteAdvertiseInfo(params) {
    return fetch({
        url: path.deleteAdvertiseInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


