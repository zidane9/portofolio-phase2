<template>
  <div class="">
    <div>

      Title<br>
      <input type="text" name="title" v-model="eo.title"></input><br>
      Name<br>
      <input type="text" name="name" v-model="eo.name"></input><br>
      Date<br>
      <input type="text" name="date" v-model="eo.date"></input><br>
      Email<br>
      <input type="text" name="email" v-model="eo.email"></input><br>
      <br>
      <button @click="update">Update</button>
      <br>
      <div style="color:red">
        {{error}}
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  props : ['eo'],
  data() {
    return {
      error:''
      // title: '',
      // content: ''
    }
  },
  methods: {
    update() {
      // console.log('---x');

      let self = this
      this.error = '';

      if(self.eo.title == null || self.eo.title == ''){
        this.error = 'title is required!';
        return;
      }
      if(self.eo.name == null || self.eo.name == ''){
        this.error = 'name is required!';
        return;
      }
      if(self.eo.date == null || self.eo.date == ''){
        this.error = 'date is required!';
        return;
      }

      if(self.eo.email == null || self.eo.email == ''){
        this.error = 'email is required!';
        return;
      }
      axios.put(`http://localhost:3000/${self.eo._id}`, {
        title: self.eo.title,
        name: self.eo.name,
        date: self.eo.date,
        email: self.eo.email
      })
        .then(response => {
          if (response.data){
            console.log(response.data)
            if(response.data.error){
              alert(response.data.error);
            }else {
              self.error = ''
            alert('Update Sukses');
            self.$emit('postEo')
            self.$router.push('/')
          }
        }
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
