//引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/index.vue'
import school from '@/views/static/school.vue'
import dorm from '@/views/static/dorm.vue'
import student from '@/views/static/student.vue'
import architecture from '@/views/static/architecture.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
//白名单
const whiteList = [
    "/",
    "/login"
]
import { useUserStore } from '../store/user'

//路由表
const routes = [
    {
        path: '/',//访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
        name: 'home', //命名路由
        component: Index,
        children:[
            {
                path: '/school',//访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
                name: 'school', //命名路由
                component: school,   //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
            },
            {
                path: '/architecture',//访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
                name: 'architecture', //命名路由
                component: architecture,   //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
            },
            {
                path: '/dorm',//访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
                name: 'dorm', //命名路由
                component: dorm,   //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
            },
            {
                path: '/student',//访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf 
                name: 'student', //命名路由
                component: student,   //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
            },
        ]   //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
    },
    {
        path: '/adcate',
        name: 'adCate',
        component: () => import('../views/static/adCate.vue')// 懒加载
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/static/login.vue')// 懒加载
    },
    {
        path: '/admin',
        name: 'admin',
        component: LayoutAdmin,
        children: [
            {
                path: '',
                name: 'admin-index',
                component: () => import('@/views/admin/index.vue')
            },
            {
                path: 'info',
                name: 'admin-info',
                component: () => import('@/views/admin/info.vue')
            },
            {
                path: 'logout',
                name: 'admin-logout',
                component: () => import('@/views/admin/logout.vue')
            }, {
                path: 'changepassword',
                name: 'admin-changepassword',
                component: () => import('@/views/admin/changepassword.vue')
            },
            {
                path: 'forgetpassword',
                name: 'admin-forgetpassword',
                component: () => import('@/views/admin/forgetpassword.vue')
            }

        ]
    },



    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')// 懒加载  
    }

]
const router = createRouter({
    //模式
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (whiteList.includes(to.path)) {
        next();
    }
    else {

        if(userStore.token&&userStore.token.length>0){
            next()
        }
        else{
           next({name:"login"}) 
        }
        
    }


})
export default router;