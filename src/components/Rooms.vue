<template>
  <div>
    <input id="imageURL" class="image-URL" type="text" placeholder="Place an image url">
    <canvas tabindex="0" contenteditable="true"></canvas>
  </div>
</template>

<script>
import createRooms from './createRooms';

export default {
  name: 'Rooms',
  mounted: createRooms,
};
</script>

<style>
.image-URL {
  position: fixed;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 50px;
  padding: 5px 0px;
  font-size: 20px;
  width: clamp(100px, 25%, 200px);
  text-align: center;
  opacity: 0;
  transition: 0.25s;
  pointer-events: none;
  background: #0002;
  color: #fff;
  border: 0;
  border-bottom: 1px solid #fff;
  outline: none;
  padding: 0;
}
.image-URL:focus {
  width: clamp(200px, 50%, 400px);
  opacity: 1;
  pointer-events: all;
}
.image-URL:hover {
  background: #fff;
  color: #000;
}
canvas {
  cursor: pointer;
}
</style>
