import store from '@/store/index'
import { userLogin,loginOut} from '@/api/user'
import { Encrypt } from "@/untils/aes";
import { getRand } from "@/untils/random";
const user = {
    state: {
        userName:'none',
         // appId:'7166912116544627',
        // aesKey:'MnYg7Tm8NR1YiYBJ',
        // ivKey:'yToM65IuE64VDoEq',
        // appKey:'5atYoyckDzDPetcaQZlF1VsK1o8qCQPE',
    },
    mutations: {
        LOGING_STATE: (state, params) => {
            debugger;
            localStorage.setItem('sessionKey',params.sessionKey);
            state.userName=localStorage.getItem('userName');
        }
    },
    actions: {
        userLogin({commit}, params) {//登录异步操作
            params.passWord = Encrypt(params.passWord, store.state.sys.aesKey, store.state.sys.ivKey);//加密
            params.nonce_str = getRand();//随机数    
            return new Promise((resolve, reject) => {
                userLogin(params).then(res => {
                    if(res.code==200){
                        localStorage.setItem('userName',params.userName);
                        commit('LOGING_STATE',res.body);  
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error);
                })
            })
        },
        loginOut({commit}){
            return new Promise((resolve, reject) => {
                let params={ nonce_str:getRand()}
                loginOut(params).then(res=>{
                    if(res.code==200){
                        localStorage.clear();//清除登录信息
                        store.dispatch('clearRouters');
                        resolve(true);
                    }
                }).catch(error=>{reject(error)})
            })
        }
    }
}


export default user