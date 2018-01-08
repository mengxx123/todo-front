import header from './header'
import footer from './footer'
import nav from './nav'
import page from './page'

export default {
    install: function (Vue) {
        Vue.component('ui-header', header)
        Vue.component('ui-footer', footer)
        Vue.component('ui-nav', nav)
        Vue.component('ui-page', page)
    }
}
