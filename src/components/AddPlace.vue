<template>
  <div class="placeDonload">
    <div class="downloadForm">
      <input v-model='placeModel.name' type="text" placeholder="Наименование места"/><br>
      <h3>Главная фотография:</h3>
      <input
          type="file"
          @change="oneFileSelected"
      />
      <h3>Описание:</h3>
      <textarea v-model="placeModel.description" class="description">
      </textarea>
    </div>
    <button @click="addNewMark" class="btn-green">Добавить</button>
  </div>
</template>

<script>
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export default {
  name: "AddPlace",
  data(){
    return {
      placeModel:{
        name: '',
        description: '',
        photo: ''
      },
      selectedPhoto: null,

    }
  },
  methods:{
    oneFileSelected(event){
      console.log(event.target.files['0'])
      this.placeModel.photo = event.target.files['0']
    },
    addNewMark() {
      //Загрузка изображения в firebase
      const storage = getStorage()
      const mountainsRef = ref(storage, this.placeModel.photo.name);
      const mountainImagesRef = ref(storage, 'general/' + this.placeModel.photo.name);
      if (mountainsRef.name === mountainImagesRef.name) {
        uploadBytes(mountainImagesRef, this.placeModel.photo).then((snapshot) => {
          console.log(snapshot)
          console.log('Изображение места загружено успешно на сервер');
          getDownloadURL(mountainImagesRef)
              .then((url) => {
                this.placeModel.photo = url
                this.$emit('addMark', this.placeModel)
              })
              .catch((error) => {
                console.log(error)
              })
        });
      }
    }
  }
}
</script>

<style scoped>
.placeDonload{
  width: 80vw;
  height: 80vh;
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
.description{
  width: 100%;
  min-height: 400px;
  padding: 10px 0;
  font-size: 16px;
  color: #4AAE9B;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #4AAE9B;
  outline: none;
  background: transparent;
}
</style>