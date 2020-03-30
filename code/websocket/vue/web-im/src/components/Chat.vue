<template>
  <div>
    <div class="box">
      <div class="header">聊天室</div>
      <div class="middle">
        <div v-for="user in newUserArr" :key="user.userId">{{user.username}}加入聊天室</div>
        <div class="content">
          <div v-for="msgObj in msgArr" class="item" :class="{'mime': msgObj.username == username}">
            <template v-if="msgObj.username == username">
              <pre class="message">{{msgObj.content}}</pre>
              <div class="avtar">{{msgObj.username}}</div>
            </template>
            <template v-else>
              <div class="avtar">{{msgObj.username}}</div>
              <pre class="message">{{msgObj.content}}</pre>
            </template>

          </div>
        </div>
      </div>
      <div class="footer">
        <input v-model="message" placeholder="请输入内容" @keyup.enter="postMessage">
        <div class="send-btn" @click="postMessage">发送</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CHAT',
  data() {
    return {
      username: '',
      userId: '',
      fail: false,
      message: '',
      newUserArr: [],
      msgArr: [] // fromUser: 1: 他人，0:自己
    }
  },
  methods: {
    init(){
      let _this = this
      this.socket = this.io("http://localhost:8886")
      this.socket.on('newUser',function(data){
        _this.newUserArr.push(data.msg)
      })
      this.socket.emit('addUser', {
        username: _this.username,
        userId: _this.userId,
      })
      this.socket.on('receive', function(data) {
        console.log('receive message', data)
        _this.msgArr.push(data)
      })
    },
    postMessage() {
      if(!this.message) return
      let msg = {
        msgId: new Date() - 0,
        username: this.username,
        content: this.message,
        userId: this.userId
      }
      this.socket.emit('message', {
        message: msg
      })
      this.msgArr.push(msg)
      this.currentSendMsgId = msg.msgId
      this.message = ''
    },
    dealKeyDown(event) {
      event && event.keyCode == 13 && this.postMessage()
    },
    beforeunloadFn() {
      this.socket.disconnect()
    }
  },
  mounted() {
  },
  created() {
    this.userId = localStorage.getItem('userId')
    this.username = this.$route.query.username
    this.init()
    window.addEventListener('beforeunload', e=>this.beforeunloadFn())
  },
  destroyed() {
    window.removeEventListener('beforeunload',this.beforeunloadFn() )
  }
}
</script>
<style>
  .box {
    width: 1000px;
    height: 500px;
    background-color: #fff;
    border: 1px solid #eee;
    position: relative;
    padding-top: 36px;
    margin: 0 auto;
  }
  .header {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 36px;
    line-height: 36px;
    font-weight: 500;
    text-align: center;
    box-sizing: border-box;
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }
  .footer{
    width: 100%;
    height: 36px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
  }
  .footer input {
    width: 80%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 15px;
  }
  .footer input:focus{
    outline: none;
  }
  .footer .send-btn {
    display: inline-block;
    width: 20%;
    height: 100%;
    background-color: rgb(0, 175, 153);
    font-size: 18px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    line-height: 36px;
    cursor: pointer;
  }
  .middle {
    width: 100%;
    height: 466px;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: rgb(243, 243, 243);
  }
  .middle::-webkit-scrollbar {
    display: none;
  }
  .content {
    width: 100%;
  }
  .content .item {
    display: flex;
    align-items: flex-start;
    margin: 10px 0 ;
  }
  .content .item.mime{
    justify-content: flex-end;
  }
  .item .avtar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(65, 131, 212);
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
  .item .message {
    max-width: calc(100% - 40px);
    text-align: left;
    display: block;
    box-sizing: border-box;
    white-space: pre-wrap;
    background-color: #fff;
    color: black;
    padding: 11px 10px;
    line-height: 18px;
    margin: 0 10px;
    border-radius: 5px;
  }
  .item.mime .message {
    text-align: right;
    background-color: rgb(170, 233, 121);
  }

</style>
