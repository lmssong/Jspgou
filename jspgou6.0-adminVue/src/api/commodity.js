import fetch from '@/untils/fetch'
import path from '@/untils/path'

/**获取商品列表*/
export function getProductList(params) {
    return fetch({
        url: path.getProductList,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}
/**获取商品信息*/
export function getProductInfo(params) {
    return fetch({
        url: path.getProductInfo,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}
/**通过分类id查询关联品牌*/
export function getBrandListByCategoryId(params) {
    return fetch({
        url: path.getBrandListByCategoryId,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}


/**添加商品*/
export function addProductList(params) {
    return fetch({
        url: path.addProductList,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}
/**修改商品*/
export function updateProductList(params) {
    return fetch({
        url: path.updateProductList,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}

/**删除商品*/
export function deleteProductList(params) {
    return fetch({
        url: path.deleteProductList,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}


/**获取商品分类树形 */
export function getCommodityCategoryTree(params) {
    return fetch({
        url: path.getCommodityCategoryTree,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

/**获取商品分类列表 */
export function getCommodityCategoryList(params) {
    return fetch({
        url: path.getCommodityCategoryList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

/**获取商品分类信息 */
export function getCommodityCategoryInfo(params) {
    return fetch({
        url: path.getCommodityCategoryInfo,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

/**热销商品*/
export function getHotList(params) {
    return fetch({
        url: path.getHotList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}
/**库存预警*/
export function getSaleChatList(params) {
    return fetch({
        url: path.getSaleChatList,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


/**添加商品分类信息 */
export function addCommodityCategoryInfo(params) {
    return fetch({
        url: path.addCommodityCategoryInfo,
        method: 'post',
        data: params,
        nonceStr:true,
        signValidate: true,
    })
}

/**修改商品分类信息 */
export function updateCommodityCategoryInfo(params) {
    return fetch({
        url: path.updateCommodityCategoryInfo,
        method: 'post',
        data: params,
        nonceStr: true,
        signValidate: true,
    })
}



/**获取商品分类上级分类 */

export function getCommodityTopCategory(params) {
    return fetch({
        url: path.getCommodityTopCategory,
        method: 'post',
        data: params,
        signValidate: true,
    })
}


/**获取商品分类模版 */
export function getCommodityTemplate(params) {
    return fetch({
        url: path.getCommodityTemplate,
        method: 'post',
        data: params,
        signValidate: true,
    })
}

/**获取商品分类关联品牌 */
export function getCommodityBrand(params) {
    return fetch({
        url: path.getCommodityBrand,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**获取商品分类关联规格 */
export function getCommodityStandardType(params) {
    return fetch({
        url: path.getCommodityStandardType,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}


/**品牌列表 */
export function getBrandList(params) {
    return fetch({
        url: path.getBrandList,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
/**品牌信息获取 */
export function getBrandInfo(params) {
    return fetch({
        url: path.getBrandInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
/**品牌信息获取 */
export function getBrandTypeInfo(params) {
    return fetch({
        url: path.getBrandTypeInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}


/**品牌信息添加 */
export function addBrandInfo(params) {
    return fetch({
        url: path.addBrandInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**品牌信息修改 */
export function updateBrandInfo(params) {
    return fetch({
        url: path.updateBrandInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
/**品牌信息删除*/
export function deleteBrandInfo(params) {
    return fetch({
        url: path.deleteBrandInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**品牌信息排序*/
export function priorityBrandInfo(params) {
    return fetch({
        url: path.priorityBrandInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}





/**删除商品分类信息 */
export function deleteCommodityCategoryInfo(params) {
    return fetch({
        url: path.deleteCommodityCategoryInfo,
        method: 'post',
        nonceStr:true,
        data: params,
        signValidate: true,
    })
}

/**商品分类信息排序 */
export function priorityCommodityCategoryInfo(params) {
    return fetch({
        url: path.priorityCommodityCategoryInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}


/**规格列表 */
export function getStandardList(params) {
    return fetch({
        url: path.getStandardList,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**规格信息获取 */
export function getStandardInfo(params) {
    return fetch({
        url: path.getStandardInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
/**添加规格信息 */
export function addStandardInfo(params) {
    return fetch({
        url: path.addStandardInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
/**修改规格信息 */
export function updateStandardInfo(params) {
    return fetch({
        url: path.updateStandardInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
/**删除规格信息 */
export function deleteStandardInfo(params) {
    return fetch({
        url: path.deleteStandardInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**排序规格信息 */
export function priorityStandardInfo(params) {
    return fetch({
        url: path.priorityStandardInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}




/**获取类型信息 */
export function getTypeInfo(params) {
    return fetch({
        url: path.getTypeInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**添加类型信息 */
export function addTypeInfo(params) {
    return fetch({
        url: path.addTypeInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}


/**修改类型信息 */
export function updateTypeInfo(params) {
    return fetch({
        url: path.updateTypeInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**删除类型信息 */
export function deleteTypeInfo(params) {
    return fetch({
        url: path.deleteTypeInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}


/**
 * 模型列表 （带分页）
 */

export function getModelList(params) {
    return fetch({
        url: path.getModelList,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
/**
 * 模型列表 （不带分页，给其他组件使用）
 */

export function getModelListAll(params) {
    return fetch({
        url: path.getModelListAll,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

/**
 * 模型信息
 */
export function getModelInfo(params) {
    return fetch({
        url: path.getModelInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

//顾客资讯列表
export function getConsultList(params) {
    return fetch({
        url: path.getConsultList,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
//顾客资讯信息
export function getConsultInfo(params) {
    return fetch({
        url: path.getConsultInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

//顾客资讯回复修改
export function updateConsultInfo(params) {
    return fetch({
        url: path.updateConsultInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

//顾客资讯删除
export function deleteConsultInfo(params) {
    return fetch({
        url: path.deleteConsultInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

//评价列表
export function getDiscussList(params) {
    return fetch({
        url: path.getDiscussList,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
//评价列表信息
export function getDiscussInfo(params) {
    return fetch({
        url: path.getDiscussInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
//评价列表修改
export function updateDiscussInfo(params) {
    return fetch({
        url: path.updateDiscussInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
//评价列表删除
export function deleteDiscussInfo(params) {
    return fetch({
        url: path.deleteDiscussInfo,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}


//保存默认字段
export function addDefaultTypeProperty(params) {
    return fetch({
        url: path.addDefaultTypeProperty,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
//保存内容
export function addTypePropertyContent(params) {
    return fetch({
        url: path.addTypePropertyContent,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}

//删除内容
export function deleteTypePropertyContent(params) {
    return fetch({
        url: path.deleteTypePropertyContent,
        method: 'post',
        nonceStr: true,
        data: params,
        signValidate: true,
    })
}
