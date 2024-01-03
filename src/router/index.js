import VueRouter from 'vue-router'
import Home from '../components/Home'
import Home2 from '../components/Home2'

export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/home2',
            component:Home2
        }
    ]
})