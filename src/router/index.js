import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue';
import LoginView from "../views/login/LoginView.vue";
import RegisterView from "../views/login/RegisterView.vue";
import ShopView from "../views/shop/ShopView.vue";
const routes = [
    {
        path: '/',
        name: 'HomeView',
        // component: HomeView
        component: () => import(/* webpackChunkName: "home" */ '../views/home/HomeView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        // component: LoginView,
        component: () => import(/* webpackChunkName: "Login" */ '../views/login/LoginView.vue'),
        //单独路由守卫
        beforeEnter(to, from, next) {
            const { isLogin } = localStorage
            isLogin ? next({ name: "Homeview" }) : next()
        }
        //动态路由，懒加载 只有访问这个页面时才去访问对应的代码，减轻加载的压力
        // component: () => import(/* webpackChunkName: "about" */ '../views/login/LoginView.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        beforeEnter(to, from, next) {
            const { isLogin } = localStorage
            isLogin ? next({ name: "Homeview" }) : next()
        }
    },
    {
        // 带参数的路径
        path: '/shop/:id',
        name: 'shop',
        // component: ShopView,
        component: () => import(/* webpackChunkName: "ShopView" */ '../views/shop/ShopView.vue'),
    },
    {
        path: '/Order/:id',
        name: 'Order',
        // component: HomeView
        component: () => import(/* webpackChunkName: "home" */ '../views/order/PayOrder.vue'),
    },
    {
        path: '/ShoppingCart',
        name: 'ShoppingCart',
        // component: HomeView
        component: () => import(/* webpackChunkName: "home" */  '../views/home/HomeView.vue'),
    },
    {
        path: '/Mine',
        name: 'Mine',
        // component: HomeView
        component: () => import(/* webpackChunkName: "home" */  '../views/home/HomeView.vue'),
    },
    {
        path: '/Order/:id',
        name: 'Order',
        // component: HomeView
        component: () => import(/* webpackChunkName: "home" */ '../views/order/PayOrder.vue'),
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        // component: HomeView
        component: () => import(/* webpackChunkName: "home" */ '../views/myOrder/MyOrder.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// // 全局路由针对所有的

// localStorage.isLogin = false;
// localStorage.isResgister = false;

router.beforeEach((to, from, next) => {
    const { isLogin } = localStorage
    const { name } = to
    console.log(isLogin)
    const LoginOrRegister = (name === 'login' || name === 'register')
    if (LoginOrRegister || isLogin) {
        next()
    }
    else {
        next('/login')
    }
})
export default router
