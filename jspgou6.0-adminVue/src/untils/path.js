
const path={
userLogin:'/api/admin/userlogin',//登录
getLoginUser:'/api/admin/getLoginUser',//登录获取用户信息权限
loginOut:'/api/admin/user/loginOut',//退出登录
getUser:'/api/admin/message/checkUsername',//验证用户是否存在
creatIndex:'/api/admin/product/createIndex',//生成索引

chatStatistics:'/api/admin/index/chatStatistics',
getStatistics:'/api/admin/index/statistics',//销售额、今日订单数、总商品数、总会员数
unDealStatistics:'/api/admin/index/unDealStatistics',//待处理事件统计
saleStatistics:'/api/admin/index/saleStatistics',//销售排行
getSystemMemory:'/api/admin/index/getSystemMemory',//获取系统使用内存情况

getAdminList:'/api/admin/admin/list',//管理员列表
getAdminInfo:'/api/admin/admin/get',//管理员信息
addAdminInfo:'/api/admin/admin/save',//管理员添加
deleteAdminInfo:'/api/admin/admin/delete',//管理员删除
updateAdminInfo:'/api/admin/admin/update',//管理员更新
getRoleList:'/api/admin/role/list',//角色列表
getRoleInfo:'/api/admin/role/get',//角色信息
addRoleInfo:'/api/admin/role/save',//角色添加
deleteRoleInfo:'/api/admin/role/delete',//角色删除
updateRoleInfo:'/api/admin/role/update',//角色更新

getCouponList:'/api/admin/coupon/list',//优惠卷列表
getCouponInfo:'/api/admin/coupon/get',//优惠卷信息
addCouponInfo:'/api/admin/coupon/save',//优惠卷添加
deleteCouponInfo:'/api/admin/coupon/delete',//优惠卷删除
disabledCouponInfo:'/api/admin/coupon/disabled',//优惠卷禁用

getCustomerServiceList:'/api/admin/customerService/list',//在线客服列表
getCustomerServiceInfo:'/api/admin/customerService/get',//在线客服信息
addCustomerServiceInfo:'/api/admin/customerService/save',//在线客服添加
updateCustomerServiceInfo:'/api/admin/customerService/update',//在线客服x修改
deleteCustomerServiceInfo:'/api/admin/customerService/delete',//在线客服删除
priorityCustomerServiceInfo:'/api/admin/customerService/priority',//在线客服排序
getPosterList:'/api/admin/poster/list',//获取海报信息
updatePosterInfo:'/api/admin/poster/update',//获取海报信息
getAdspaceList:'/api/admin/adspace/list',//广告版位列表
getAdspaceInfo:'/api/admin/adspace/get',//广告版位信息
addAdspaceInfo:'/api/admin/adspace/save',//广告版位添加
updateAdspaceInfo:'/api/admin/adspace/update',//广告版位更新
deleteAdspaceInfo:'/api/admin/adspace/delete',//广告版位删除
getAdvertiseList:'/api/admin/advertise/list',//广告列表
getAdvertiseInfo:'/api/admin/advertise/get',//广告信息
addAdvertiseInfo:'/api/admin/advertise/save',//广告添加
updateAdvertiseInfo:'/api/admin/advertise/update',//广告更新
deleteAdvertiseInfo:'/api/admin/advertise/delete',//广告删除
getLogList:'/api/admin/log/list',//系统操作日志
getUserList:'/api/admin/member/list',//用户列表
getUserInfo:'/api/admin/member/get',//用户信息
addUserInfo:'/api/admin/member/save',//用户添加
updateUserInfo:'/api/admin/member/update',//用户更新
deleteUserInfo:'/api/admin/member/delete',//用户删除
getRankList:'/api/admin/memberGroup/list',//用户等级列表
getRankInfo:'/api/admin/memberGroup/get',//用户等级信息
addRankInfo:'/api/admin/memberGroup/save',//用户等级添加
updateRankInfo:'/api/admin/memberGroup/update',//用户等级更新
deleteRankInfo:'/api/admin/memberGroup/delete',//用户等级删除
getDictList:'/api/admin/dict/list',//获取数据字典列表
getDictInfo:'/api/admin/dict/get',//获取数据字典信息
addDictInfo:'/api/admin/dict/save',//添加数据字典列表
updateDictInfo:'/api/admin/dict/update',//修改数据字典列表
deleteDictInfo:'/api/admin/dict/delete',//删除数据字典
priorityDictInfo:'/api/admin/dict/updateSort',//数据字典排序
getDictTypeList:'/api/admin/dictType/list',//获取字典类型列表
getDictTypeInfo:'/api/admin/dictType/get',//获取字典类型信息
addDictTypeInfo:'/api/admin/dictType/save',//添加字典类型列表
updateDictTypeInfo:'/api/admin/dictType/update',//修改字典类型列表
deleteDictTypeInfo:'/api/admin/dictType/delete',//删除字典类型列表
getDictTypeAll:'/api/admin/dictType/all',//获取字典类型列表
getDictTypeId:'/api/admin/dict/listByTypeId',//获取字典类型信息
getMessageList:'/api/admin/message/list',//获取站内信列表
getReceivemessageList:'/api/admin/receivemessage/list',//收件箱列表
getRecycleMessageList:'/api/admin/message/recycle',//垃圾箱列表
getRemoveMessageList:'/api/admin/message/trash',//移动到回收站
deleteMessageList:'/api/admin/message/clean',//删除站内信
addMessageInfo:'/api/admin/message/send',//发送站内信
getMessageInfo:'/api/admin/receivemessage/read',//查看站内信
getOrderList:'/api/admin/order/list',//订单列表
getOrderInfo:'/api/admin/order/view',//订单信息查看
updateOrderInfo:'/api/admin/order/update',//订单修改
deleteOrderInfo:'/api/admin/order/delete',//删除订单
enterOrderInfo:'/api/admin/order/affirm',//确认订单信息
doneOrderInfo:'/api/admin/order/accomplish',//完成订单
cannelOrderInfo:'/api/admin/order/cancel',//订单取消
saveOrderInfo:'/api/admin/order/save',//订单发货
payOrderInfo:'/api/admin/order/pay',//订单支付
getOrderReturnList:'/api/admin/orderReturn/list',//退货订单列表
getOrderReturnInfo:'/api/admin/orderReturn/get',//退货订单信息
deleteOrderReturnInfo:'/api/admin/orderReturn/delete',//退货订单删除
affirmOrderReturnInfo:'/api/admin/orderReturn/affirm',//退货订单审核
sendbackOrderReturnInfo:'/api/admin/orderReturn/sendback',//退货订单拒绝
receiveOrderReturnInfo:'/api/admin/orderReturn/receive',//退货订单收货
refundOrderReturnInfo:'/api/admin/orderReturn/refund',//退货订单退款
getShopShipmentsList:'/api/admin/shopShipments/list',//发货信息列表
getShopShipmentsInfo:'/api/admin/shopShipments/get',//获取发货人信息
addShopShipmentsInfo:'/api/admin/shopShipments/save',//添加发货人信息
updateShopShipmentsInfo:'/api/admin/shopShipments/update',//修改发货人信息
deleteShopShipmentsInfo:'/api/admin/shopShipments/delete',//删除发货人信息
getShipmentsList:'/api/admin/shipments/list',//发货列表
getShipmentsInfo:'/api/admin/shipments/view',//发货信息查看
isPrintShipmentsInfo:'/api/admin//shipments/isPrintTrue',//标记快递单
deleteShipmentsInfo:'/api/admin//shipments/delete',//删除发货信息

addDefaultTypeProperty:'/api/admin/typeProperty/save',//保存默认字段
addTypePropertyContent:'/api/admin/typePropertyContent/save',//保存内容
deleteTypePropertyContent:'/api/admin/typePropertyContent/delete',//删除内容

getModelList:'/api/admin/type/list',//类型列表,
getModelListAll:'/api/admin/type/all',//类型列表,
getTypeInfo:'/api/admin/type/getType',//类型信息
addTypeInfo:'/api/admin/type/save',//添加类型信息



updateTypeInfo:'/api/admin/type/update',//修改类型信息
deleteTypeInfo:'/api/admin/type/delete',//删除类型
getModelInfo:'/api/admin/typeProperty/list',//模型信息
getProductList:'/api/admin/product/list',//商品列表
getProductInfo:'/api/admin/product/getProduct',//商品信息
addProductList:'/api/admin/product/save',//添加商品
updateProductList:'/api/admin/product/update',//修改商品列表
deleteProductList:'/api/admin/product/delete',//删除商品
getCommodityCategoryTree:'/api/admin/category/tree',//商品分类树形列表
getCommodityTopCategory:'/api/admin/category/topCategory',//商品分类上级分类
getCommodityCategoryList:'/api/admin/category/list',//商品分类列表
getCommodityCategoryInfo:'/api/admin/category/getCategory',//商品分类列表信息
addCommodityCategoryInfo:'/api/admin/category/save',//添加分类信息
updateCommodityCategoryInfo:'/api/admin/category/update',//修改分类信息
deleteCommodityCategoryInfo:'/api/admin/category/delete',//商品分类删除
priorityCommodityCategoryInfo:'/api/admin/category/priority',//商品分类排序
getCommodityTemplate:'/api/admin/category/template',//商品分类模版信息
getCommodityBrand:'/api/admin/category/brand',//获取商品分类关联品牌
getBrandListByCategoryId:'/api/admin/brand/listByCategoryId',//通过分类id获取关联品牌

getCommodityStandardType:'/api/admin/category/standardtype',//获取商品分类关联规格
getBrandList:'/api/admin/brand/list',//获取品牌列表
getBrandInfo:'/api/admin/brand/getBrand',//获取品牌信息
getBrandTypeInfo:'/api/admin/brand/getCategory',//获取品牌分类
addBrandInfo:'/api/admin/brand/save',//添加品牌信息
deleteBrandInfo:'/api/admin/brand/delete',//删除品牌信息
updateBrandInfo:'/api/admin/brand/update',//修改品牌信息
priorityBrandInfo:'/api/admin/brand/priority',//品牌排序

getStandardList:'/api/admin/standardType/list',//获取规格列表
getStandardInfo:'/api/admin/standardType/getStandard',//获取规格信息
addStandardInfo:'/api/admin/standardType/save',//添加规格信息
updateStandardInfo:'/api/admin/standardType/update',//修改规格信息
priorityStandardInfo:'/api/admin/standardType/priority',//排序规格信息
deleteStandardInfo:'/api/admin/standardType/delete',//删除规格信息

getConsultList:'/api/admin/consult/list',//顾客资讯列表
getConsultInfo:'/api/admin/consult/get',//顾客资讯信息
updateConsultInfo:'/api/admin/consult/update',//顾客资讯回复修改
deleteConsultInfo:'/api/admin/consult/delete',//顾客资讯删除


getDiscussList:'/api/admin/discuss/list',//评价列表
getDiscussInfo:'/api/admin/discuss/get',//评价列表信息
updateDiscussInfo:'/api/admin/discuss/update',//评价列表修改
deleteDiscussInfo:'/api/admin/discuss/delete',//评价列表删除

getHotList:'/api/admin/statistics/saleRank',//热销排行

getSaleChatList:'/api/admin/product/getOverStock',

getChannelTree:'/api/admin/channel/tree',//栏目树
getChannelList:'/api/admin/channel/list',//栏目列表
priorityChannelInfo:'/api/admin/channel/updateSort',//栏目排序
getChannelInfo:'/api/admin/channel/get',//获取栏目信息
addChannelInfo:'/api/admin/channel/save',//添加栏目信息
updateChannelInfo:'/api/admin/channel/update',//修改栏目信息
deleteChannelInfo:'/api/admin/channel/delete',//删除栏目信息
getChannelTpl:'/api/admin/channel/getTpl',//获取栏目模版
getParentChannelList:'/api/admin/channel/getParentList',//栏目父级查询
getArticleChannelList:'/api/admin/article/channelList',


getArticleList:'/api/admin/article/list',//文章列表
getArticleInfo:'/api/admin/article/get',//文章信息
addArticleInfo:'/api/admin/article/save',//文章添加
updateArticleInfo:'/api/admin/article/update',//文章修改
deleteArticleInfo:'/api/admin/article/delete',//文章删除



getApiInfoList:'/api/admin/apiInfo/list',//获取api接口信息列表
getApiInfo:'/api/admin/apiInfo/get',//获取api接口信息
addApiInfo:'/api/admin/apiInfo/save',//添加api接口信息
updateApiInfo:'/api/admin/apiInfo/update',//更新api接口信息
deleteApiInfo:'/api/admin/apiInfo/delete',//删除api接口信息


getApiRecordList:'/api/admin/apiRecord/list',//获取api接口调用记录列表
deleteApiRecordInfo:'/api/admin/apiRecord/delete',//获取api接口调用记录列表




getGlobalInfo:'/api/admin/global/get',//获取全局设置信息
updateGlobalInfo:'/api/admin/global/update',//修改全局设置信息

getBasicInfo:'/api/admin/Basic/get',//获取基本设置
updateBasicInfo:'/api/admin/Basic/update',//修改基本设置

getEmailInfo:'/api/admin/email/getEmail',//邮箱信息获取
updateEmailInfo:'/api/admin/email/update',//修改邮箱信息

getShipList:'/api/admin/ship/list',//配送方式列表
getShipInfo:'/api/admin/ship/get',//配送方式信息
addShipInfo:'/api/admin/ship/save',//配送方式添加
updateShipInfo:'/api/admin/ship/update',//配送方式修改
priorityShipInfo:'/api/admin/ship/priority',//配送方式排序
deleteShipInfo:'/api/admin/ship/delete',//配送方式删除


getLogisticsList:'/api/admin/logistics/list',//物流公司列表
getLogisticsInfo:'/api/admin/logistics/get',//物流公司信息
addLogisticsInfo:'/api/admin/logistics/save',//物流公司添加
updateLogisticsInfo:'/api/admin/logistics/update',//物流公司更新
deleteLogisticsInfo:'/api/admin/logistics/delete',//物流公司删除
priorityLogisticsInfo:'/api/admin/logistics/priority',//配送方式排序
getCourier:'/api/admin/logistics/getCourier',//获取快递面单信息

getFtpList:'/api/admin/ftp/list',//获取FTP管理列表
getFtpInfo:'/api/admin/ftp/get',//获取FTP管理信息
addFtpInfo:'/api/admin/ftp/save',//添加FTP
updateFtpInfo:'/api/admin/ftp/update',//修改FTP
deleteFtpInfo:'/api/admin/ftp/delete',//删除FTP
getSsoInfo:'/api/admin/config/getsso',//获取单点登录信息
updateSsoInfo:'/api/admin/config/updatesso',//修改单点登录信息
getThirdApiInfo:'/api/admin/config/getApi',//获取第三方登录信息
updateThirdApiInfo:'/api/admin/config/updateApi',//修改第三方登录信息
getPaymentPluginsList:'/api/admin/paymentPlugins/list',//支付插件列表
getPaymentPluginsInfo:'/api/admin/paymentPlugins/get',//支付插件信息
priorityPaymentPluginsInfo:'api/admin/paymentPlugins/priority',//支付排序
updatePaymentPluginsInfo:'/api/admin/paymentPlugins/update',//支付更新
getApiAccountList:'/api/admin/apiAccount/list',//api账户列表
getApiAccountInfo:'/api/admin/apiAccount/get',//api账户信息
addApiAccountInfo:'/api/admin/apiAccount/save',//api账户添加
updateApiPassword:'/api/admin/admin/updatePassword',//修改api独立密码
checkApiPassword:'/api/admin/admin/checkPassword',//校验独立密码
getWeiXinSetInfo:'/api/admin/weixin/get',//获取公众号信息
updateWeiXinSetInfo:'/api/admin/weixin/update',//修改公众号信息
getWeiXinMenuList:'/api/admin/weixinMenu/list',//自定义菜单列表
getWeiXinMenuInfo:'/api/admin/weixinMenu/get',//自定义菜单信息获取
addWeiXinMenuInfo:'/api/admin/weixinMenu/save',//自定义菜单添加
updateWeiXinMenuInfo:'/api/admin/weixinMenu/update',//自定义菜单修改
deleteWeiXinMenuInfo:'/api/admin/weixinMenu/delete',//自定义菜单删除
getWeiXinMessageList:'/api/admin/weixinMessage/list',//自定义回复列表
getWeiXinMessageInfo:'/api/admin/weixinMessage/get',//自定义回复信息
addWeiXinMessageInfo:'/api/admin/weixinMessage/save',//自定义回复添加
updateWeiXinMessageInfo:'/api/admin/weixinMessage/update',//自定义回复修改
deleteWeiXinMessageInfo:'/api/admin/weixinMessage/delete',//自定义回复删除

getDefaultWeiXinMessageInfo:'/api/admin/weixinMessage/getDefault',//获取默认回复
updateDefaultWeiXinMessageInfo:'/api/admin/weixinMessage/default/update',//修改默认回复


}

export default path;
