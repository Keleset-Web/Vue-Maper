<template>
  <div class="placeInfo">
    <div class="placeHeader">
      <h2>{{place.name}}</h2>
      <button @click="deletePlace(place.id)" class="btn-orange">Удалить</button>
    </div>
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
  name: "PlaceInfo",
  methods:{
    deletePlace(id){
      this.$emit('deletePlace', id)
    }
  }
}
</script>

<style scoped>
.placeInfo{
  width: 80vw;
  height: 60vh;
  overflow: auto;
  padding: 10px;
}
.placeHeader{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.placeInfo h2{
  color: #4AAE9B;
  margin-bottom: 30px;
}
.photo{
  background-position: center;
  background-size: cover;
  height: 400px;
  width: 80%;
}
.description{
  width: 100%;
  min-height: 200px;
  padding: 10px 0;
  font-size: 16px;
  color: #4AAE9B;
  margin-bottom: 30px;
}
.btn-orange {
  color: white;
  background: #ff5800;
  padding: 5px;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
  text-align: center;
  height: 25px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
