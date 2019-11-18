import Vue from 'vue'
import VueRouter from 'vue-router'
import Information from '../views/Information'
import Questionnaire from '../views/Questionnaire'
import Admin from '../views/Admin'
import Users from '../views/Users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'information',
    component: Information
  },
  {
    path: '/questionnaire/:user',
    name: 'questionnaire',
    component: Questionnaire
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  }
]

const router = new VueRouter({
  routes
})

export default router
