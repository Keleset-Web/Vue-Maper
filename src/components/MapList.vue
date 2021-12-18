<template>
  <div class="select">
    <select name="format" id="format">
      <option selected disabled>Выберите карту</option>
      <option value="tuapse">Туапсинский район</option>
    </select>
  </div>
  <button class="btn-green">Загрузить</button>
</template>

<script>
export default {
  name: "MapList"
}
</script>

<style scoped>
select {
  -webkit-appearance:none;
  -moz-appearance:none;
  -ms-appearance:none;
  appearance:none;
  outline:0;
  box-shadow:none;
  background: #fff;
  background-image: none;
  flex: 1;
  padding: 0 .5em;
  color:#4AAE9B;
  cursor:pointer;
  font-size: 1em;
  font-family: 'Open Sans', sans-serif;
}
select::-ms-expand {
  display: none;
}
.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  line-height: 3;
  background: #4AAE9B;
  overflow: hidden;
  border-radius: .25em;
  margin-bottom: 15px;
  border: inherit;
}
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  color: #4AAE9B;
  padding: 0 1em;
  background: #2b2e2e;
  cursor:pointer;
  pointer-events:none;
  transition:.25s all ease;
  border: inherit;
}
.select:hover::after {
  color: #4AAE9B;
}
.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
  width: 100%;
  text-align: center;
  height: 25px;
  cursor: pointer;
}
</style>