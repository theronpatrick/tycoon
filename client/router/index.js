import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/access_token*',
      component: Home
    },
    {
      path: '/foo',
      component: Home
    }
  ]
})
