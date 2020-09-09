import * as THREE from 'three';

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
  return new THREE.Scene();
}
