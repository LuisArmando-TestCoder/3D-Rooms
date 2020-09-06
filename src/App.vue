<template>
  <div id="app">
    <Rooms/>
  </div>
</template>

<script>
import Rooms from './components/Rooms.vue';

export default {
  name: 'App',
  components: {
    Rooms,
  },
};
</script>

<style>
body, canvas {
  display: block;
  margin: 0;
}
</style>
