import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Enter from "@/components/Enter.vue"
import Chat from "@/components/Chat"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/enter',
      name: 'ENTER',
      component: Enter
    }, {
      path: '/chat',
      name: 'CHAT',
      component: Chat
    }
  ]
})
