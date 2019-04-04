import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Dashboard from '@/components/dashboard/Dashboard'
import EntryCreate from '@/components/entry/EntryCreate'
import Login from '@/components/public/Login'
import PlayersList from '@/components/list/PlayersList'
import PaysList from '@/components/list/PaysList'

import navigationGuard from './navigation-guard'

Vue.use(Router)

const router = new Router({
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
          component: PaysList
        },
        {
          path: '/entry/:id',
          name: 'entry-create',
          component: EntryCreate
        },
        {
          path: '/players',
          name: 'list-players',
          component: PlayersList
        }
      ]
    }
  ]
})

router.beforeEach(navigationGuard)

export default router
