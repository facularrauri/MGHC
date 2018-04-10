import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Dashboard from '@/components/dashboard/Dashboard'
import EntryCreate from '@/components/entry/EntryCreate'
import EntryUpdate from '@/components/entry/EntryUpdate'
import Login from '@/components/public/Login'
import ListPlayers from '@/components/list/ListPlayers'
import Pays from '@/components/list/Pays'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isPublic: true }
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/pay/:id',
          name: 'pays',
          component: Pays
        },
        {
          path: '/entry/create/:id',
          name: 'entry-create',
          component: EntryCreate
        },
        {
          path: '/entry/:update/:id',
          name: 'entry-update',
          component: EntryUpdate
        },
        {
          path: '/players',
          name: 'list-players',
          component: ListPlayers
        }
      ]
    }
  ]
})
