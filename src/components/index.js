import header from './header'
import footer from './footer'
import nav from './nav'

export default {
    install: function (Vue) {
        Vue.component('ui-header', header)
        Vue.component('ui-footer', footer)
        Vue.component('ui-nav', nav)
    }
}
