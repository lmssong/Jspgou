/*界面管理接口*/
import fetch from '@/untils/fetch'
import path from '@/untils/path'
import qs from 'qs'

export function getResourceTree(params){
    return fetch({
       url:'/api/admin/resource/tree',
       method:'post',
       data:params
    })
  };
/*资源信息获取*/
export function getResourceList(params){
    return fetch({
       url:'/api/admin/resource/list',
       method:'post',
       data:params
    })
  };
  export function getTemplateList(params){
    return fetch({
       url:'/api/admin/template/list',
       method:'post',
       data:params
    })
  };
/*资源详细*/
export function getResourceInfo(params){
    return fetch({
       url:'/api/admin/resource/get',
       method:'post',
       data:params
    })
  };
  
  export function getTemplateInfo(params){
    return fetch({
       url:'/api/admin/template/get',
       method:'post',
       data:params
    })
  };


/*批量删除资源*/
  export function deleteResourceList(params){
    return fetch({
       url:'/api/admin/resource/delete',
       method:'post',
       signValidate:true,
       data:params
    })
  };

  export function deleteTemplateList(params){
    return fetch({
       url:'/api/admin/template/delete',
       method:'post',
       signValidate:true,
       data:params
    })
  };



  /*新建文件夹*/
  export function creatResourceFile(params){
    return fetch({
       url:'api/admin/resource/dir_save',
       method:'post',
       signValidate:true,
       data:params
    })
  };

  export function creatTemplateFile(params){
    return fetch({
       url:'api/admin/template/dir_save',
       method:'post',
       signValidate:true,
       data:params
    })
  };

  



 /*重命名*/
 export function reName(params){
    return fetch({
       url:'/api/admin/resource/rename',
       method:'post',
       signValidate:true,
       data:params
    })
  };  
  
  export function templateReName(params){
    return fetch({
       url:'/api/admin/template/rename',
       method:'post',
       signValidate:true,
       data:params
    })
  }; 


  
  /* 修改模版*/
  export function updateResourceInfo(params){
    return fetch({
       url:'/api/admin/template/update',
       method:'post',
       signValidate:true,
       data:params
    })
  }; 

  /* 修改模版*/
  export function addResourceInfo(params){
    return fetch({
       url:'/api/admin/resource/save',
       method:'post',
       signValidate:true,
       data:params
    })
  }; 
  export function addTemplateInfo(params){
    return fetch({
       url:'/api/admin/template/save',
       method:'post',
       signValidate:true,
       data:params
    })
  }; 


  


export function getTemplateTree(params){
  return fetch({
     url:'/api/admin/template/tree',
     method:'post',
     data:params
  })
};

/**获取方案**/
export function getSolutions(params){
  return fetch({
     url:'/api/admin/template/getSolutions',
     method:'post',
     data:params
  })
};

export function setSolutions(params){
  return fetch({
     url:'/api/admin/template/solutionupdate',
     method:'post',
     signValidate:true,
     data:params
  })
};

/**获取栏目树**/
export function getChannelTree(params) {
  return fetch({
    url: path.getChannelTree,
    method: 'post',
    signValidate: true,
    data: params
  })
};

/**栏目列表**/
export function getChannelList(params) {
  return fetch({
    url: path.getChannelList,
    method: 'post',
    signValidate: true,
    data: params
  })
};

/**获取栏目信息**/
export function getChannelInfo(params) {
  return fetch({
    url: path.getChannelInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
};

/**添加栏目信息**/
export function addChannelInfo(params) {
  return fetch({
    url: path.addChannelInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
};

/**修改栏目信息**/
export function updateChannelInfo(params) {
  return fetch({
    url: path.updateChannelInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
};

/**删除栏目信息**/
export function deleteChannelInfo(params) {
  return fetch({
    url: path.deleteChannelInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
};
/**删除栏目信息**/
export function priorityChannelInfo(params) {
  return fetch({
    url: path.priorityChannelInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
};
/**获取栏目列表**/
export function getChannelTpl(params) {
  return fetch({
    url: path.getChannelTpl,
    method: 'post',
    signValidate: true,
    data: params
  })
};
/**获取父及栏目**/
export function getParentChannelList(params) {
  return fetch({
    url: path.getParentChannelList,
    method: 'post',
    signValidate: true,
    data: params
  })
};

/**文章列表**/
export function getArticleList(params) {
  return fetch({
    url: path.getArticleList,
    method: 'post',
    signValidate: true,
    data: params
  })
};


/**文章信息**/
export function getArticleInfo(params) {
  return fetch({
    url: path.getArticleInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
};

/**文章添加**/
export function addArticleInfo(params) {
  return fetch({
    url: path.addArticleInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
};
/**文章修改**/
export function updateArticleInfo(params) {
  return fetch({
    url: path.updateArticleInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
}; 

/**文章删除**/
export function deleteArticleInfo(params) {
  return fetch({
    url: path.deleteArticleInfo,
    method: 'post',
    signValidate: true,
    data: params
  })
}; 



/**文章跟栏目**/
export function getArticleChannelList(params) {
  return fetch({
    url: path.getArticleChannelList,
    method: 'post',
    signValidate: true,
    data: params
  })
}; 