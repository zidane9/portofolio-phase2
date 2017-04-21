<template>
  <div class="card" style="width: 20rem;">
    <div class="card-block">
      <h4 class="card-title">{{space.place}}</h4>
      <p class="card-text">Available {{space.capacity - space.occupied}} spaces.</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Price : Rp {{space.price}}</li>
      <li class="list-group-item">Address : {{space.address}}</li>
      <li class="list-group-item">City : {{space.city}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['space']
}
</script>

<style lang="css">
</style>
