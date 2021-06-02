import Vue from 'vue'
import vueRouter from 'vue-router'
const originalPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
 return originalPush.call(this, location).catch(err => err)
}
Vue.use(vueRouter)
const router = new vueRouter({
    mode: "hash",
    routes:[
        {
        path:'/home',
        name:'home',
        component: () => import ('../views/Home/index'),
        children:[
            {
                path:'/search',
                name:'search',
                component: () => import('../views/search/index'),
                children:[
                    {
                        path:'/searchTerms',
                        name:'searchTerms',
                        component: () => import('../views/search/sons/terms')
                     },
                     {
                        path:'/searchReal',
                        name:'searchReal',
                        component: () => import('../views/search/sons/searchreal')
                     }
                ]
             },
        ]
        },
        {
            path:'/Songlist',
            home:'Songlist',
            component: () => import('../views/allPages/Songlist')
        },
        {
            path:'/Play',
            name:'play',
            component: () => import('../views/allPages/bofang')
        },
        {
            path:'/userCard',
            name:'userCard',
            component: () => import('../views/allPages/usercard')
        },
        {
            path:'/singer',
            name:'singer',
            component: () => import('../views/allPages/singer')
        },
        {
            path:'/albumslist',
            name:'albumslist',
            component: () => import('../views/allPages/albumslist')
        },
        {
            path:'*',
            redirect:'/home'
        }
    ]
})
export default router