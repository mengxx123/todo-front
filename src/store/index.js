import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)
console.log('use store', Vue)
export default new vuex.Store({
    user: null,
    state: {
        show: false,
        user: null,
        loginState: '',
    }
})
