<template>
  <div id="app">
    <RegistroFinanzas />
  </div>
</template>

<script>
import RegistroFinanzas from './components/RegistroFinanzas.vue'

export default {
  name: 'App',
  components: {
    RegistroFinanzas
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
