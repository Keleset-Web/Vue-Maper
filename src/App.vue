<template>
    <MapApp
        v-model:zoomPercent = 'zoomPercent'
    />
    <Menu
        @openAuth = 'openAuth'
        @openInfo = 'openInfo'
        @openMap = 'openMap'
        @zoomPlus = 'zoomPlus'
        @zoomMinuse = 'zoomMinuse'
    />
    <Modal v-show="modalIsOpen" @close="modalClose">
      <template v-slot:header>
        <h2>{{ modalData.header }}</h2>
      </template>
      <template v-slot:body>
        <LoginForm v-if="modalData.body === 'LoginForm'" @login="login"/>
        <MapList v-if="modalData.body === 'MapList'" />
        <ProjectInfo v-if="modalData.body === 'ProjectInfo'"/>
        <PlaceInfo v-if="modalData.body === 'PlaceInfo'" v-model="places"/>
      </template>
    </Modal>
</template>

<script>
import MapApp from "./components/Map"
import Menu from "./components/Menu"
import Modal from './components/UI/Modal.vue';
import LoginForm from "./components/LoginForm";
import ProjectInfo from "./components/ProjectInfo";
import PlaceInfo from "./components/PlaceInfo";
import MapList from "./components/MapList";
export default{
    components: {
      MapList,
      PlaceInfo,
      ProjectInfo,
      LoginForm,
        MapApp,
        Menu,
        Modal
    },
    data(){
      return{
        modalIsOpen: false,
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
        this.modalData.body = 'LoginForm'
        this.modalIsOpen = true
      },
      login(userInput) {
        console.log(userInput.login)
        firebase
            .auth()
            .signInWithEmailAndPassword(userInput.login, userInput.password)
            .then((data) => {
              console.log('Авторизация прошла успешно')
              this.$cookies.set('MapperId', CryptoJS.SHA256(userInput.login), 60 * 60 * 24 * 30, '/')
            })
            .catch(error => {
              console.log(error.code)
              alert(error.message)
            })
      },
      openInfo(){
        this.modalData.header = 'Информация о проекте'
        this.modalData.body = 'ProjectInfo'
        this.modalIsOpen = true
      },
      openMap(){
        this.modalData.header = 'Список карт'
        this.modalData.body = 'MapList'
        this.modalIsOpen = true
      },
      zoomPlus(){
        if(this.zoomPercent <= 400){
          this.zoomPercent += 10;
        }
      },
      zoomMinuse(){
          if(this.zoomPercent >= 160) {
            this.zoomPercent -= 10
          }
      },
      modalClose(){
        this.modalIsOpen = false
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