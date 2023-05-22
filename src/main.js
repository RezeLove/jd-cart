import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 移动端的页面在不同浏览器上显示效果有所不同，normalize.css可以统一显示效果
// 安装的时候 由于一些版本问题 需要加上 --legacy-peer-deps
import 'normalize.css'
import './style/base.scss'
import './style/iconfont.css'
createApp(App).use(store).use(router).mount('#app')
