import * as THREE from 'three';

const loader = new THREE.TextureLoader();

export function getMap(src, originalMap) { // eslint-disable-line
  const map = loader.load(src);
  map.wrapS = map.wrapT = THREE.RepeatWrapping; // eslint-disable-line
  map.repeat.copy(originalMap.repeat);
  return map;
}
