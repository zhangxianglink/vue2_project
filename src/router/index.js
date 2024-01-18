import VueRouter from 'vue-router'
import store from '@/store/index';
import Home from '../components/Home.vue'
import Home2 from '../components/Home2.vue'
import Home3 from '../components/Home3.vue'
import Home4 from '../components/Home4.vue'
import Home5 from '../components/Home5.vue'
import Home6 from '../components/Home6.vue'

const router = new VueRouter({
    routes:[
        {
            path:'/',          
            redirect:'Home4'    
        },
        {
            path:'/home',
            component:Home,
            meta: {
              requiresAuth: true // 添加一个meta字段，用于标识需要进行权限验证的路由
            }
        },
        {
            path:'/home2',
            component:Home2,
            meta: {
              requiresAuth: true // 添加一个meta字段，用于标识需要进行权限验证的路由
            }
        },
        {
            path:'/home3',
            component:Home3,
            meta: {
              requiresAuth: true // 添加一个meta字段，用于标识需要进行权限验证的路由
            }
        },
        {
            path:'/home4',
            component:Home4
        },
        {
            path:'/home5',
            component:Home5,
            meta: {
              requiresAuth: true // 添加一个meta字段，用于标识需要进行权限验证的路由
            }
        },
        {
            path:'/home6',
            name: 'Home6',
            component: Home6,
            meta: {
              requiresAuth: true // 添加一个meta字段，用于标识需要进行权限验证的路由
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 需要权限验证的路由
    if (store.state.name !== 'master19') {
      next('/home4');
    } else {
      next() // 继续正常跳转
    }
  } else {
    next() // 非权限验证的路由，直接跳转
  }
})
  
export default router