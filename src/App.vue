<template>
    <MapApp/>
    <Menu @openAuth = 'openAuth'/>
    <Modal v-show="modalList.isAuto" @close="openAuth">
      <template v-slot:header>
        <h2>Заголовок модалки</h2>
      </template>
      <template v-slot:body>
        <input type="text" placeholder="login..">
        <input type="password" placeholder="password..">
        <button>Авторизоваться</button>
      </template>
    </Modal>
</template>

<script>
import MapApp from "./components/Map"
import Menu from "./components/Menu"
import Modal from './components/UI/Modal.vue';
export default{
    components: {
        MapApp,
        Menu,
        Modal
    },
    data(){
      return{
        modalList: {
          isAuto: false,
          isUser: false,
          isMapList: false,
          isInfo: false,
        }
      }

    },
    methods: {
      openAuth(){
        this.modalList.isAuto = !this.modalList.isAuto;
      },
      zoomPlus(){

      }
    },
}


</script>

<style lang="css">
*{
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app{
    height: 100vh;
    width: 100vw;
    background-color: #e7e7e7;
}
body{
    transition: all 0.25s ease-in;
}
</style>