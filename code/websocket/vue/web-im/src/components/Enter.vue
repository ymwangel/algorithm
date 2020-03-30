<template>
  <div>
    <input v-model="username">
    <button @click="enterChat()">开始聊天</button>
  </div>
</template>
<script>
export default {
  name: 'ENTER',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    enterChat() {
      if(this.username) {
        let userId = this.username + '_' + (new Date() - 0)
        localStorage.setItem('userId', userId)
        console.log(localStorage.getItem('userId'))
        this.$router.push({path: '/chat', query: {username: this.username}})
      }
    }
  }
}
</script>
