import Vue from 'vue'
import VueRouter from 'vue-router'
import Information from '../views/Information'
import Questionnaire from '../views/Questionnaire'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
