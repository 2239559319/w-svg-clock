<template>
  <div id="app">
    <clock />
  </div>
</template>

<script>
import Clock from './components/Clock'

export default {
  name: 'App',
  components: {
    Clock
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3a77a4;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3a77a4;
}
</style>
