<template>
  <div>
    <div>{{arr}}{{message}}</div>
    <button @click="changeArray()">更改数组</button>
    <input v-model="username" @change="changeInput()" @focus="focusInput()">
    <button @click="enterChat()">开始聊天</button>
    <!-- 作用域插槽 -->
    <test :arr="testArr">
      <template slot-scope="scope">
        <A :value="scope.row" @clickA="clickAComponent"></A>
      </template>
    </test>
  </div>
</template>
<script>
import test from "./test.vue"
import A from "./A.vue"
export default {
  name: 'ENTER',
  components: {test,A },
  data() {
    return {
      username: '',
      arr: [1,2,{name: 'lisi'}],
      message: '',
      testArr: [{
        name: 'list'
      },{
        name: 'wangcai'
      }]
    }
  },
  methods: {
    clickAComponent() {
      console.log('Enter.vue---clickA')
    },
    enterChat() {
      if(this.username) {
        let userId = this.username + '_' + (new Date() - 0)
        localStorage.setItem('userId', userId)
        console.log(localStorage.getItem('userId'))
        this.$router.push({path: '/chat', query: {username: this.username}})
      }
    },
    changeArray() {
      this.arr[2] = 5
      console.log(this)
      this.message = 'sfdjljf'
    },
    changeInput() {

    },
    focusInput() {

    }
  }
}
</script>
