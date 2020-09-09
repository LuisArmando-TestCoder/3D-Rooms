import * as THREE from 'three';
import { getMap } from './utils';

const loader = new THREE.TextureLoader();

const path = '/static/textures/mahogfloor-bl/mahogfloor_';
const getSrc = (name) => `${path}${name}.png`;
const basecolorSrc = getSrc('basecolor');
const normalSrc = getSrc('normal');
const aoSrc = getSrc('AO');
const heightSrc = getSrc('Height');
const roughnessSrc = getSrc('roughness');

const map = loader.load(basecolorSrc);
map.wrapS = map.wrapT = THREE.RepeatWrapping; // eslint-disable-line
map.repeat.set(3, 1).multiplyScalar(4);

const normalMap = getMap(normalSrc, map);

const aoMap = getMap(aoSrc, map);

const heightMap = getMap(heightSrc, map);

const roughnessMap = getMap(roughnessSrc, map);

const geometry = new THREE.PlaneGeometry(60, 20, 1, 1);
const material = new THREE.MeshStandardMaterial({
  roughnessMap,
  heightMap,
  aoMap,
  normalMap,
  map,
});

const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = -Math.PI / 2;

export default floor;
