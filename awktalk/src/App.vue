<template>
  <div id="app">
    
    <!-- <router-view/> -->
  </div>
</template>

<script>
Vue.use(BootstrapVue);
import Nav from './components/Nav';
export default {
  name: 'Nav',
  components: {
    Nav
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
