import * as THREE from 'three';
import preset from 'canvas-preset';
import {
  setFirstPersonPositionControllers,
  updateFirstPersonPosition,
} from './cameraPositionController';
import {
  setFirstPersonDirectionControllers,
} from './cameraDirectionController';
import {
  getRenderer,
  getCamera,
  getScene,
} from './getUtils';

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
