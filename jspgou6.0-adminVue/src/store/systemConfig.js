
const systemConfig={
    state:{
         appId:'7166912116544627',
         aesKey:'MnYg7Tm8NR1YiYBJ',
         ivKey:'yToM65IuE64VDoEq',
         appKey:'5atYoyckDzDPetcaQZlF1VsK1o8qCQPE',
        baseUrl:process.env.Base_URL,
        upLoadUrl:process.env.Base_URL+'/api/admin/upload/upload',
        resourceUpLoad: process.env.Base_URL +'/api/admin/resource/upload',
        templateUpLoad: process.env.Base_URL +'/api/admin/template/upload',
        importTpl: process.env.Base_URL +'/api/admin/template/importTpl',
        collapse:false,
    },
    mutations:{
        CHANGE_SET:(state,value)=>{
            state.collapse=!state.collapse;
        }
    },
    actions:{
        setCollapse({commit}){
            commit('CHANGE_SET');
            }
    }
}

export default systemConfig