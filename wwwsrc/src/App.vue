<template>
  <div id="app">
    <img class="welcome-image" src="./assets/burgershack-welcome.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // this.$store.dispatch('authenticateUser')
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.welcome-image{
  width: 50%;
  height: 50%;
}
</style>
