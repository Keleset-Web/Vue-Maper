<template>
  <form class="login-form" @submit.prevent>
    <div class="user-box">
      <input v-model="userInput.login" type="text" name="" required="">
      <label>Логин</label>
    </div>
    <div class="user-box">
      <input v-model="userInput.password" type="password" name="" required="">
      <label>Пароль</label>
    </div>
    <button @click="login" class="btn-green">Войти</button>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data(){
    return {
      userInput: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    login(){
      this.$emit('login', this.userInput)
    }
  }

}
</script>

<style scoped>
.login-form{
  width: 400px;
}
 .user-box {
  position: relative;
}

.user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #4AAE9B;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #4AAE9B;
  outline: none;
  background: transparent;
}
 .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #4AAE9B;
  pointer-events: none;
  transition: .5s;
}

 .user-box input:focus ~ label,
 .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #4AAE9B;
  font-size: 12px;
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