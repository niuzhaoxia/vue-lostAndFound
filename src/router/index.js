import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Letter from '../components/Letters.vue'
import PersonalInfo from '../components/PersonalInfo.vue'
import Login from '../components/Login.vue'
import Resgister from '../components/Register.vue'
import PublishDetail from '../components/PublishDetail.vue'
import DynamicDetial from '../components/DynamicDetail'
import Admin from '../components/admin'
import UserManage from '../components/UserManagement'
import MyPublish from '../components/mypublish'
// import DynamicDetail from '../components/DynamicDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/letter', component: Letter},
    {path: '/info', component: PersonalInfo},
    {path: '/login', component: Login},
    {path: '/admin', component: Admin},
    {path: '/resgister', component: Resgister},
    {path: '/detail', component: PublishDetail},
    {path: '/dynamicdetail/:gid', component: DynamicDetial, name: 'detail'},
    {path: '/userManage', component: UserManage},
    {path: '/myPublish', component: MyPublish}
  ]
})
