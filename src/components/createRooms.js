import * as THREE from 'three';
import preset from 'canvas-preset';
import {
  setFirstPersonPositionControllers,
  updateFirstPersonPosition,
} from './cameraPositionController';
import {
  setFirstPersonDirectionControllers,
} from './cameraDirectionController';

function getRenderer(canvas) {
  return new THREE.WebGLRenderer({ canvas });
}

function getAspectRatio() {
  return window.innerWidth / window.innerHeight;
}

function getCamera() {
  const camera = new THREE.PerspectiveCamera(32, getAspectRatio(), 1, 100);
  camera.lookAt(new THREE.Vector3());
  return camera;
}

function getScene() {
  return new THREE.Scene();
}

function createRooms() {
  const { draw, c, size } = preset(null, 'canvas', null);

  size();

  const renderer = getRenderer(c);
  const camera = getCamera();
  const scene = getScene();

  scene.add(new THREE.GridHelper(100, 100, '#ffe'));

  renderer.setClearColor('#001', 1);

  camera.position.set(0, 10, -10);
  camera.lookAt(new THREE.Vector3());

  setFirstPersonPositionControllers();
  setFirstPersonDirectionControllers(camera, c);
  draw(() => {
    updateFirstPersonPosition();
    renderer.render(scene, camera);
  });
}

export default createRooms;
