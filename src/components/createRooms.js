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
  handleWindowResize,
  getRenderer,
  getCamera,
  getScene,
  color,
} from './getUtils';
import floor from './mesh/floor';
import { addLight } from './lights/sceneLight';
import { setPexelsPaintings } from './mesh/painting';
import walls from './mesh/walls';
import addSculpture from './mesh/sculpture';

function createRooms() {
  const { draw, c, size } = preset(null, 'canvas', null);

  size();

  const renderer = getRenderer(c);
  const camera = getCamera();
  const scene = getScene();

  addLight(scene);
  setPexelsPaintings(scene);
  addSculpture(scene);

  scene.add(floor);
  scene.add(walls);

  renderer.setClearColor(color, 1);

  camera.position.set(-25, 10, 0);
  camera.lookAt(new THREE.Vector3());

  handleWindowResize(camera, renderer);

  setFirstPersonPositionControllers();
  setFirstPersonDirectionControllers(camera, c);
  draw(() => {
    updateFirstPersonPosition();
    renderer.render(scene, camera);
  });
}

export default createRooms;
