<template>
    <MapApp
        v-model:zoomPercent = 'zoomPercent'
    />
    <Menu
        @openAuth = 'openAuth'
        @zoomPlus = 'zoomPlus'
        @zoomMinuse = 'zoomMinuse'
        @openInfo = 'openInfo'
        @openMap = 'openMap'
    />
    <Modal v-show="modalList.isAuto" @close="openAuth">
      <template v-slot:header>
        <h2>{{ modalData.header }}</h2>
      </template>
      <template v-slot:body>
        {{ modalData.body }}
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
        },
        modalData:{
          header:'',
          body: ''
        },
        zoomPercent: 200,
      }

    },
    methods: {
      openAuth(){
        this.modalData.header = 'Авторизация'
        this.modalData.body = Menu
        this.modalList.isAuto = !this.modalList.isAuto;
      },
      openInfo(){

        this.modalList.isInfo = !this.modalList.isInfo;
      },
      openMap(){
        this.modalList.isMapList = !this.modalList.isMapList;
      },
      zoomPlus(){
        if(this.zoomPercent <= 400){
          this.zoomPercent += 10;
        }
      },
      zoomMinuse(){
          if(this.zoomPercent >= 160) {
            this.zoomPercent -= 10;
          }
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