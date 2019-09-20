import fetch from '@/untils/fetch'
import path from '@/untils/path'

//生成索引
export function creatIndex(params) {
    return fetch({
        url: path.creatIndex,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//图表
export function chatStatistics(params) {
    return fetch({
        url: path.chatStatistics,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

//销售排行
export function saleStatistics(params) {
    return fetch({
        url: path.saleStatistics,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//销售额、今日订单数、总商品数、总会员数
export function getStatistics(params) {
    return fetch({
        url: path.getStatistics,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//待处理事件统计
export function unDealStatistics(params) {
    return fetch({
        url: path.unDealStatistics,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
//获取内存信息
export function getSystemMemory(params) {
  return fetch({
    url: path.getSystemMemory,
    method: 'post',
    data: params,
    signValidate: true,
  })
}
