import * as THREE from 'three';
import { getMap } from './utils';

const loader = new THREE.TextureLoader();

const path = '/static/textures/mahogfloor-bl/mahogfloor_';
const getSrc = (name) => `${path}${name}.png`;
const basecolorSrc = getSrc('basecolor');
const normalSrc = getSrc('normal');
const aoSrc = getSrc('AO');
const roughnessSrc = getSrc('roughness');

const map = loader.load(basecolorSrc);
map.wrapS = map.wrapT = THREE.RepeatWrapping; // eslint-disable-line
map.repeat.set(3, 1).multiplyScalar(4);

const normalMap = getMap(normalSrc, map);

const aoMap = getMap(aoSrc, map);

const roughnessMap = getMap(roughnessSrc, map);

const geometry = new THREE.BoxGeometry(100, 40, 1, 1);
const material = new THREE.MeshStandardMaterial({
  roughnessMap,
  aoMap,
  normalMap,
  map,
});

const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;

export default floor;
