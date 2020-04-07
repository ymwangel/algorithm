import Vue from 'vue'
import Router from 'vue-router'
import Enter from '@/components/enter'
import Chat from '@/components/chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/signal/',
  routes: [
    {
      path: '/',
      name: 'Enter',
      component: Enter
    }, {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
