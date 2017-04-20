<template>
  <div>
  <div v-for="user in users" key="index" style="background:#eee;padding: 20px">
      <div >
          <p ><h2>{{user.email}}</h2></p>
          <p>{{user.name}}</p>

      </div>

  </div>
</div>
</template>

<script>

export default {
  props : ['users'],
  data(){
    return {

    }
  },
  components:{

  },
  methods:{

  }
}
</script>

<style lang="css">
</style>
