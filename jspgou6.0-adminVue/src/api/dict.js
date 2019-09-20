import fetch from '@/untils/fetch'
import path from '@/untils/path'

//获取数据字典列表
export function getDictList(params) {
    return fetch({
        url: path.getDictList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取数据字典信息
export function getDictInfo(params) {
    return fetch({
        url: path.getDictInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//添加数据字典列表
export function addDictInfo(params) {
    return fetch({
        url: path.addDictInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//修改数据字典列表
export function updateDictInfo(params) {
    return fetch({
        url: path.updateDictInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//删除数据字典
export function deleteDictInfo(params) {
    return fetch({
        url: path.deleteDictInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//数据字典排序
export function priorityDictInfo(params) {
    return fetch({
        url: path.priorityDictInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//获取字典类型列表
export function getDictTypeList(params) {
    return fetch({
        url: path.getDictTypeList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//获取字典类型信息
export function getDictTypeInfo(params) {
    return fetch({
        url: path.getDictTypeInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//添加字典类型列表
export function addDictTypeInfo(params) {
    return fetch({
        url: path.addDictTypeInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//修改字典类型列表
export function updateDictTypeInfo(params) {
    return fetch({
        url: path.updateDictTypeInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//删除字典类型列表
export function deleteDictTypeInfo(params) {
    return fetch({
        url: path.deleteDictTypeInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取所有字典类型
export function getDictTypeAll(params) {
    return fetch({
        url: path.getDictTypeAll,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取字典类型信息
export function getDictTypeId(params) {
    return fetch({
        url: path.getDictTypeId,
        method: 'post',
        data: params,
        signValidate: true,
    })
}



//获取站内信列表
export function getMessageList(params) {
    return fetch({
        url: path.getMessageList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//收件箱列表
export function getReceivemessageList(params) {
    return fetch({
        url: path.getReceivemessageList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//垃圾箱列表
export function getRecycleMessageList(params) {
    return fetch({
        url: path.getRecycleMessageList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//移动到回收站
export function getRemoveMessageList(params) {
    return fetch({
        url: path.getRemoveMessageList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//发送站内信
export function addMessageInfo(params) {
    return fetch({
        url: path.addMessageInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取站内信

export function getMessageInfo(params) {
    return fetch({
        url: path.getMessageInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//删除回收
export function deleteMessageList(params) {
    return fetch({
        url: path.deleteMessageList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
