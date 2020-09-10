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
  color,
} from './getUtils';
import floor from './mesh/floor';
import { addLight } from './lights/sceneLight';
import walls from './mesh/walls';

function createRooms() {
  const { draw, c, size } = preset(null, 'canvas', null);

  size();

  const renderer = getRenderer(c);
  const camera = getCamera();
  const scene = getScene();

  addLight(scene);

  scene.add(floor);
  scene.add(walls);

  renderer.setClearColor(color, 1);

  camera.position.set(-25, 10, 0);
  camera.lookAt(new THREE.Vector3());

  setFirstPersonPositionControllers();
  setFirstPersonDirectionControllers(camera, c);
  draw(() => {
    updateFirstPersonPosition();
    renderer.render(scene, camera);
  });
}

export default createRooms;
