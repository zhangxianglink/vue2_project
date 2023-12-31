import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Home2 from '../components/Home2.vue'
import Home3 from '../components/Home3.vue'
import Home4 from '../components/Home4.vue'

export default new VueRouter({
    routes:[
        {
            path:'/',           //这个表示的是根目录，即一进入的页面
            redirect:'Home4'    //设置页面一进来就显示的页面，即重定向到goods组件，redirect对应的值是其中一条路由component的值
        },
        {
            path:'/home',
            component:Home
        },
        {
            path:'/home2',
            component:Home2
        },
        {
            path:'/home3',
            component:Home3
        },
        {
            path:'/home4',
            component:Home4
        }
    ]
})