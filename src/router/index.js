import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      component: ()=>import('../components/Login.vue')
    },
    {
      path: '/notebooks',
      component: ()=>import("../components/Notebooks.vue")
    },
    {
      path: '/note',
      component: ()=>import("../components/NoteDetail.vue")
    },
    {
      path: '/trash',
      component: ()=>import("../components/TrashDetail.vue")
    }
  ]
})
