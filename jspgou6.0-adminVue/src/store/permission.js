import store from '@/store/index'
import { getLoginUser } from '@/api/user'
import { Encrypt } from "@/untils/aes";
import { getRand } from "@/untils/random";
import { routes, ansycRoutes } from '@/router/routes'
/*
 * 
 * @param {异步路由表} ansycRoutes 
 * @param {数据库权限拉取} perms 
 */
function getansycRoutes(tmpRoutes, perms) {//处理角色权限
    const result = tmpRoutes.filter(route => {
         if (perms.indexOf(route.meta.role) != -1) {
             if (route.children != undefined) {
                 route.children = getansycRoutes(route.children, perms);
             }
             return true;
         }
         return false;
     }
     )
     return result
 }
const perm={
    state:{
        routers:routes,
        addRouters:[],
        perms:false//判断是否刷新过页面
    },
    mutations:{
        SET_ROUTERS:(state,asRouters)=>{
            state.routers=routes.concat(asRouters);
            state.addRouters=asRouters;
            state.perms=true;
        },
        CLEAR_ROUTERS:(state)=>{
            state.routers=routes;
            state.addRouters=[];
            state.perms=false;
            window.location.reload();//此处退出vuex状态不刷新，目前发现重载页面可以处理。。
        }  
    },
    actions:{
        setRouters({commit}){
            return new Promise((resolve, reject)=>{//动态加载路由权限
                 getLoginUser({ nonce_str:getRand()})
                 .then(res=>{                 
                    let asRouters;
                    debugger;
                     if(res.body.permission=='*'){
                        asRouters=ansycRoutes;
                     }else{
                        asRouters = getansycRoutes(ansycRoutes,res.body.permission);//递归过滤
                     }
                    commit('SET_ROUTERS',asRouters);
                    resolve();
                 })     
            })
        },
        clearRouters({commit}){
            return new Promise((resolve,reject)=>{
                commit('CLEAR_ROUTERS');
                resolve();
            })
        }
    }

}

export default perm