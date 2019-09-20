import Vue from 'vue'
import Vuex from 'vuex'
import sys from './systemConfig'
import user from './user'
import perms from './permission'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        sys,
        user,
        perms
    }
  })

  export default store