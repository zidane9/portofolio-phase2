<template>
  <div id="app">
    <div class="">
      <center><h1>Event Organizer</h1></center>
    </div>
    <div>

      Title
      <input type="text" name="title" v-model="title"></input><br>
      Name
      <input type="text" name="name" v-model="name"></input><br>
      Date
      <input type="text" name="date" v-model="date"></input><br>
      Email
      <input type="text" name="email" v-model="email"></input><br>
      <br>
      <button @click="post" >Submit</button>
      <div style="color:red">
        {{error}}
      </div>
      <br>

    </div>

    <div @postEo="afterUpdate" v-for="eo in list" key="index" style="background:#eee;padding: 20px">
        <div >
            <p ><h2>{{eo.title}}</h2></p>
            <p>{{eo.name}}</p>
            <div>Email : {{eo.email}}</div>
            <div>Date : {{eo.date}}</div>
            <div>
              <button @click='update'>edit</button>
            </div>
        </div>
        <UpdateEO v-if="isEdit" :eo='eo'></UpdateEO>
    </div>

    <router-view >
    </router-view>

  </div>
</template>

<script>
import axios from 'axios'
import UpdateEO from './components/UpdateEO.vue'

export default {
  name: 'app',
  data () {
    return {
      isEdit:false,
      error: '',
      title: '',
      name: '',
      date: '',
      email: '',
      list: []
    }
  },
  methods: {
    update(){
      this.isEdit=true;
    },
    afterUpdate(){
      this.isEdit = false;
      this.getList();
    },
    post() {
      let self = this
      this.error = '';

      if(self.title == null || self.title == ''){
        this.error = 'title is required!';
        return;
      }
      if(self.name == null || self.name == ''){
        this.error = 'name is required!';
        return;
      }
      if(self.date == null || self.date == ''){
        this.error = 'date is required!';
        return;
      }

      if(self.email == null || self.email == ''){
        this.error = 'email is required!';
        return;
      }
      // console.log('--',window.localStorage.getItem('token'));

      axios.post(`http://localhost:3000`, {
        title: self.title,
        name: self.name,
        date: self.date,
        email: self.email
      })
        .then(response => {
          if(response.data.error) {
            alert(error);
          } else {
          console.log(response.data)
          self.error = '';
            alert('success');
          self.getList();
        }
        })
        .catch(error => {
          alert(error);
          console.log(error)
        })
    },
    getList(){
    let self = this
    axios.get(`http://localhost:3000`)
      .then(response => {
        if (response.data){
          console.log(response.data)
          self.list = response.data;
        }

      })
      .catch(error => {
        alert('error getList, see console')
        console.log(error)
      })
    }
  },
  mounted(){
    // this.ifSignedIn(),
    this.getList()
  },
  components: {
    UpdateEO
  }
}
</script>

<style>

</style>
