import header from '@/components/header'
import body from '@/components/body'
import login from '@/components/login'
import work from '@/views/index'
import error from '@/components/404.vue'

/**运营组件*/
const adminList = resolve => { require(['@/views/operation/admin/list.vue'], resolve) }; //管理员列表
const adminEdit = resolve => { require(['@/views/operation/admin/edit.vue'], resolve) }; //管理员修改
const adminAdd = resolve => { require(['@/views/operation/admin/add.vue'], resolve) }; //管理员添加

const roleList = resolve => { require(['@/views/operation/role/list.vue'], resolve) }; //角色列表
const roleEdit = resolve => { require(['@/views/operation/role/edit.vue'], resolve) }; //角色添加修改

const couponList = resolve => { require(['@/views/operation/coupon/list.vue'], resolve) }; //优惠卷列表
const couponAdd = resolve => { require(['@/views/operation/coupon/edit.vue'], resolve) }; //优惠卷添加
const customerServiceList = resolve => { require(['@/views/operation/customerService/list.vue'], resolve) }; //在线客服列表
const customerServiceEdit = resolve => { require(['@/views/operation/customerService/edit.vue'], resolve) }; //在线客服列修改
const logList = resolve => { require(['@/views/operation/log/list.vue'], resolve) }; //系统操作日志
const poster = resolve => { require(['@/views/operation/poster/list.vue'], resolve) }; //系统操作日志
const adSpaceList = resolve => { require(['@/views/operation/adSpace/list.vue'], resolve) }; //广告版位列表
const adSpaceEdit = resolve => { require(['@/views/operation/adSpace/edit.vue'], resolve) }; //广告版位添加修改
const advertiseList = resolve => { require(['@/views/operation/advertise/list.vue'], resolve) }; //广告列表
const advertiseEdit = resolve => { require(['@/views/operation/advertise/edit.vue'], resolve) }; //广告添加修改


/**订单组件 */

const orderList = resolve => { require(['@/views/order/order/list.vue'], resolve) }; //订单列表
const orderEdit = resolve => { require(['@/views/order/order/edit.vue'], resolve) }; //订单修改
const orderMange = resolve => { require(['@/views/order/order/mange.vue'], resolve) }; //订单操作

const orderReturnList = resolve => { require(['@/views/order/orderReturn/list.vue'], resolve) }; //订单退回列表
const orderReturnEdit = resolve => { require(['@/views/order/orderReturn/edit.vue'], resolve) }; //订单退回列表


const shopShipmentsList = resolve => { require(['@/views/order/shopShipments/list.vue'], resolve) }; //发货信息管理列表
const shopShipmentsEdit = resolve => { require(['@/views/order/shopShipments/edit.vue'], resolve) }; //发货信息管理添加修改

const shipmentsList = resolve => { require(['@/views/order/printOrder/list.vue'], resolve) }; //打印快递单列表
const shipmentsEdit = resolve => { require(['@/views/order/printOrder/edit.vue'], resolve) }; //打印快递单列表

/**用户组件 */
const userList = resolve => { require(['@/views/userMange/user/list.vue'], resolve) }; //用户列表
const userEdit = resolve => { require(['@/views/userMange/user/edit.vue'], resolve) }; //用户修改
const userAdd = resolve => { require(['@/views/userMange/user/add.vue'], resolve) }; //用户添加


const rankList = resolve => { require(['@/views/userMange/userRank/list.vue'], resolve) }; //等级列表
const rankEdit = resolve => { require(['@/views/userMange/userRank/edit.vue'], resolve) }; //等级添加修改

const dictList = resolve => { require(['@/views/userMange/userDict/list.vue'], resolve) }; //字典列表dictTypeList
const dictEdit = resolve => { require(['@/views/userMange/userDict/edit.vue'], resolve) }; //字典列表dictTypeList


const dictTypeList = resolve => { require(['@/views/userMange/dictType/list.vue'], resolve) }; //字典列表
const dictTypeEdit = resolve => { require(['@/views/userMange/dictType/edit.vue'], resolve) }; //字典类型修改
const messageList = resolve => { require(['@/views/userMange/message/list.vue'], resolve) }; //站内信列表
const messageEdit = resolve => { require(['@/views/userMange/message/edit.vue'], resolve) }; //站内信查看修改
const lookMessaage = resolve => { require(['@/views/userMange/message/look.vue'], resolve) }; //站内信查看
/**商品组件 */


const productList = resolve => { require(['@/views/commodity/product/list.vue'], resolve) }; //商品分类列表
const productListEdit = resolve => { require(['@/views/commodity/product/edit.vue'], resolve) }; //商品分类修改
const productListAdd = resolve => { require(['@/views/commodity/product/add.vue'], resolve) }; //商品分类添加

const addProduct = resolve => { require(['@/views/commodity/addProduct/list.vue'], resolve) }; //商品分类添加

const commodityCategoryList = resolve => { require(['@/views/commodity/category/list.vue'], resolve) }; //商品分类列表
const commodityCategoryAdd = resolve => { require(['@/views/commodity/category/add.vue'], resolve) }; //商品分类添加
const commodityCategoryEdit = resolve => { require(['@/views/commodity/category/edit.vue'], resolve) }; //商品分类修改
const brandList = resolve => { require(['@/views/commodity/brand/list.vue'], resolve) }; //品牌列表
const brandEdit = resolve => { require(['@/views/commodity/brand/edit.vue'], resolve) }; //品牌添加修改
const standardList = resolve => { require(['@/views/commodity/standard/list.vue'], resolve) }; //规格添加修改
const standardEdit = resolve => { require(['@/views/commodity/standard/edit.vue'], resolve) }; //规格添加修改

const typeList = resolve => { require(['@/views/commodity/type/list.vue'], resolve) }; //类型列表
const typeEdit = resolve => { require(['@/views/commodity/type/edit.vue'], resolve) }; //类型列表
const modelList = resolve => { require(['@/views/commodity/model/list.vue'], resolve) }; //模型列表
const modelList2 = resolve => { require(['@/views/commodity/model/list2.vue'], resolve) }; //模型列表
const consultList = resolve => { require(['@/views/commodity/consult/list.vue'], resolve) }; //顾客咨询列表
const consultEdit = resolve => { require(['@/views/commodity/consult/edit.vue'], resolve) }; //顾客咨询修改
const discussList = resolve => { require(['@/views/commodity/discuss/list.vue'], resolve) }; //顾客咨询修改
const discussEdit = resolve => { require(['@/views/commodity/discuss/edit.vue'], resolve) }; //顾客咨询修改

const hotProduct = resolve => { require(['@/views/commodity/hotProduct/list.vue'], resolve) }; //热销商品
const saleChat = resolve => { require(['@/views/commodity/saleChat/list.vue'], resolve) }; //库存警戒



const resourceTree = resolve => { require(['@/views/interface/resource/tree.vue'], resolve) }; //
const resourceList = resolve => { require(['@/views/interface/resource/list.vue'], resolve) }; //
const resourceEdit = resolve => { require(['@/views/interface/resource/edit.vue'], resolve) }; //
const resourceReName = resolve => { require(['@/views/interface/resource/rename.vue'], resolve) }; //

const templateTree = resolve => { require(['@/views/interface/template/tree.vue'], resolve) }; //
const templateList = resolve => { require(['@/views/interface/template/list.vue'], resolve) }; //
const templateEdit = resolve => { require(['@/views/interface/template/edit.vue'], resolve) }; //
const templateReName = resolve => { require(['@/views/interface/template/rename.vue'], resolve) }; //
const templateSetting = resolve => { require(['@/views/interface/template/setting.vue'], resolve) }; //
const channelList = resolve => { require(['@/views/interface/channel/list.vue'], resolve) }; //栏目列表
const channelEdit = resolve => { require(['@/views/interface/channel/edit.vue'], resolve) }; //栏目添加修改
const channelAdd = resolve => { require(['@/views/interface/channel/add.vue'], resolve) }; //栏目添加修改

const articleEdit = resolve => { require(['@/views/interface/article/edit.vue'], resolve) }; //文章修改

const articleList = resolve => { require(['@/views/interface/article/list.vue'], resolve) }; //文章列表


/**设置组件 */
const apiInfoList = resolve => { require(['@/views/set/apiInfo/list.vue'], resolve) }; //api接口管理

const apiInfoEdit = resolve => { require(['@/views/set/apiInfo/edit.vue'], resolve) }; //api接口添加修改



const apiRecordList = resolve => { require(['@/views/set/apiRecord/list.vue'], resolve) }; //api接口调用记录列表
const ftpList = resolve => { require(['@/views/set/FTP/list.vue'], resolve) }; //FTP管理列表
const ftpEdit = resolve => { require(['@/views/set/FTP/edit.vue'], resolve) }; //FTP添加
const ftpAdd = resolve => { require(['@/views/set/FTP/add.vue'], resolve) }; //FTP添加


const globalEdit = resolve => { require(['@/views/set/globalSetting/edit.vue'], resolve) }; //全局设置
const basicEdit = resolve => { require(['@/views/set/basicSetting/edit.vue'], resolve) }; //基本设置
const emailEdit = resolve => { require(['@/views/set/emailSetting/edit.vue'], resolve) }; //邮箱设置
const shipList = resolve => { require(['@/views/set/ship/list.vue'], resolve) }; //配送方式列表
const shipEdit = resolve => { require(['@/views/set/ship/edit.vue'], resolve) }; //配送方式添加
const logisticsList = resolve => { require(['@/views/set/logistics/list.vue'], resolve) }; //物流公司列表
const logisticsEdit = resolve => { require(['@/views/set/logistics/edit.vue'], resolve) }; //物流公司添加修改
const logisticsTmplate = resolve => { require(['@/views/set/logistics/tmplate.vue'], resolve) }; //物流公司添加修改
const ssoEdit = resolve => { require(['@/views/set/ssoConfig/edit.vue'], resolve) }; //单点登录
const thirdApiEdit = resolve => { require(['@/views/set/thirdApi/edit.vue'], resolve) }; //单点登录
const paymentPluginsList = resolve => { require(['@/views/set/paymentPlugins/list.vue'], resolve) }; //支付插件管理
const paymentPluginsEdit = resolve => { require(['@/views/set/paymentPlugins/edit.vue'], resolve) }; //支付插件管理

const weiXinSet = resolve => { require(['@/views/set/weiXinSet/weiXinSet.vue'], resolve) }; //微信设置
const weiXinMenuList = resolve => { require(['@/views/set/weiXinMenu/list.vue'], resolve) }; //自定义菜单
const weiXinMenuEdit = resolve => { require(['@/views/set/weiXinMenu/edit.vue'], resolve) }; //自定义添加修改
const weiXinMessageList = resolve => { require(['@/views/set/weiXinMessage/list.vue'], resolve) }; //自定义回复添加
const weiXinMessageEdit = resolve => { require(['@/views/set/weiXinMessage/edit.vue'], resolve) }; //自定义添加修改
const weiXinDefaultMessageEdit = resolve => { require(['@/views/set/weiXinMessage/defaultMessage.vue'], resolve) }; //默认回复

const apiAccountList = resolve => { require(['@/views/set/apiAccount/list.vue'], resolve) }; //api账户管理
const apiAccountEdit = resolve => { require(['@/views/set/apiAccount/edit.vue'], resolve) }; //api账户管理
const apiAccountUpdate = resolve => { require(['@/views/set/apiAccount/update.vue'], resolve) }; //api账户管理
export const routes = [{
  path: '/login',
  name: '登录',
  component: login,
  hidden: true
},
{
  path: '/',

  component: header,
  iconCls: 'bbs-iconfontdesktop',
  leaf: true, //只有一个节点
  redirect: '/work',
  children: [{
    path: '/work',
    name: '工作台',
    component: work,
    hidden: true
  }]
}

]
export const ansycRoutes = [
  {
    path: '/',
    name: '商品',
    meta: {
      role: 'commodity'
    },
    component: header,
    iconCls: 'icon-bars',
    children: [
      {
        path: '/productList',
        name: '商品管理',
        meta: { role: '/productList' },
        component: body,
        children: [{
          path: '/',
          meta: { role: '/productList' },
          component: productList,
          hidden: true
        },
        {
          path: '/productList/save',
          name: '添加商品',
          meta: { role: '/productList/save' },
          component: productListAdd,
          hidden: true
        }, {
          path: '/productList/update',
          name: '修改商品',
          meta: { role: '/productList/update' },
          component: productListEdit,
          hidden: true
        }
        ]
      }, {
        path: '/addproduct',
        name: '发布商品',
        meta: { role: '/addproduct' },
        component: body,
        children: [{
          path: '/',
          meta: { role: '/addproduct' },
          component: addProduct,
          hidden: true
        },

        ]
      },
      {
        path: '/commodityCategoryList',
        name: '分类管理',
        meta: { role: '/commodityCategoryList' },
        component: body,
        children: [{
          path: '/',
          meta: { role: '/commodityCategoryList' },
          component: commodityCategoryList,
          hidden: true
        },
        {
          path: '/commodityCategoryList/save',
          name: '添加商品分类',
          meta: { role: '/commodityCategoryList/save' },
          component: commodityCategoryAdd,
          hidden: true
        }, {
          path: '/commodityCategoryList/update',
          name: '修改商品分类',
          meta: { role: '/commodityCategoryList/update' },
          component: commodityCategoryEdit,
          hidden: true
        }
        ]
      }, {
        path: '/brandList',
        name: '品牌管理',
        meta: { role: '/brandList' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/brandList' },
            component: brandList,
            hidden: true
          }, {
            path: '/brandList/save',
            meta: { role: '/brandList/save' },
            name: '品牌添加',
            component: brandEdit,
            hidden: true
          }, {
            path: '/brandList/update',
            meta: { role: '/brandList/update' },
            name: '品牌修改',
            component: brandEdit,
            hidden: true
          }
        ]
      }, {
        path: '/standardList',
        name: '规格管理',
        meta: { role: '/standardList' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/standardList' },
            component: standardList,
            hidden: true
          }, {
            path: '/standardList/save',
            meta: { role: '/standardList/save' },
            name: '规格添加',
            component: standardEdit,
            hidden: true
          }, {
            path: '/standardList/update',
            meta: { role: '/standardList/update' },
            name: '规格修改',
            component: standardEdit,
            hidden: true
          }
        ]
      },
      {
        path: '/typeList',
        name: '类型管理',
        meta: { role: '/typeList' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/typeList' },
            component: typeList,
            hidden: true
          }, {
            path: '/typeList/save',
            meta: { role: '/typeList/save' },
            name: '类型添加',
            component: typeEdit,
            hidden: true
          }, {
            path: '/typeList/update',
            meta: { role: '/typeList/update' },
            name: '类型修改',
            component: typeEdit,
            hidden: true
          }, {
            path: '/typeList/modelList',
            meta: { role: '/typeList/modelList' },
            name: '模型列表',
            component: modelList,
            hidden: true
          },
          {
            path: '/typeList/modelList2',
            meta: { role: '/typeList/modelList2' },
            name: '模型列表-商品列表',
            component: modelList2,
            hidden: true
          }
        ]
      },
      {
        path: '/consultList',
        name: '商品咨询',
        meta: { role: '/consultList' },
        component: body, 
        children: [
          {
            path: '/',
            meta: { role: '/consultList' },
            component: consultList,
            hidden: true
          },
          {
            path: '/consultList/update',
            name: '商品咨询回复',
            meta: { role: '/consultList/update' },
            component: consultEdit,
            hidden: true
          },
        ]
      },
      {
        path: '/discussList',
        name: '商品评价',
        meta: { role: '/discussList' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/discussList' },
            component: discussList,
            hidden: true
          },
          {
            path: '/discussList/update',
            name: '商品评价回复',
            meta: { role: '/discussList/update' },
            component: discussEdit,
            hidden: true
          },
        ]
      },
      
      {
        path:'/hotProduct',
        name: '热销商品',
        meta: { role: '/hotProduct' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/hotProduct' },
            component: hotProduct,
            hidden: true
          }
        ] 
      }, {
        path: '/saleChat',
        name: '库存预警',
        meta: { role: '/saleChat' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/saleChat' },
            component: saleChat,
            hidden: true
          }
        ]
      }



    ]
  },
  {
    path: '/',
    name: '订单',
    meta: {
      role: 'orderMange'
    },
    component: header,
    iconCls: 'bbs-appstoreo',
    children: [
      {
        path: '/order',
        name: '订单管理',
        meta: { role: '/order' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/order' },
            component: orderList,
            hidden: true
          },
          {
            name: '订单操作',
            path: '/order/mange',
            meta: { role: '/order/mange' },
            component: orderMange,
            hidden: true
          },
          {
            name: '修改订单',
            path: '/order/update',
            meta: { role: '/order/update' },
            component: orderEdit,
            hidden: true
          }
        ]
      },
      {
        path: '/shipmentsList',
        name: '打印快递单',
        meta: { role: '/shipmentsList' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/shipmentsList' },
            component: shipmentsList,
            hidden: true
          },
          {
            name: '查看发货信信息',
            path: '/shipmentsList/update',
            meta: { role: '/shipmentsList/update' },
            component: shipmentsEdit,
            hidden: true
          },
        ]
      },

      {
        path: '/shopShipments',
        name: '发货信息管理',
        meta: { role: '/shopShipments' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/shopShipments' },
            component: shopShipmentsList,
            hidden: true
          },
          {
            name: '添加发货信息',
            path: '/shopShipments/save',
            meta: { role: '/shopShipments/save' },
            component: shopShipmentsEdit,
            hidden: true
          },
          {
            name: '修改发货信息',
            path: '/shopShipments/update',
            meta: { role: '/shopShipments/update' },
            component: shopShipmentsEdit,
            hidden: true
          }
        ]
      }, {
        path: '/orderReturn',
        name: '退货/退款订单',
        meta: { role: '/orderReturn' },
        component: body,
        children: [
          {
            path: '/',
            meta: { role: '/orderReturn' },
            component: orderReturnList,
            hidden: true
          },
          {
            name: '退回订单操作',
            path: '/orderReturn/update',
            meta: { role: '/orderReturn/update' },
            component: orderReturnEdit,
            hidden: true
          }
        ]
      },
    ]
  },
  {
    path: '/',
    name: '运营',
    meta: {
      role: 'operation'
    },
    component: header,
    iconCls: 'icon-barschart',
    children: [{
      path: '/admin',
      name: '管理员',
      meta: { role: 'adminList' },
      component: body,
      children: [{
        path: '/',
        meta: { role: 'adminList' },
        component: adminList,
        hidden: true
      },
      {
        path: '/admin/add',
        name: '管理员添加',
        meta: { role: 'addAdmin' },
        component: adminAdd,
        hidden: true
      }, {
        path: '/admin/update',
        name: '管理员修改',
        meta: { role: 'updateAdmin' },
        component: adminEdit,
        hidden: true
      }
      ]
    }, {
      path: '/role',
      name: '角色管理',
      meta: { role: '/roleList' },
      component: body,
      children: [
        {
          path: '/',
          meta: { role: '/roleList' },
          component: roleList,
          hidden: true
        }, {
          path: '/role/save',
          name: '添加角色',
          meta: { role: '/role/save' },
          component: roleEdit,
          hidden: true
        },
        {
          path: '/role/update',
          name: '修改角色',
          meta: { role: '/role/update' },
          component: roleEdit,
          hidden: true
        }
      ]
    },
    {
      path: '/adspace',
      name: '广告版位',
      meta: { role: '/adspace' },
      component: body,
      children: [
        {
          path: '/',
          meta: { role: '/adspace' },
          component: adSpaceList,
          hidden: true
        },
        {
          path: '/adspace/save',
          name: '添加广告版位',
          meta: { role: '/adspace/save' },
          component: adSpaceEdit,
          hidden: true
        },
        {
          path: '/adspace/update',
          name: '修改广告版位',
          meta: { role: '/adspace/update' },
          component: adSpaceEdit,
          hidden: true
        }
      ]
    }, {
      path: '/advertise',
      name: '广告管理',
      meta: { role: '/advertise' },
      component: body,
      children: [
        {
          path: '/',
          meta: { role: '/advertise' },
          component: advertiseList,
          hidden: true
        },
        {
          path: '/advertise/save',
          name: '添加广告',
          meta: { role: '/advertise/save' },
          component: advertiseEdit,
          hidden: true
        },
        {
          path: '/advertise/update',
          name: '修改广告',
          meta: { role: '/advertise/update' },
          component: advertiseEdit,
          hidden: true
        }
      ]
    },
    {
      path: '/coupon',
      name: '优惠卷',
      meta: { role: '/coupon' },
      component: body,
      children: [
        {
          path: '/',
          meta: { role: '/coupon' },
          component: couponList,
          hidden: true
        },
        {
          path: '/coupon/save',
          name: '添加优惠卷',
          meta: { role: '/coupon/save' },
          component: couponAdd,
          hidden: true
        }
      ]
    },
    {
      path: '/customerService',
      name: '在线客服',
      meta: { role: '/customerService' },
      component: body,
      children: [
        {
          path: '/',
          meta: { role: '/customerService' },
          component: customerServiceList,
          hidden: true
        },
        {
          path: '/customerService/save',
          name: '添加在线客服',
          meta: { role: '/customerService/save' },
          component: customerServiceEdit,
          hidden: true
        },
        {
          path: '/customerService/update',
          name: '修改在线客服',
          meta: { role: '/customerService/update' },
          component: customerServiceEdit,
          hidden: true
        }
      ]
    },
    {
      path: '/poster',
      name: '首页海报',
      meta: { role: '/poster' },
      component: body,
      children: [
        {
          path: '/',
          meta: { role: '/poster' },
          component: poster,
          hidden: true
        },
      ]
    },

    {
      path: '/syslog',
      name: '系统操作日志',
      meta: { role: '/syslog' },
      component: body,
      children: [
        {
          path: '/',
          meta: { role: '/syslog' },
          component: logList,
          hidden: true
        }
      ]
    }
    ]
  }, {
    path: '/',
    name: '用户',
    meta: {
      role: 'userMange'
    },
    component: header,
    iconCls: 'icon-user',
    children: [{
      path: '/userList',
      name: '用户管理',
      meta: {
        role: '/userList'
      },
      component: body,
      children: [{
        path: '/',
        meta: {
          role: '/userList'
        },
        component: userList,
      }, {
        path: '/userList/save',
        name: '添加用户',
        meta: { role: '/userList/save' },
        component: userAdd,
        hidden: true
      }, {
        path: '/userList/update',
        name: '修改用户',
        meta: { role: '/userList/update' },
        component: userEdit,
        hidden: true
      }
      ]
    }, {
      path: '/rankList',
      name: '用户等级',
      meta: {
        role: '/rankList'
      },
      component: body,
      children: [{
        path: '/',
        meta: {
          role: '/rankList'
        },
        component: rankList,
      },
      {
        path: '/rankList/save',
        name: '用户等级添加',
        meta: {
          role: '/rankList/save'
        },
        component: rankEdit,
      }, {
        path: '/rankList/update',
        name: '用户等级修改',
        meta: {
          role: '/rankList/update'
        },
        component: rankEdit,
      }]
    }, {
      path: '/dictList',
      name: '数据字典',
      meta: {
        role: '/dictList'
      },
      component: body,
      children: [{
        path: '/',
        meta: {
          role: '/dictList'
        },
        component: dictList,
      }, {
        name: '数据字典添加',
        path: '/dictList/save',
        meta: {
          role: '/dictList/save'
        },
        component: dictEdit,
      }, {
        name: '数据字典修改',
        path: '/dictList/update',
        meta: {
          role: '/dictList/update'
        },
        component: dictEdit,
      }]
    }, {
      path: '/dictTypeList',
      name: '字典类型',
      meta: {
        role: '/dictTypeList'
      },
      component: body,
      children: [{
        path: '/',
        meta: {
          role: '/dictTypeList'
        },
        component: dictTypeList,
      },
      {
        name: '字典类型添加',
        path: '/dictTypeList/save',
        meta: {
          role: '/dictTypeList/save'
        },
        component: dictTypeEdit,
      }, {
        name: '字典类型修改',
        path: '/dictTypeList/update',
        meta: {
          role: '/dictTypeList/update'
        },
        component: dictTypeEdit,
      }]
    }, {
      path: '/messageList',
      name: '站内信',
      meta: {
        role: '/dictmessageListTypeList'
      },
      component: body,
      children: [{
        path: '/',
        meta: {
          role: '/messageList'
        },
        component: messageList,
      },
      {
        name: '发送站内信',
        path: '/messageList/save',
        meta: {
          role: '/messageList/save'
        },
        component: messageEdit,
      }, {
        name: '站内信查看',
        path: '/messageList/update',
        meta: {
          role: '/messageList/update'
        },
        component: lookMessaage,
      }]
    }


    ]
  },
  {
    path: '/',
    name: '界面',
    meta: {
      role: 'interface'
    },
    component: header,
    iconCls: 'icon-windowso',
    children: [
      {
        path: '/templatelist',
         meta: { role: 'templatelist' },
        name: '模版管理',
        component: body,
        children: [
          {
            path: '/',
            name: '模版', 
            meta: { role: 'templatelist' },
            component: templateTree,
            hidden: true,
            children: [
              {
                path: '/templatelist',
                 meta: { role: 'templatelist' },
                name: '模版列表',
                component: templateList,
                hidden: true
              },
              {
                path: '/templateadd', 
                meta: { role: 'templateadd' },
                name: '添加模版',
                component: templateEdit,
                hidden: true
              },
              {
                path: '/templateedit',
                 meta: { role: 'templateedit' },
                name: '修改模版',
                component: templateEdit,
                hidden: true
              },
              {
                path: '/templaterename',
                 meta: { role: 'templaterename' },
                name: '模版重命名',
                component: templateReName,
                hidden: true
              }, {
                path: '/templatesetting', 
                meta: { role: 'templatesetting' },
                name: '模版设置',
                component: templateSetting,
                hidden: true
              }
            ]
          }
        ]
      },
      {
        path: '/resourcelist', 
        meta: { role: 'resourcelist' },
        name: '资源管理',
        component: body,
        children: [
          {
            path: '/',
            name: '资源', 
            meta: { role: 'resourcelist' },
            component: resourceTree,
            hidden: true,
            children: [
              {
                path: '/resourcelist',
                 meta: { role: 'resourcelist' },
                name: '资源列表',
                component: resourceList,
                hidden: true
              },
              {
                path: '/resourceadd',
                 meta: { role: 'resourceadd' },
                name: '添加资源',
                component: resourceEdit,
                hidden: true
              },
              {
                path: '/resourceedit', 
                meta: { role: 'resourceedit' },
                name: '修改资源',
                component: resourceEdit,
                hidden: true
              },
              {
                path: '/resourcerename',
                 meta: { role: 'resourcerename' },
                name: '资源重命名',
                component: resourceReName,
                hidden: true
              },
            ]
          }
        ]
      }, {
        path: '/channelList',
        meta: { role: '/channelList' },
        name: '栏目',
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/channelList'
          },
          component: channelList,
        },
        {
          path: '/channelList/update',
          name: '修改栏目',
          meta: {
            role: '/channelList/update'
          },
          component: channelEdit,
        },
        {
          path: '/channelList/save',
          name: '添加栏目',
          meta: {
            role: '/channelList/save'
          },
          component: channelAdd,
        }

        ]
      }, {
        path: '/articleList',
        meta: { role: '/channelList' },
        name: '文章',
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/articleList'
          },
          component: articleList,
        },
        {
          path: '/articleList/update',
          name: '修改文章',
          meta: {
            role: '/articleList/update'
          },
          component: articleEdit,
        },
        {
          path: '/articleList/save',
          name: '添加文章',
          meta: {
            role: '/articleList/save'
          },
          component: articleEdit,
        }

        ]
      }
    ]
  },
  {
    path: '/',
    name: '设置',
    meta: {
      role: '/setConfig'
    },
    component: header,
    iconCls: 'icon-setting',
    children: [
      {
        path: '/updateGlobalInfo',
        name: '全局设置',
        meta: {
          role: '/updateGlobalInfo'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/updateGlobalInfo'
          },
          component: globalEdit,
        },]
      },
      {
        path: '/updateBasiclInfo',
        name: '基本设置',
        meta: {
          role: '/updateBasiclInfo'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/updateBasiclInfo'
          },
          component: basicEdit,
        },]
      },
      {
        path: '/updateEmailInfo',
        name: '邮箱设置',
        meta: {
          role: '/updateEmailInfo'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/updateEmailInfo'
          },
          component: emailEdit,
        },]
      }, {
        path: '/updateSsoInfo',
        name: '单点登录设置',
        meta: {
          role: '/updateSsoInfo'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/updateSsoInfo'
          },
          component: ssoEdit,
        },]
      }, {
        path: '/updateThirdApiInfo',
        name: '第三方登录设置',
        meta: {
          role: '/updateThirdApiInfo'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/updateThirdApiInfo'
          },
          component: thirdApiEdit,
        },]
      },
      {
        path: '/paymentPlugins',
        name: '支付插件',
        meta: {
          role: '/paymentPlugins'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/paymentPlugins'
          },
          component: paymentPluginsList,
        }, {
            path: '/paymentPlugins/update',
            meta: {
              role: '/paymentPlugins/update'
            },
            component: paymentPluginsEdit,
          },]
      },
      {
        path: '/wechatset',
        name: '公众号设置',
        meta: {
          role: '/wechatset'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/wechatset'
          },
          component:weiXinSet,
        },
          {
            path: '/wechatset/wechatmenu',
            name:'自定义菜单',
            meta: {
              role: '/wechatset/wechatmenu'
            },
            component: weiXinMenuList,
          },
          {
            path: '/wechatset/wechatmenusave',
            name: '自定义菜单添加',
            meta: {
              role: '/wechatset/wechatmenusave'
            },
            component: weiXinMenuEdit,
          }, 
          {
            path: '/wechatset/wechatmenuupdate',
            name: '自定义菜单修改',
            meta: {
              role: '/wechatset/wechatmenuupdate'
            },
            component: weiXinMenuEdit,
          }, 
          {
            path: '/wechatset/wechatmessage',
            name: '自定义回复',
            meta: {
              role: '/wechatset/wechatmessage'
            },
            component: weiXinMessageList,
          }, {
            path: '/wechatset/wechatmessagesave',
            name: '自定义回复添加',
            meta: {
              role: '/wechatset/wechatmessagesave'
            },
            component: weiXinMessageEdit,
          }, 
          {
            path: '/wechatset/wechatmessageupdate',
            name: '自定义回复修改',
            meta: {
              role: '/wechatset/wechatmessageupdate'
            },
            component: weiXinMessageEdit,
          }, 
          {
            path: '/wechatset/wechatdefaultMessage',
            name: '默认回复',
            meta: {
              role: '/wechatset/wechatdefaultMessage'
            },
            component: weiXinDefaultMessageEdit,
          }, 
      ]
      },
      {
        path: '/shipList',
        name: '配送方式',
        meta: {
          role: '/shipList'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/shipList'
          },
          component: shipList,
        },
        {
          path: '/shipList/save',
          name: '添加配送方式',
          meta: {
            role: '/shipList/save'
          },
          component: shipEdit,
        },
        {
          path: '/shipList/update',
          name: '修改配送方式',
          meta: {
            role: '/shipList/update'
          },
          component: shipEdit,
        }]
      },
      {
        path: '/webapiaccountlist',
         meta: { role: 'webapiaccountlist' },
        name: 'API接口账户管理',
        component: body,
        children: [
          {
            path: '/', 
            meta: { role: 'webapiaccountlist' },
            component: apiAccountList,
            hidden: true
          }, {
            path: '/addapiinfoaccount', 
            meta: { role: 'addapiinfoaccount' },
            name: '添加api接口账户',
            component: apiAccountEdit,
            hidden: true
          }, {
            path: '/editapiinfoaccount', 
            meta: { role: 'editapiinfoaccount' },
            name: '查看api接口账户',
            component: apiAccountEdit,
            hidden: true
          },
          {
            path: '/apiinfoaccountupdate', 
            meta: { role: 'apiinfoaccountupdate' },
            name: '独立密码修改',
            component: apiAccountUpdate,
            hidden: true
          }
        ]
      },
      {
        path: '/apiInfoList',
        name: 'api接口信息',
        meta: {
          role: '/apiInfoList'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/apiInfoList'
          },
          component: apiInfoList,
        },
        {
          path: '/apiInfoList/save',
          name: 'api接口添加',
          meta: {
            role: '/apiInfoList/save'
          },
          component: apiInfoEdit
        }, {
          path: '/apiInfoList/update',
          name: 'api接口信息修改',
          meta: {
            role: '/apiInfoList/update'
          },
          component: apiInfoEdit
        }]
      }, {
        path: '/apiRecordList',
        name: 'api接口调用记录',
        meta: {
          role: '/apiRecordList'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/apiRecordList'
          },
          component: apiRecordList,
        }]
      }, {
        path: '/ftpList',
        name: 'FTP管理',
        meta: {
          role: '/ftpList'
        },
        component: body,
        children: [{
          path: '/',
          meta: {
            role: '/ftpList'
          },
          component: ftpList,
        }, {
            path: '/ftpList/save',
            name:'添加ftp信息',
            meta: {
              role: '/ftpList/save'
            },
            component: ftpAdd,
          },
          {
            path: '/ftpList/update',
            name: '修改ftp信息',
            meta: {
              role: '/ftpList/update'
            },
            component: ftpEdit,
          },
        ]
      }, {
        path: '/logistics',
        name: '物流公司',
        meta: {
          role: '/logistics'
        },
        component: body,
        children: [
          {
            path: '/',
            meta: {
              role: '/logistics'
            },
            component: logisticsList,
          },
          {
            path: '/logistics/save',
            name:'添加物流公司',
            meta: {
              role: '/logistics'
            },
            component: logisticsEdit,
          }, {
            path: '/logistics/update',
            name: '修改物流公司',
            meta: {
              role: '/logistics/update'
            },
            component: logisticsEdit,
          },{
              path: '/logistics/tmplate',
              name: '打印模版',
              meta: {
                role: '/logistics/tmplate'
              },
              component: logisticsTmplate,
          }
        
        ]
      }]
  }, {
    path: '*',
    name: '404',
    component: error,
    meta: {
      role: 'index'
    },
    hidden: true
  }]
