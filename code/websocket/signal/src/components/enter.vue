<template>
  <div class="box">
    <el-container direction="vertical">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form :model="form" ref="form" label-width="80px" class="demo-ruleForm">
            <el-form-item label="username" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="room" prop="room">
              <el-input v-model="form.room"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onConnect()" :disabled="isJoined">Connect</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-container>

    <el-container direction="vertical">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form :model="msgform" ref="msgform" label-width="80px" class="demo-ruleForm">
            <el-form-item label="Content" prop="content">
              <el-input v-model="msgform.content" type="textarea" disabled></el-input>
            </el-form-item>
            <el-form-item label="Input" prop="message">
              <el-input v-model="msgform.message" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSend()">Send</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Enter',
  data () {
    return {
      form: {
        username: '',
        room: ''
      },
      msgform: {
        content: '',
        message: ''
      },
      socket: null,
      isJoined: false
    }
  },
  methods: {
    onConnect() {
      // 连接服务器
      this.socket = this.io.connect('ws://localhost:8855')
      // 使用 custom namespaces
      // this.socket = this.io.content('ws://localhost:8855/custom-namespace')
      this.socket.on('joined', (room, username) => {
        // 加入房间成功
        console.log(username)
        this.isJoined = true
      })
      this.socket.on('leaved', (room, username) => {
        // 离开房间
      })

      this.socket.on('message', (room, username, data) => {
        // 收到消息
        console.log(room, username, data)
        this.msgform.content = this.msgform.content + data + '\r'
      })

      this.socket.emit('join', this.form.room)
    },
    onSend() {
      let data = this.form.username + ':' + this.msgform.message
      this.socket.emit('message', this.form.room, data)
      this.msgform.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box {
  width: 80%;
  margin-left: 10%;
}
</style>
