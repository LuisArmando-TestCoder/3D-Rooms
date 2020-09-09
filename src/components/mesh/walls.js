import * as THREE from 'three';
import { getMap } from './utils';

const loader = new THREE.TextureLoader();

const path = '/static/textures/floral-embossed-wallpaper1-bl/floral-embossed-wallpaper1_';
const getSrc = (name) => `${path}${name}.png`;
const albedoSrc = getSrc('albedo');
const normalSrc = getSrc('normal-ogl');
const aoSrc = getSrc('ao');
const metalSrc = getSrc('metallic');
const roughnessSrc = getSrc('roughness');

const map = loader.load(albedoSrc);
map.wrapS = map.wrapT = THREE.RepeatWrapping; // eslint-disable-line
map.repeat.set(3, 1).multiplyScalar(2);

const normalMap = getMap(normalSrc, map);

const aoMap = getMap(aoSrc, map);

const metalMap = getMap(metalSrc, map);

const roughnessMap = getMap(roughnessSrc, map);

const y = 25;
const geometry = new THREE.BoxGeometry(60, y, 20);

const material = new THREE.MeshStandardMaterial({
  roughnessMap,
  metalMap,
  aoMap,
  normalMap,
  map,
  side: THREE.BackSide,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.y = y / 2 - 1;

export default cube;
