<template>
    <div class="mapDownload">
      <div class="downloadForm">
        <input v-model="mapData.name" type="text" placeholder="Наименование карты"/><br>
        <input v-model="mapData.width" type="number" placeholder="Ширина">
        <input v-model="mapData.height" type="number" placeholder="Высота">
        <input
            type="file"
            @change="onFileSelected"
        />
      </div>
      <button @click="onUpload" class="btn-green">Добавить</button>
    </div>
</template>

<script>
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { getFirestore, collection, addDoc} from "firebase/firestore";

export default {
  name: "AddMap",

  data(){
    return{
      selectedFile: null,
      mapData: {
        name: '',
        file: '',
        width: 0,
        height: 0
      }
    }
  },

  methods:{
    onFileSelected(event){
      console.log(event.target.files['0'])
      this.selectedFile = event.target.files['0']
    },
    async onUpload(){
      const  storage = getStorage()
      const mountainsRef = ref(storage, this.selectedFile.name);
      const mountainImagesRef = ref(storage, 'maps/'+this.selectedFile.name);
      if(mountainsRef.name === mountainImagesRef.name){
        uploadBytes(mountainImagesRef, this.selectedFile).then((snapshot) => {
          console.log(snapshot)
          console.log('Изображение загружено успешно на сервер');
          getDownloadURL(mountainImagesRef)
              .then((url) => {
                this.mapData.file = url
              })
              .catch((error) =>{
                console.log(error)
              })
        });
        const db = getFirestore()
        try {
          const docRef = await addDoc(collection(db, "Maps"), this.mapData);
          console.log("Запись в базу выполнена успешно ID: ", docRef.id);
        } catch (e) {
          console.error("Ошибка записи в базу данных: ", e);
        }
      }else{
        console.log('Ошибка соотношения данных с базой')
      }
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
.mapDownload{

}
input{
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
.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
  width: 100%;
  text-align: center;
  height: 25px;
  cursor: pointer;
  margin-top: 10px;
}
</style>