<template>
  <div class="box">
    <el-container direction="vertical">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form :model="form" ref="form" label-width="80px" class="demo-ruleForm">
            <el-form-item label="Content" prop="content">
              <el-input v-model="form.content" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="Input" prop="message">
              <el-input v-model="form.message" type="textarea"></el-input>
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
  name: 'Chat',
  data () {
    return {
      form: {
        content: '',
        message: ''
      }
    }
  },
  methods: {
    onSend() {
      console.log('onSend')
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
