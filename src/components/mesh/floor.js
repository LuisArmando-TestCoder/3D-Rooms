import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const path = '/static/textures/bamboo-wood-semigloss-bl/bamboo-wood-semigloss-';
const getSrc = (name) => `${path}${name}.png`;
const albedoSrc = getSrc('albedo');
const normalSrc = getSrc('normal');
const aoSrc = getSrc('ao');
const metalSrc = getSrc('metal');
const roughnessSrc = getSrc('roughness');

function getMap(src, originalMap) {
  const map = loader.load(src);
  map.wrapS = map.wrapT = THREE.RepeatWrapping; // eslint-disable-line
  map.repeat.copy(originalMap.repeat);
  return map;
}

const map = loader.load(albedoSrc);
map.wrapS = map.wrapT = THREE.RepeatWrapping; // eslint-disable-line
map.repeat.set(3, 1).multiplyScalar(4);

const normalMap = getMap(normalSrc, map);

const aoMap = getMap(aoSrc, map);

const metalMap = getMap(metalSrc, map);

const roughnessMap = getMap(roughnessSrc, map);

const geometry = new THREE.PlaneGeometry(60, 20, 1, 1);
const material = new THREE.MeshStandardMaterial({
  roughnessMap,
  metalMap,
  aoMap,
  normalMap,
  map,
});

const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = -Math.PI / 2;

export default floor;
