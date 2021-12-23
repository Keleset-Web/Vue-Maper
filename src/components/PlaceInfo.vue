<template>
  <div class="placeInfo">
    <h2>{{place.name}}</h2>
    <div class="photo"
         v-bind:style='{
           backgroundImage: "url(" + place.photo + ")",
         }'
    ></div><br>
    <div class="description">
      {{place.description}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    place:{
      type:Array,
      required:true
    }
  },
  name: "PlaceInfo"
}
</script>

<style scoped>
.placeInfo{
  width: 80vw;
  height: 80vh;
  overflow: auto;
}
.photo{
  background-position: center;
  background-size: cover;
  height: 400px;
  width: 100%;
}
.description{
  width: 100%;
  min-height: 250px;
  padding: 10px 0;
  font-size: 16px;
  color: #4AAE9B;
  margin-bottom: 30px;
}
</style>