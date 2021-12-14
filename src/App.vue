<template>
    <MapApp/>
    <Menu/>
</template>

<script>
import MapApp from "./components/Map"
import Menu from "./components/Menu"
export default{
    components: {
        MapApp,
        Menu,
    },
    data(){
    },
    methods: {
      
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