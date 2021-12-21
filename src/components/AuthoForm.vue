<template>
  <div class="autho">
    <h3>Вы уже авторизованы</h3>
    <button @click="logout" class="btn-green">Выйти</button>
  </div>
</template>

<script>
export default {
  name: "AuthoForm",
  data(){
    return {

    }
  },
  methods: {
    logout(){
      this.$emit('logout')
    }
  }

}
</script>

<style scoped>
.autho{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
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