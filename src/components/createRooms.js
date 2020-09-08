import * as THREE from 'three';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
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

function getCamera() {
  const camera = new THREE.PerspectiveCamera(85, 1, 0.01, 100);
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
  // const firstPersonControls = new FirstPersonControls(camera);
  // const clock = new THREE.Clock();

  // firstPersonControls.lookSpeed = 0.35;
  // firstPersonControls.movementSpeed = 50;
  // firstPersonControls.constrainVertical = true;

  scene.add(new THREE.GridHelper(100, 100, '#ffe'));

  renderer.setClearColor('#001', 1);

  camera.position.set(0, 10, -10);
  camera.lookAt(new THREE.Vector3());

  setFirstPersonPositionControllers();
  setFirstPersonDirectionControllers(camera);
  draw(() => {
    // firstPersonControls.update(clock.getDelta());
    updateFirstPersonPosition();
    renderer.render(scene, camera);
  });
}

export default createRooms;
