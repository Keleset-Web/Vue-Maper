<template>
  <div class="menuArea">
    <div :class="{ active: isActive }" class="menu">
      <div @click="toogleActive" class="toggle">
        <ion-icon name="menu"></ion-icon>
      </div>
      <li @click.stop="openAuth" style="--i:0">
        <a href="#">
          <ion-icon name="person-circle-outline"></ion-icon>
        </a>
      </li>
      <li @click.stop="openMap" style="--i:1">
        <a href="#">
          <ion-icon name="map-outline"></ion-icon>
        </a>
      </li>
      <li @click.stop="openInfo" style="--i:2">
        <a href="#">
          <ion-icon name="information-circle-outline"></ion-icon>
        </a>
      </li>
      <li @click.stop="zoomPlus" style="--i:3">
        <a href="#">
          <ion-icon name="add-circle-outline"></ion-icon>
        </a>
      </li>
      <li @click.stop="zoomMinuse" style="--i:4">
        <a href="#">
          <ion-icon name="remove-circle-outline"></ion-icon>
        </a>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toogleActive(e) {
      this.isActive = !this.isActive
    },
    openAuth(){
      this.$emit('openAuth')
    },
    openInfo(){
      this.$emit('openInfo')
    },
    openMap(){
      this.$emit('openMap')
    },
    zoomPlus(){
      this.$emit('zoomPlus')
    },
    zoomMinuse(){
      this.$emit('zoomMinuse')
    }
  },
}
</script>

<style scoped>
.menuArea {
  position: fixed;
  top: 0;
  right: 50%;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 100vh;
}

.menu {
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 550;
}

.menu li {
  position: absolute;
  list-style: none;
  left: 0px;
  transform-origin: 100px;
  transition-delay: calc(0.1s * var(--i));
  transform: rotate(0deg) translateX(80px);
  font-size: 1em;
}

.menu li a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  transform: rotate(calc(360deg / -8 * var(--i)));
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.6);
  color: #111;
  transition: 1s;
}

.menu li a:hover {
  background-color: #111111;
  color: #fff;
}

.menu.active .toggle {
  transform: rotate(180deg);
}

.menu.active li {
  transform: rotate(calc(360deg / 8 * var(--i)));
}

.toggle {
  position: absolute;
  width: 45px;
  height: 45px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.6);
  font-size: 1.5em;
  transition: 1.2s;
}
</style>