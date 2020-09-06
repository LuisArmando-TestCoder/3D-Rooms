<template>
  <canvas></canvas>
</template>

<script>
import createRooms from './createRooms';

export default {
  name: 'Rooms',
  mounted: createRooms,
};
</script>
