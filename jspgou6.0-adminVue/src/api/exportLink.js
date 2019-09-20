import qs from 'qs'
import store from '@/store/index'

export function incomeStatisticExport(params){//收益统计导出
    let link='/api/admin/data/incomeStatistic_export'
    params.appId = store.state.sys.appId;
    params.sessionKey=localStorage.getItem('sessionKey');
    let url=link+'?'+qs.stringify(params);
    return url   
}

export function forumStatisticExport(params){//数据中心导出
    let link='/api/admin/data/forumstatistic_export'
    params.appId = store.state.sys.appId;
    params.sessionKey=localStorage.getItem('sessionKey');
    let url=link+'?'+qs.stringify(params);
    return url   
}

export function templateExport(params){//模版导出
    let link='/api/admin/template/exportTpl'
    params.appId=store.state.sys.appId;
    params.sessionKey=localStorage.getItem('sessionKey');
    let url=link+'?'+qs.stringify(params);
    return url   
}



