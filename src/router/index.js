import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Home2 from '../components/Home2.vue'
import Home3 from '../components/Home3.vue'
import Home4 from '../components/Home4.vue'

export default new VueRouter({
    routes:[
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