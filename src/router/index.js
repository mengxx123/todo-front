import Vue from 'vue'
import Router from 'vue-router'

const About = resolve => require(['@/views/About'], resolve)
const Todo = resolve => require(['@/views/Todo'], resolve)
const Tomato = resolve => require(['@/views/Tomato'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

const APP_NAME = '云设'

let routes = [
    {
        path: '/',
        component: Tomato,
        redirect: '/tomato'
    },
    {
        path: '/tomato',
        component: Tomato,
        meta: {
            title: '番茄工作法'
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: '关于'
        }
    },
    {
        path: '/todo',
        component: Todo,
        meta: {
            title: '待办事项'
        }
    },
    {
        path: '/help',
        component: Help,
        meta: {
            title: '帮助'
        }
    },
    {
        path: '/404',
        component: Error404,
        meta: {
            title: '页面找不到了'
        }
    },
    {
        path: '*',
        redirect: '/404'
    }
]

function getTitle(title) {
    if (title) {
        return title
    } else {
        return APP_NAME
    }
}

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = getTitle(to.meta.title)
    } else {
        document.title = getTitle()
    }
    next()
})

export default router
