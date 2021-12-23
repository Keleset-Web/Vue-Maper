<template>
  <div class="mark" v-bind:style="{
            left: left+'px',
            top: top+'px',
   }">
    <div class='info'>
        {{name}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    left:{
      type:Number,
      required: true
    },
    top:{
      type:Number,
      required: true
    },
    name:{
      type:String,
      required: true
    },
  },
  name: "Mark"
}
</script>

<style scoped>
.mark{
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: #ff0000;
  position: absolute;
  transform: rotate(-45deg);
  cursor: pointer;
  margin: -20px 0 0 -20px;
  transition: 1s transform;
}
.mark:hover{
  transform: scale(1.4) rotate(-45deg);
}
.mark>.info{
  color: black;
  text-align: center;
  position: relative;
  right: 50%;
  top:50px;
  padding: 5px;
  font-size: 1em;
  width: 300px;
  background-color: white;
  box-shadow: 4px 8px 8px rgba(0, 0,0, 0.4);
  display: none;
  transform: rotate(45deg);

}
.mark:hover>.info{
  display: block;
}
</style>