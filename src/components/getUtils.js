import * as THREE from 'three';

export const color = 0x000;// white
export const near = 10;
export const far = 100;

export function getRenderer(canvas) {
  return new THREE.WebGLRenderer({ canvas });
}

export function getAspectRatio() {
  return window.innerWidth / window.innerHeight;
}

export function getCamera() {
  const camera = new THREE.PerspectiveCamera(32, getAspectRatio(), 1, 100);
  camera.lookAt(new THREE.Vector3());
  return camera;
}

export function getScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(color, near, far);
  return scene;
}
