import fetch from '@/untils/fetch'
import path from '@/untils/path'


//获取api接口信息列表
export function getApiInfoList(params) {
    return fetch({
        url: path.getApiInfoList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//删除api接口信息
export function deleteApiInfo(params) {
    return fetch({
        url: path.deleteApiInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//更新api接口信息
export function updateApiInfo(params) {
    return fetch({
        url: path.updateApiInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//添加api接口信息
export function addApiInfo(params) {
    return fetch({
        url: path.addApiInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//获取api接口信息
export function getApiInfo(params) {
    return fetch({
        url: path.getApiInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//api账户列表
export function getApiAccountList(params) {
    return fetch({
        url: path.getApiAccountList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//api账户信息
export function getApiAccountInfo(params) {
    return fetch({
        url: path.getApiAccountInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//api账户添加
export function addApiAccountInfo(params) {
    return fetch({
        url: path.addApiAccountInfo,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}
//修改api独立密码
export function updateApiPassword(params) {
    return fetch({
        url: path.updateApiPassword,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//校验独立密码
export function checkApiPassword(params) {
    return fetch({
        url: path.checkApiPassword,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}






//获取api接口调用记录列表 
export function getApiRecordList(params) {
    return fetch({
        url: path.getApiRecordList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//删除api接口调用记录列表 
export function deleteApiRecordInfo(params) {
    return fetch({
        url: path.deleteApiRecordInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//获取FTP管理列表
export function getFtpList(params) {
    return fetch({
        url: path.getFtpList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//获取FTP管理信息
export function getFtpInfo(params) {
    return fetch({
        url: path.getFtpInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//添加FTP
export function addFtpInfo(params) {
    return fetch({
        url: path.addFtpInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//修改FTP
export function updateFtpInfo(params) {
    return fetch({
        url: path.updateFtpInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//删除FTP
export function deleteFtpInfo(params) {
    return fetch({
        url: path.deleteFtpInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}



//获取全局设置信息
export function getGlobalInfo(params) {
    return fetch({
        url: path.getGlobalInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//修改全局设置信息
export function updateGlobalInfo(params) {
    return fetch({
        url: path.updateGlobalInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取基本设置
export function getBasicInfo(params) {
    return fetch({
        url: path.getBasicInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//修改基本设置
export function updateBasicInfo(params) {
    return fetch({
        url: path.updateBasicInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//邮箱信息获取
export function getEmailInfo(params) {
    return fetch({
        url: path.getEmailInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//修改邮箱信息
export function updateEmailInfo(params) {
    return fetch({
        url: path.updateEmailInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//配送方式列表
export function getShipList(params) {
    return fetch({
        url: path.getShipList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//配送方式信息
export function getShipInfo(params) {
    return fetch({
        url: path.getShipInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//配送方式添加
export function addShipInfo(params) {
    return fetch({
        url: path.addShipInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//配送方式修改
export function updateShipInfo(params) {
    return fetch({
        url: path.updateShipInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//配送方式排序
export function priorityShipInfo(params) {
    return fetch({
        url: path.priorityShipInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//配送方式删除
export function deleteShipInfo(params) {
    return fetch({
        url: path.deleteShipInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//物流公司列表
export function getLogisticsList(params) {
    return fetch({
        url: path.getLogisticsList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//物流公司信息
export function getLogisticsInfo(params) {
    return fetch({
        url: path.getLogisticsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//物流公司添加
export function addLogisticsInfo(params) {
    return fetch({
        url: path.addLogisticsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//物流公司更新
export function updateLogisticsInfo(params) {
    return fetch({
        url: path.updateLogisticsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//物流公司删除
export function deleteLogisticsInfo(params) {
    return fetch({
        url: path.deleteLogisticsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//物流公司paixu
export function priorityLogisticsInfo(params) {
    return fetch({
        url: path.priorityLogisticsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//获取单点登录信息
export function getSsoInfo(params) {
    return fetch({
        url: path.getSsoInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//修改单点登录信息
export function updateSsoInfo(params) {
    return fetch({
        url: path.updateSsoInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取第三方登录信息
export function getThirdApiInfo(params) {
    return fetch({
        url: path.getThirdApiInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//修改第三方登录信息
export function updateThirdApiInfo(params) {
    return fetch({
        url: path.updateThirdApiInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//支付插件列表
export function getPaymentPluginsList(params) {
    return fetch({
        url: path.getPaymentPluginsList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//支付插件信息
export function getPaymentPluginsInfo(params) {
    return fetch({
        url: path.getPaymentPluginsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//支付插件信息
export function updatePaymentPluginsInfo(params) {
    return fetch({
        url: path.updatePaymentPluginsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//支付排序
export function priorityPaymentPluginsInfo(params) {
    return fetch({
        url: path.priorityPaymentPluginsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取公众号信息

export function getWeiXinSetInfo(params) {
    return fetch({
        url: path.getWeiXinSetInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//修改公众号信息
export function updateWeiXinSetInfo(params) {
    return fetch({
        url: path.updateWeiXinSetInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//自定义菜单列表
export function getWeiXinMenuList(params) {
    return fetch({
        url: path.getWeiXinMenuList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//自定义菜单信息获取
export function getWeiXinMenuInfo(params) {
    return fetch({
        url: path.getWeiXinMenuInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//自定义菜单添加
export function addWeiXinMenuInfo(params) {
    return fetch({
        url: path.addWeiXinMenuInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//自定义菜单修改
export function updateWeiXinMenuInfo(params) {
    return fetch({
        url: path.updateWeiXinMenuInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//自定义菜单删除
export function deleteWeiXinMenuInfo(params) {
    return fetch({
        url: path.deleteWeiXinMenuInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//自定义回复列表
export function getWeiXinMessageList(params) {
    return fetch({
        url: path.getWeiXinMessageList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//自定义回复添加
export function addWeiXinMessageInfo(params) {
    return fetch({
        url: path.addWeiXinMessageInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//自定义回复信息
export function getWeiXinMessageInfo(params) {
    return fetch({
        url: path.getWeiXinMessageInfo  ,
        method: 'post',
        data: params,
        signValidate: true,
    })
}



//自定义回复修改
export function updateWeiXinMessageInfo(params) {
    return fetch({
        url: path.updateWeiXinMessageInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//自定义回复删除
export function deleteWeiXinMessageInfo(params) {
    return fetch({
        url: path.deleteWeiXinMessageInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取默认回复
export function getDefaultWeiXinMessageInfo(params) {
    return fetch({
        url: path.getDefaultWeiXinMessageInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//修改默认回复
export function updateDefaultWeiXinMessageInfo(params) {
    return fetch({
        url: path.updateDefaultWeiXinMessageInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
