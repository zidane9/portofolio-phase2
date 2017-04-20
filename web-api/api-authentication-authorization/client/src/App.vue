<template>
  <div id="app">
    <div class="">
      <center><h1>Authentication n Authorization</h1></center>
    </div>
    <div v-if="isLogin == false" >
      <router-link  to="/signin">Sign In</router-link> |
      <router-link  to="/signup">Sign Up</router-link>

    </div>
    <div v-else >

      <el-button  type="primary" @click="signOut">Logout</el-button>

    </div>

    <router-view @login="getList">
    </router-view>

    <Users  :users='listUser'></Users>

  </div>
</template>

<script>
import axios from 'axios'
import Users from './components/Users.vue'

export default {
  name: 'app',
  data () {
    return {
      isLogin : false,
      listUser: []
    }
  },
  methods: {
    ifSignedIn(){
      if (localStorage.getItem("token") === null) {
          this.isLogin = false
      }else {
          this.isLogin = true
      }
    },
    signOut(){
				window.localStorage.removeItem('token')
        this.listUser = []
        this.ifSignedIn()

		},
    getList(){
      this.ifSignedIn();
      if(!this.isLogin) return;
    let self = this
    axios.get(`http://localhost:3000/users`,
    {headers: {'token': window.localStorage.getItem('token')}})
      .then(response => {
        if (response.data){
          console.log(response.data)
          self.listUser = response.data;
        }

      })
      .catch(error => {
        alert('error getList, see console')
        console.log(error)
      })
    }
  },
  mounted(){
    this.ifSignedIn(),
    this.getList()
  },
  components: {
    Users
  }
}
</script>

<style>

</style>
