<template>
    <div  class="map">
        <div class="map-img"
        :style="{height: height*zoomPercent + 'px', width: width*zoomPercent + 'px'}">
        </div>
	</div>
</template>

<script>
export default{

    data(){
        return{
            height: 9,
            width: 9.6,
            zoomPercent: 200,
        }
    },
    methods: {
        
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

<style>
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
}
.map-img{
    position: relative;
    margin: 0 auto;

    background-image: url('../maps/map.jpg');
    background-position: center;
    background-size: cover;
}
</style>