<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div class="grid-content">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Sign In</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      let self = this
      axios.post(`http://localhost:3000/login`, {
        username: self.form.email,
        password: self.form.password
      })
        .then(response => {
          if (response.data){
            console.log(response.data)
            localStorage.setItem('token', response.data);
            self.$message('Login Sukses');
            self.$emit('login')
            self.$router.push('/')
          }else {
            this.$message.error('Login gagal');
          }

        })
        .catch(error => {
          alert('error, see console')
          console.log(error)
        })
    }
  },
  created() {
    //
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
