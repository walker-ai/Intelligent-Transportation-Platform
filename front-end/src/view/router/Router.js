import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 关键字: let 和 const。
// let 声明的变量只在 let 命令所在的代码块内有效。
// const 声明一个只读的常量，一旦声明，常量的值就不能改变。
// new的作用是通过构造函数来创建一个实例对象。

// 创建router 对路由进行管理，它是由构造函数 new vueRouter() 创建，接受routes 参数
const router = new VueRouter({
    routes: [{
            path: '/login',  // 路径
            name: 'Login',
            // component是指组件  import引用login.vue地址
            component: ()=>import('../web/login/Login.vue'),
            meta: {
                keepAlive:false,
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: ()=>import('../web/home/Home.vue'),
            meta: {
                keepAlive:false,
            },
            children: [
                {
                    path: 'user_info',
                    name: 'User',
                    component: ()=>import('../web/user/UserInfo.vue')
                }
            ],
        },
        {
            path: '/video',
            name: 'Video',
            component: ()=>import('../web/video/video'),
            meta: {
                keepAlive:false,
            },
        },],
    mode: 'history'
})

// 导出router这个方法函数，便于其他模块引用
export default router