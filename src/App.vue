<template>
  <MapApp
      :zoomPercent='zoomPercent'
      :current-map="currentMap"
      :marks="marks"
      @createMark = "openAddMark"
      @openPlace = "openPlaceInfo"
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
        <MapList :maps="maps" v-if="modalData.body === 'MapList'" @AddMap="addMap" @changeMap="changeMap"/>
        <AddMap v-if="modalData.body === 'AddMap'" @closeModal="modalClose"/>
        <AddPlace v-if="modalData.body === 'AddPlace'" @addMark="addNewMark" />
        <ProjectInfo v-if="modalData.body === 'ProjectInfo'"/>
        <PlaceInfo v-if="modalData.body === 'PlaceInfo'" :place="currentPlace" @deletePlace="deletePlace"/>
        <AuthoForm v-if="modalData.body === 'AuthoForm'" @logout="logout"/>
      </template>
    </Modal>
</template>

<script>
import MapApp from "./components/Map";
import Menu from "./components/Menu";
import Modal from './components/UI/Modal.vue';
import LoginForm from "./components/LoginForm";
import ProjectInfo from "./components/ProjectInfo";
import PlaceInfo from "./components/PlaceInfo";
import MapList from "./components/MapList";
import AuthoForm from "./components/AuthoForm";
import AddMap from './components/AddMap';
import AddPlace from "./components/AddPlace";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore, collection, query, where, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore";
import VueCookies from 'vue-cookies';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export default{
  components: {
    AddPlace,
    MapList,
    PlaceInfo,
    ProjectInfo,
    LoginForm,
    MapApp,
    Menu,
    Modal,
    AuthoForm,
    AddMap
  },
    data(){
      return{
        modalIsOpen: false,
        modalData:{
          header:'',
          body: ''
        },
        newMark:{
          id: '',
          name: '',
          description: '',
          photo:'',
          left: '',
          top: '',
          zoomPercent: '',
          mapId: ''
        },
        zoomPercent: 200,
        marks: [],
        maps: [],
        currentMap:{},
        currentPlace: {}
      }

    },
    methods: {
      openAuth(){
        if(this.checkAuth()){
          this.modalData.header = 'Личный кабинет пользователя'
          this.modalData.body = 'AuthoForm'
        }else{
          this.modalData.header = 'Авторизация'
          this.modalData.body = 'LoginForm'
        }
        this.modalIsOpen = true
      },
      login(userInput) {
        console.log(userInput.login)
        console.log(userInput.password)
        signInWithEmailAndPassword(getAuth(),userInput.login, userInput.password)
            .then((data) => {
              console.log('Авторизация прошла успешно')
              VueCookies.set('MapperId', Math.random().toString(36).substr(2,17), 60 * 60 * 24 * 30, '/')
              this.modalIsOpen = false
            })
            .catch(error => {
              console.log(error)
              alert(error.message)
            })
      },
      logout(){
        VueCookies.remove('MapperId')
        this.modalIsOpen = false
      },
      checkAuth(){
        if(VueCookies.get('MapperId')){
          return true
        }
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
      addMap(){
        if(!this.checkAuth()){
          alert('Недостаточно прав для загрузки карты, авторизуйтесь');
          return false;
        }
        console.log('Add Map try')
        this.modalData.header = 'Добавить карту'
        this.modalData.body = 'AddMap'
        this.modalIsOpen = true
      },
      changeMap(selectMap){
        this.currentMap = this.maps.find(el => el.id === selectMap)
        VueCookies.set('currentMap', selectMap, 60 * 60 * 24 * 30, '/')
        this.modalClose()
      },
      openAddMark(coordinates){
        if(!this.checkAuth()){
          console.log('Недостаточно прав для создания метки')
          return false;
        }
        this.newMark.left = coordinates.left
        this.newMark.top = coordinates.top
        this.newMark.zoomPercent = this.zoomPercent
        this.newMark.mapId = this.currentMap.id
        this.modalData.header = 'Добавить метку'
        this.modalData.body = 'AddPlace'
        this.modalIsOpen = true
      },
      async addNewMark(placeModel){
        if(!this.checkAuth()){
          console.log('Недостаточно прав для создания метки')
          return false;
        }
        this.newMark.name = placeModel.name
        this.newMark.description = placeModel.description
        this.newMark.photo = placeModel.photo
          const db = getFirestore()
          try {
            const docRef = await addDoc(collection(db, "Marks"), this.newMark);
            console.log("Запись в базу выполнена успешно ID: ", docRef.id);
          } catch (e) {
            console.error("Ошибка записи в базу данных: ", e);
          }
        this.modalClose();
        this.clearMarkModel();
        await this.fetchMarks()
      },
      async deletePlace(id) {
        if(!this.checkAuth()){
          alert('Недостаточно прав, авторизуйтесь!');
          return false;
        }
        const db = getFirestore()
        try {
          await deleteDoc(doc(db, "Marks", id));
          this.marks = this.marks.filter(function (f) {
            return f.id !== id
          })
          this.modalClose();
        } catch (e) {
          console.log(e)
        }
      },
      clearMarkModel(){
        this.newMark.name = ''
        this.newMark.photo = ''
        this.newMark.description = ''
        this.newMark.left = ''
        this.newMark.top = ''
        this.newMark.zoomPercent = ''
        this.newMark.mapId = ''
      },
      openPlaceInfo(id){
        console.log(id)
        this.modalData.header = 'Информация о месте'
        this.modalData.body = 'PlaceInfo'
        this.currentPlace = this.getCurrentPlace(id)
        this.modalIsOpen = true
      },
      zoomPlus(){
        if(this.zoomPercent <= 300){
          this.zoomPercent += 10;
        }
      },
      zoomMinuse(){
          if(this.zoomPercent >= 150) {
            this.zoomPercent -= 10
          }
      },
      modalClose(){
        this.modalIsOpen = false
      },
      async fetchMaps(){
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, "Maps"));
        querySnapshot.forEach((doc) => {
          let map = {
            id: doc.id,
            name: doc.data().name,
            file: doc.data().file,
            width: doc.data().width,
            height: doc.data().height
          }
          this.maps.push(map)
          this.getCurrentMap()
          this.fetchMarks()
        });
      },
      async fetchMarks(){
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, "Marks"), where('mapId', '==', this.currentMap));
        querySnapshot.forEach((doc) => {
              let mark = {
                id: doc.id,
                name: doc.data().name,
                photo: doc.data().photo,
                left: doc.data().left,
                top: doc.data().top,
                description: doc.data().description,
                zoomPercent: doc.data().zoomPercent,
                mapId: doc.data().mapId
              }
              this.marks.push(mark)
      });
      },
      getCurrentMap(){
        if(this.maps !== [] && VueCookies.get('currentMap')){
          this.currentMap = this.maps.find(el => el.id == VueCookies.get('currentMap'))
        }
      },
      getCurrentPlace(id){
        if(this.marks !== []){
          return this.marks.find(el => el.id == id)
        }
      }
    },
  beforeMount() {

  },
  mounted() {
    this.fetchMaps();
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