<template>
    <div  class="map">
        <div class="map-img" v-if="currentMap"
        :style="{
          height: (currentMap.height/200)*zoomPercent + 'px',
          width: (currentMap.width/200)*zoomPercent + 'px',
          backgroundImage: 'url(' + currentMap.file + ')'
        }"
        @dblclick="createMark"
        >
          <Mark v-for="mark in marks"
                :left="(mark.left/mark.zoomPercent)*zoomPercent"
                :top="(mark.top/mark.zoomPercent)*zoomPercent"
                :name="mark.name"
                @click="openPlaceInfo(mark.id)"
          />
        </div>
	</div>
</template>

<script>
import Mark from "./UI/Mark";
export default{
  components: {Mark},
  props: {
    zoomPercent:{
      type: Number,
      default: 200
    },
    currentMap:{
      type: Object,
      required: false
    },
    marks:{
      type: Array,
      required: true
    }
  },
  data(){
    return {
      height: 4139,
      width: 5161,
      left: 0,
      top: 0,
      saveZoom: 0

    }
  },
  methods: {
    createMark(event){
      const coordinates = {
        left: event.layerX+2,
        top:event.layerY+2
      }
      this.$emit('createMark', coordinates)
    },
    openPlaceInfo(id){
      this.$emit('openPlace', id)
    }
  },
}

document.addEventListener('DOMContentLoaded', function() {
    const ele = document.querySelector('.map');
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function(e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Получение текущей позиции мышки
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        // Как мышка будет сдвигаться
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Прокрутка элемента
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function() {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
});


</script>

<style scoped>
.map{
	width:100%;
	height:100%;
	overflow:auto;
	margin: 0px auto;
	cursor: grab;
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;
}
.map::-webkit-scrollbar {
	width: 0;
  height: 0;
}
.map-img{
    position: relative;
    margin: 0 auto;
    background-position: center;
    background-size: cover;
}

</style>