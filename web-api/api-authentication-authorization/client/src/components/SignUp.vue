<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <el-form label-width="120px">
            <el-form-item label="Name">
              <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="post">Sign Up</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    post() {
      let self = this
      axios.post(`http://localhost:3000/signup`, {
        name: self.name,
        email: self.email,
        password: self.password
      })
        .then(response => {
          console.log(response.data)
          self.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  // created() {
  //   console.log(123)
  // }
}
</script>

<style>
</style>
