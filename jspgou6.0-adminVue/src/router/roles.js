import path from '@/untils/path'

/**
 * 
 * {
    name: '',
    role: '',
    api: [],
    children:[]
  }
 * 
 */
const roles = [{
  name: '首页',
  role: 'index',
  isHidden: true,
  api: [
    path.getLoginUser,
    path.loginOut,
    path.getUser,
    path.creatIndex,
    path.chatStatistics,
    path.getStatistics,
    path.unDealStatistics,
    path.saleStatistics,
    path.getSystemMemory,
  ]
},
{
  name: '商品',
  role: 'commodity',
  api: [],
  children: [
    {
      name: '商品管理',
      role: '/productList',
      api: [
        path.getCommodityCategoryTree,
        path.getProductList,
        path.getModelInfo,
        path.getProductInfo,
        path.getCommodityCategoryInfo,
        path.getCommodityTopCategory,
        path.getBrandListByCategoryId,
        path.getCommodityStandardType
      ],
      children: [
        {
          name: '修改',
          role: '/productList/update',
          api: [
            path.updateProductList
          ]
        },
        {
          name: '删除',
          role: '/productList/delete',
          api: [
            path.deleteProductList
          ]
        }
      ]
    }, {
      name: '商品发布',
      role: '/addproduct',
      api: [
        '/productList/save',
        path.getCommodityCategoryTree,
        path.getProductList,
        path.getModelInfo,
        path.getProductInfo,
        path.getCommodityCategoryInfo,
        path.getCommodityTopCategory,
        path.getBrandListByCategoryId,
        path.getCommodityStandardType,
        path.addProductList
      ],
    },
    {
      name: '分类管理',
      role: '/commodityCategoryList',
      api: [
        path.getCommodityCategoryTree,
        path.getModelListAll,
        path.getCommodityCategoryList,
        path.getCommodityCategoryInfo,
        path.getModelInfo,
        path.getCommodityTopCategory,
        path.getCommodityTemplate,
        path.getCommodityBrand,
        path.getCommodityStandardType,

      ],
      children: [
        {
          name: '添加',
          role: '/commodityCategoryList/save',
          api: [
            path.addCommodityCategoryInfo
          ],
        },
        {
          name: '删除',
          role: '/commodityCategoryList/delete',
          api: [
            path.deleteCommodityCategoryInfo
          ],
        },
        {
          name: '修改',
          role: '/commodityCategoryList/update',
          api: [
            path.updateCommodityCategoryInfo
          ],
        }, {
          name: '排序',
          role: '/commodityCategoryList/priority',
          api: [path.priorityCommodityCategoryInfo,],
        }
      ]
    },
    {
      name: '品牌管理',
      role: '/brandList',
      api: [
        path.getBrandList,
        path.getBrandInfo,
        path.getBrandTypeInfo,
        path.getBrandList,
      ],
      children: [
        {
          name: '添加',
          role: '/brandList/save',
          api: [
            path.addBrandInfo
          ],
        },
        {
          name: '删除',
          role: '/brandList/delete',
          api: [
            path.deleteBrandInfo
          ],
        },
        {
          name: '修改',
          role: '/brandList/update',
          api: [
            path.updateBrandInfo
          ],
        }, {
          name: '排序',
          role: '/brandList/priority',
          api: [
            path.priorityBrandInfo
          ],
        }
      ]
    },
    {
      name: '规格管理',
      role: '/standardList',
      api: [
        path.getStandardList,
        path.getStandardInfo,

      ],
      children: [
        {
          name: '添加',
          role: '/standardList/save',
          api: [
            path.addStandardInfo
          ],
        },
        {
          name: '删除',
          role: '/standardList/delete',
          api: [
            path.deleteStandardInfo
          ],
        },
        {
          name: '修改',
          role: '/standardList/update',
          api: [
            path.updateStandardInfo
          ],
        }, {
          name: '排序',
          role: '/standardList/priority',
          api: [
            path.priorityStandardInfo,
          ],
        }
      ]
    },
    {
      name: '类型管理',
      role: '/typeList',
      api: [
        path.getModelList,
        path.getTypeInfo,
        path.getModelInfo,
      ],
      children: [
        {
          name: '添加',
          role: '/typeList/save',
          api: [
            path.addTypeInfo
          ],
        },
        {
          name: '删除',
          role: '/typeList/delete',
          api: [
            path.deleteTypeInfo
          ],
        },
        {
          name: '修改',
          role: '/typeList/update',
          api: [
            path.updateTypeInfo
          ],
        }
      ]
    },
    {
      name: '商品咨询',
      role: '/consultList',
      api: [
        path.getConsultInfo,
        path.getConsultList
      ],
      children: [
        {
          name: '回复/查看',
          role: '/consultList/update',
          api: [
            path.updateConsultInfo
          ],
        },
        {
          name: '修改',
          role: '/consultList/update',
          api: [
            path.updateConsultInfo
          ],
        },
        {
          name: '删除',
          role: '/consultList/delete',
          api: [
            path.deleteConsultInfo
          ],
        },
      ]
    },
  ]
},
{
  name: '订单',
  role: 'orderMange',
  api: [],
  children: [
    {
      name: '订单管理',
      role: '/order',
      api: [
        path.getOrderList,
        path.getOrderInfo,
        path.getShopShipmentsList
      ],
      children: [
        {
          name: '查看',
          role: '/order/update',
          api: [
            path.updateOrderInfo
          ],
        },
        {
          name: '操作',
          role: '/order/mange',
          api: [
            path.payOrderInfo,
            path.enterOrderInfo,
            path.cannelOrderInfo,
            path.doneOrderInfo,
            path.saveOrderInfo,
          ],
        },
        {
          name: '删除',
          role: '/order/delete',
          api: [path.deleteOrderInfo,],
        },
      ]
    },
    {
      name: '打印快递单',
      role: '/shipmentsList',
      api: [
        path.getShipmentsList,
        path.getShipmentsInfo
      ],
      children: [
        {
          name: '查看',
          role: '/shipmentsList/update',
          api: [path.getShipmentsInfo]
        },
        {
          name: '操作',
          role: '/shipmentsList/mange',
          api: [
            path.isPrintShipmentsInfo
          ]
        },
        {
          name: '删除',
          role: '/shipmentsList/delete',
          api: [
            path.deleteShipmentsInfo
          ]
        }
      ]
    },
    {
      name: '发货信息管理',
      role: '/shopShipments',
      api: [
        path.getShopShipmentsList,
        path.getShopShipmentsInfo
      ],
      children: [
        {
          name: '添加',
          role: '/shopShipments/save',
          api: [
            path.addShopShipmentsInfo
          ]
        },
        {
          name: '修改',
          role: '/shopShipments/update',
          api: [
            path.updateShopShipmentsInfo
          ]
        },
        {
          name: '删除',
          role: '/shopShipments/delete',
          api: [
            path.deleteShopShipmentsInfo
          ]
        }
      ]
    },
    {
      name: '退货退款订单',
      role: '/orderReturn',
      api: [
        path.getOrderReturnList,
        path.getOrderReturnInfo,
      ],
      children: [
        {
          name: '操作',
          role: '/orderReturn/update',
          api: [
            path.affirmOrderReturnInfo,
            path.sendbackOrderReturnInfo,
            path.receiveOrderReturnInfo,
            path.refundOrderReturnInfo,

          ]
        },
        {
          name: '删除',
          role: '/orderReturn/delete',
          api: [
            path.deleteOrderReturnInfo
          ]
        }
      ]
    }

  ]
},

{
  name: '运营',
  role: 'operation',
  api: [],
  children: [
    {
      name: '管理员',
      role: 'adminList',
      api: [
        path.getAdminList,
        path.getAdminInfo
      ],
      children: [
        {
          name: '添加',
          role: 'addAdmin',
          api: [
            path.addAdminInfo,
            path.getRoleList
          ]
        },
        {
          name: '修改',
          role: 'updateAdmin',
          api: [
            path.updateAdminInfo,
            path.getRoleList
          ]
        },
        {
          name: '删除',
          role: 'deleteAdmin',
          api: [
            path.deleteAdminInfo,
          ]
        }
      ]
    }, {
      name: '角色管理',
      role: '/roleList',
      api: [
        path.getRoleList,
        path.getRoleInfo,
      ],
      children: [
        {
          name: '添加',
          role: '/role/save',
          api: [
            path.addRoleInfo
          ]
        },
        {
          name: '修改',
          role: '/role/update',
          api: [
            path.updateRoleInfo
          ]
        },
        {
          name: '删除',
          role: '/role/delete',
          api: [
            path.deleteRoleInfo
          ]
        },
      ]
    },
    {
      name: '广告版位',
      role: '/adspace',
      api: [
        path.getAdspaceList,
        path.getAdspaceInfo,
      ], children: [
        {
          name: '添加',
          role: '/adspace/save',
          api: [
            path.addAdspaceInfo
          ]
        },
        {
          name: '修改',
          role: '/adspace/update',
          api: [
            path.updateAdspaceInfo
          ]
        },
        {
          name: '删除',
          role: '/adspace/delete',
          api: [
            path.deleteAdspaceInfo
          ]
        },
      ]
    }, {
      name: '广告管理',
      role: '/advertise',
      api: [
        path.getAdspaceList,
        path.getAdvertiseList,
        path.getAdvertiseInfo
      ], children: [
        {
          name: '添加',
          role: '/advertise/save',
          api: [
            path.addAdvertiseInfo
          ]
        },
        {
          name: '修改',
          role: '/advertise/update',
          api: [
            path.updateAdvertiseInfo
          ]
        },
        {
          name: '删除',
          role: '/advertise/delete',
          api: [
            path.deleteAdvertiseInfo
          ]
        },
      ]
    },
    {
      name: '优惠卷',
      role: '/coupon',
      api: [
        path.getCouponList,
        path.getCommodityTopCategory,
        path.getCouponInfo
      ],
      children: [
        {
          name: '添加',
          role: '/coupon/save',
          api: [
            path.addCouponInfo
          ]
        }, {
          name: '删除',
          role: '/coupon/delete',
          api: [
            path.deleteCouponInfo
          ]
        },
      ]
    },
    {
      name: '在线客服',
      role: '/customerService',
      api: [
        path.getCustomerServiceList,
        path.getCustomerServiceInfo,

      ],
      children: [
        {
          name: '添加',
          role: '/customerService/save',
          api: [
            path.addCustomerServiceInfo
          ]
        }, {
          name: '修改',
          role: '/customerService/save',
          api: [
            path.updateCustomerServiceInfo
          ]
        }, {
          name: '排序',
          role: '/customerService/priority',
          api: [
            path.priorityCustomerServiceInfo
          ]
        },
        {
          name: '删除',
          role: '/customerService/delete',
          api: [
            path.deleteCustomerServiceInfo
          ]
        },
      ]
    },
    {
      name: '首页海报',
      role: '/poster',
      api: [
        path.getPosterList,
      ],
      children: [
        {
          name: '添加',
          role: '/poster/save',
          api: [
            path.updatePosterInfo
          ]
        }, {
          name: '查看',
          role: '/poster/list',
          api: [path.getPosterList]
        },
      ]
    }
    , {
      name: '系统操作日志',
      role: '/syslog',
      api: [
        path.getLogList,
      ],
    }
  ]
}, {
  name: '用户',
  role: 'userMange',
  api: [],
  children: [
    {
      name: '用户管理',
      role: '/userList',
      api: [
        path.getUserList,
        path.getUserInfo,
        path.getDictTypeId,
        path.getRankList
      ],
      children: [
        {
          name: '添加',
          role: '/userList/save',
          api: [
            path.addUserInfo
          ],
        }, {
          name: '修改',
          role: '/userList/update',
          api: [path.updateUserInfo],
        },
        {
          name: '删除',
          role: '/userList/delete',
          api: [path.deleteUserInfo],
        }

      ]
    },
    {
      name: '用户等级',
      role: '/rankList',
      api: [
        path.getRankList,
        path.getRankInfo
      ],
      children: [
        {
          name: '添加',
          role: '/rankList/save',
          api: [],
        }, {
          name: '修改',
          role: '/rankList/update',
          api: [],
        },
        {
          name: '删除',
          role: '/rankList/delete',
          api: [],
        }

      ]
    }, {
      name: '数据字典',
      role: '/dictList',
      api: [
        path.getDictList,
        path.getDictTypeAll
      ],
      children: [
        {
          name: '添加',
          role: '/dictList/save',
          api: [
            path.addDictInfo
          ],
        }, {
          name: '修改',
          role: '/dictList/update',
          api: [path.updateDictInfo],
        },
        {
          name: '删除',
          role: '/dictList/delete',
          api: [path.deleteDictInfo],
        }, {
          name: '修改',
          role: '/dictList/priority',
          api: [path.priorityDictInfo],
        },

      ]
    }, {
      name: '字典类型',
      role: '/dictTypeList',
      api: [
        path.getDictTypeList,
        path.getDictTypeInfo
      ],
      children: [
        {
          name: '添加',
          role: '/dictTypeList/save',
          api: [path.addDictTypeInfo],
        }, {
          name: '修改',
          role: '/dictTypeList/update',
          api: [path.updateDictTypeInfo],
        },
        {
          name: '删除',
          role: '/dictTypeList/delete',
          api: [path.deleteDictTypeInfo],
        }

      ]
    },
    {
      name: '站内信',
      role: '/messageList',
      api: [
        path.getMessageList,
        path.getReceivemessageList,
        path.getRecycleMessageList,
        path.getRemoveMessageList,
        path.getMessageInfo
      ],
      children: [
        {
          name: '添加',
          role: '/messageList/save',
          api: [path.addMessageInfo],
        },
        {
          name: '删除',
          role: '/messageList/delete',
          api: [path.deleteMessageList],
        }

      ]
    }
  ]
},
{
  name: '界面',
  role: 'interface',
  children: [
    {
      name: '资源',
      role: 'resourcelist',
      api: [
        '/api/admin/resource/list',
        '/api/admin/resource/tree',
        '/api/admin/resource/get'
      ],
      children: [{
        name: '添加',
        role: 'resourceadd',
        api: [
          '/api/admin/resource/dir_save',
          '/api/admin/resource/save'
        ]
      },
      {
        name: '修改',
        role: 'resourceedit',
        api: [
          '/api/admin/resource/dir_save',
          '/api/admin/template/update'
        ]
      }, {
        name: '删除',
        role: 'resourcedelete',
        api: [
          '/api/admin/resource/delete'
        ]
      },
      {
        name: '重命名',
        role: 'resourcerename',
        api: [
          '/api/admin/resource/rename'
        ]
      }, {
        name: '上传',
        role: 'resourcereupload',
        api: [
          '/api/admin/resource/upload'
        ]
      }
      ]
    },
    {
      name: '模版',
      role: 'templatelist',
      api: [
        '/api/admin/template/list',
        '/api/admin/template/tree',
        '/api/admin/template/get'
      ],
      children: [{
        name: '添加',
        role: 'templateadd',
        api: [
          '/api/admin/template/dir_save',
          '/api/admin/template/save'
        ]
      },
      {
        name: '修改',
        role: 'templateedit',
        api: [
          '/api/admin/template/dir_save',
          '/api/admin/template/update'
        ]
      }, {
        name: '删除',
        role: 'templatedelete',
        api: [
          '/api/admin/template/delete'
        ]
      },
      {
        name: '重命名',
        role: 'templaterename',
        api: [
          '/api/admin/template/rename'
        ]
      }, {
        name: '上传',
        role: 'templateupload',
        api: [
          '/api/admin/template/upload'
        ]
      }, {
        name: '模版设置',
        role: 'templatesetting',
        api: [
          '/api/admin/resource/upload',
          '/api/admin/template/getSolutions',
          '/api/admin/template/solutionupdate'
        ]
      }
      ]
    }, {
      name: '栏目',
      role: '/channelList',
      api: [
        path.getChannelTree,
        path.getChannelList,
        path.getChannelInfo,
        path.getChannelTpl
      ],
      children: [
        {
          name: '添加',
          role: '/channelList/save',
          api: [
            path.addChannelInfo,

          ],
        }, {
          name: '修改',
          role: '/channelList/update',
          api: [
            path.updateChannelInfo,
          ],
        },
        {
          name: '删除',
          role: '/channelList/delete',
          api: [
            path.deleteChannelInfo,
          ],
        },
        {
          name: '排序',
          role: '/channelList/priority',
          api: [
            path.priorityChannelInfo,
          ],
        }
      ]
    },
    {
      name: '文章',
      role: '/articleList',
      api: [
        path.getChannelTree,
        path.getChannelList,
        path.getArticleChannelList,
        path.getParentChannelList,
        path.getArticleList,
        path.getArticleInfo,
        path.getChannelTpl
      ],
      children: [
        {
          name: '添加',
          role: '/articleList/save',
          api: [
            path.addArticleInfo,

          ],
        }, {
          name: '修改',
          role: '/articleList/update',
          api: [
            path.updateArticleInfo,
          ],
        },
        {
          name: '删除',
          role: '/articleList/delete',
          api: [
            path.deleteArticleInfo,
          ],
        }

      ]
    }
  ]
},
{
  name: '设置',
  role: '/setConfig',
  api: [],
  children: [
   
    {
      name: '全局设置',
      role: '/updateGlobalInfo',
      api: [
        path.getGlobalInfo,
        path.updateGlobalInfo,
      ]
    },
    {
      name: '基本设置',
      role: '/updateBasiclInfo',
      api: [
        path.getBasicInfo,
        path.updateBasicInfo,
      ]
    },
    {
      name: '邮箱设置',
      role: '/updateEmailInfo',
      api: [
        path.getEmailInfo,
        path.updateEmailInfo,
      ]
    },
    {
      name: '单点登录设置',
      role: '/updateSsoInfo',
      api: [
        path.getSsoInfo,
        path.updateSsoInfo,
      ]
    }, {
      name: '第三方登录设置',
      role: '/updateThirdApiInfo',
      api: [
        path.getThirdApiInfo,
        path.updateThirdApiInfo,
      ]
    }, {
      name: '支付插件',
      role: '/paymentPlugins',
      api: [
        path.getPaymentPluginsList,
        path.getPaymentPluginsInfo,
      ],
      children: [
        {
          name: '修改',
          role: '/paymentPlugins/update',
          api: [
            path.updatePaymentPluginsInfo,
          ],
        },
        {
          name: '排序',
          role: '/paymentPlugins/priority',
          api: [
            path.priorityPaymentPluginsInfo
          ],
        }

      ]
    },
    {
      name: '公众号设置',
      role: '/wechatset',
      api: [
        path.getWeiXinSetInfo,
        path.updateWeiXinSetInfo,
      ]
    },
    {
      name: '自定义菜单',
      role: '/wechatset/wechatmenu',
      api: [
        path.getWeiXinMenuList,
        path.getWeiXinMenuInfo,
      ],
      children: [
        {
          name: '添加',
          role: '/wechatset/wechatmenusave',
          api: [
            path.addWeiXinMenuInfo,
          ],
        }, {
          name: '删除',
          role: '/wechatset/wechatmenudelete',
          api: [
            path.deleteWeiXinMenuInfo,
          ],
        }, {
          name: '修改',
          role: '/wechatset/wechatmenuupdate',
          api: [
            path.updateWeiXinMenuInfo
          ],
        },
      ]
    },
    {
      name: '自定义回复',
      role: '/wechatset/wechatmessage',
      api: [
        path.getWeiXinMessageList,
        path.getWeiXinMessageInfo,
      ],
      children: [
        {
          name: '添加',
          role: '/wechatset/wechatmessagesave',
          api: [
            path.addWeiXinMessageInfo,
          ],
        }, {
          name: '删除',
          role: '/wechatset/wechatmessagedelete',
          api: [
            path.deleteWeiXinMessageInfo,
          ],
        }, {
          name: '修改',
          role: '/wechatset/wechatmessageupdate',
          api: [
            path.updateWeiXinMessageInfo
          ],
        },
      ]
    },
    {
      name: '默认回复',
      role: '/wechatset/wechatdefaultMessage',
      api: [
        path.getDefaultWeiXinMessageInfo,
        path.updateDefaultWeiXinMessageInfo,
      ]
    },
    {
      name: '配送方式',
      role: '/shipList',
      api: [
        path.getShipList,
        path.getShipInfo,
      ],
      children: [
        {
          name: '添加',
          role: '/shipList/save',
          api: [
            path.addShipInfo,

          ],
        }, {
          name: '修改',
          role: '/shipList/update',
          api: [
            path.updateShipInfo,
          ],
        },
        {
          name: '删除',
          role: '/shipList/delete',
          api: [
            path.deleteShipInfo,
          ],
        },
        {
          name: '排序',
          role: '/shipList/priority',
          api: [
            path.priorityShipInfo
          ],
        }

      ]
    },
    {
      name: 'api接口账户管理',
      role: 'webapiaccountlist',
      api: [
        path.getApiAccountList,
        path.getApiAccountInfo,
        path.getApiAccountList,

      ],
      children: [
        {
          name: '添加',
          role: 'addapiinfoaccount',
          api: [
            path.addApiAccountInfo,
          ],
        }, {
          name: '独立密码修改',
          role: 'apiinfoaccountupdate',
          api: [
            path.updateApiPassword,
            path.checkApiPassword
          ],
        },
        {
          name: '查看',
          role: 'editapiinfoaccount',
          api: [
            path.checkApiPassword
          ],
        }
      ]
    },

    {
      name: 'api接口信息',
      role: '/apiInfoList',
      api: [
        path.getApiInfoList,
        path.getApiInfo
      ],
      children: [
        {
          name: '添加',
          role: '/getApiInfoList/save',
          api: [
            path.addApiInfo
          ],
        }, {
          name: '修改',
          role: '/getApiInfoList/update',
          api: [
            path.updateApiInfo
          ],
        },
        {
          name: '删除',
          role: '/getApiInfoList/delete',
          api: [
            path.deleteApiInfo
          ],
        }
      ]
    },
    {
      name: 'api接口调用记录',
      role: '/apiRecordList',
      api: [
        path.getApiRecordList
      ],
      children: [
        {
          name: '删除',
          role: '/apiRecordList/delete',
          api: [
            path.deleteApiRecordInfo
          ],
        }

      ]
    },
    {
      name: ' FTP管理',
      role: '/ftpList',
      api: [
        path.getFtpList,
        path.getFtpInfo,
      ],
      children: [
        {
          name: '添加',
          role: '/ftpList/save',
          api: [
            path.addFtpInfo,
          ],
        }, {
          name: '修改',
          role: '/ftpList/update',
          api: [
            path.updateFtpInfo,
          ],
        },
        {
          name: '删除',
          role: '/ftpList/delete',
          api: [
            path.deleteFtpInfo,
          ],
        }
      ]
    },
    {
      name: ' 物流公司',
      role: '/logistics',
      api: [
        path.getLogisticsList,
        path.getLogisticsInfo,
      ],
      children: [
        {
          name: '添加',
          role: '/logistics/save',
          api: [
            path.addLogisticsInfo,
          ],
        }, {
          name: '修改',
          role: '/logistics/update',
          api: [
            path.updateLogisticsInfo,
          ],
        },
        {
          name: '删除',
          role: '/logistics/delete',
          api: [
            path.deleteLogisticsInfo,
          ],
        },
        {
          name: '排序',
          role: '/logistics/priority',
          api: [
            path.priorityLogisticsInfo,
          ],
        }
      ]
    }
  ]
},
  {
    name: '上传',
    role: '/upload',
    api: [
      '/api/admin/upload/upload']
  },

]
export default roles