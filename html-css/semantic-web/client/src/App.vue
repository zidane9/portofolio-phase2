<template>
  <div id="app">
    <div class="">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Where can I Park ?</a>
          </div>

          <div class="navbar-form navbar-left" >

            <div class="form-group">
              <input type="text" v-model="cityFilter" class="form-control" placeholder="Search City">
            </div>
            <button class="btn btn-default" @click="filterListByCity">Find Parking Space</button>
          </div>

        </div>
      </nav>

    </div>

    <div class="container">
      <div class="row">
        <div id="bingkai" v-for="space in listSpace" key="index" class="col-md-4">
          <center><space-card :space="space" ></space-card></center>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import SpaceCard from './components/SpaceCard.vue'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      listSpace: [],
      cityFilter: ''
    }
  },
  methods: {
    filterListByCity(){
      let self = this
      let filter = self.cityFilter.toLowerCase();
      filter = filter.charAt(0).toUpperCase() + filter.slice(1);
      // console.log('---',filter);
      axios.get(`http://localhost:3000/city/${filter}`)
        .then(response => {
          if (response.data){
            console.log(response.data)
            self.listSpace = response.data;
          }

        })
        .catch(error => {
          alert('error filterListByCity, see console')
          console.log(error)
        })
    },
    getList(){
    let self = this
    axios.get(`http://localhost:3000`)
      .then(response => {
        if (response.data){
          console.log(response.data)
          self.listSpace = response.data;
        }

      })
      .catch(error => {
        alert('error getList, see console')
        console.log(error)
      })
    }
  },
  components:{
    SpaceCard
  },
  mounted(){
    this.getList()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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

#bingkai {
  border: 1px solid lightgrey;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  width: 300px;

}
</style>
