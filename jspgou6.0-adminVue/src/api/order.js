import fetch from '@/untils/fetch'
import path from '@/untils/path'


//订单列表
export function getOrderList(params) {
    return fetch({
        url: path.getOrderList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//订单信息查看
export function getOrderInfo(params) {
    return fetch({
        url: path.getOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//订单修改
export function updateOrderInfo(params) {
    return fetch({
        url: path.updateOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//删除订单
export function deleteOrderInfo(params) {
    return fetch({
        url: path.deleteOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//确认订单信息
export function enterOrderInfo(params) {
    return fetch({
        url: path.enterOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//确认订单信息
export function doneOrderInfo(params) {
    return fetch({
        url: path.doneOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//订单发货
export function saveOrderInfo(params) {
    return fetch({
        url: path.saveOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//订单支付
export function payOrderInfo(params) {
    return fetch({
        url: path.payOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//订单支付
export function cannelOrderInfo(params) {
    return fetch({
        url: path.cannelOrderInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}




//退货订单列表
export function getOrderReturnList(params) {
    return fetch({
        url: path.getOrderReturnList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//退货订单信息
export function getOrderReturnInfo(params) {
    return fetch({
        url: path.getOrderReturnInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//退货订单删除
export function deleteOrderReturnInfo(params) {
    return fetch({
        url: path.deleteOrderReturnInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//退货订单审核
export function affirmOrderReturnInfo(params) {
    return fetch({
        url: path.affirmOrderReturnInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


//退货订单拒绝
export function sendbackOrderReturnInfo(params) {
    return fetch({
        url: path.sendbackOrderReturnInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//退货订单收货
export function receiveOrderReturnInfo(params) {
    return fetch({
        url: path.receiveOrderReturnInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//退货订单退款
export function refundOrderReturnInfo(params) {
    return fetch({
        url: path.refundOrderReturnInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}




//发货信息列表
export function getShopShipmentsList(params) {
    return fetch({
        url: path.getShopShipmentsList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//获取发货人信息
export function getShopShipmentsInfo(params) {
    return fetch({
        url: path.getShopShipmentsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//添加发货人信息
export function addShopShipmentsInfo(params) {
    return fetch({
        url: path.addShopShipmentsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//修改发货人信息
export function updateShopShipmentsInfo(params) {
    return fetch({
        url: path.updateShopShipmentsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}



//删除发货人信息
export function deleteShopShipmentsInfo(params) {
    return fetch({
        url: path.deleteShopShipmentsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//发货列表 
export function getShipmentsList(params) {
    return fetch({
        url: path.getShipmentsList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//发货信息查看
export function getShipmentsInfo(params) {
    return fetch({
        url: path.getShipmentsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//标记快递单
export function isPrintShipmentsInfo(params) {
    return fetch({
        url: path.isPrintShipmentsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//删除发货信息
export function deleteShipmentsInfo(params) {
    return fetch({
        url: path.deleteShipmentsInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

