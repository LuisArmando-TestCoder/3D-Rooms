import * as THREE from 'three';

export function addLight(scene, config = {// eslint-disable-line
  x: 0,
  z: 0,
  radius: 1,
  color: '#fff',
}) {
  const light = new THREE.PointLight(config.color, config.radius);
  light.position.set(config.x, 20, config.z);

  const geometry = new THREE.CircleGeometry(config.radius, 64);
  const material = new THREE.MeshBasicMaterial({ color: config.color });
  const circle = new THREE.Mesh(geometry, material);
  circle.position.set(config.x, 23, config.z);

  circle.rotation.x = Math.PI / 2;

  const geometry2 = new THREE.CircleGeometry(config.radius + 1, 64);
  const material2 = new THREE.MeshBasicMaterial({ color: '#333' });
  const circle2 = new THREE.Mesh(geometry2, material2);
  circle2.position.set(config.x, 23.35, config.z);

  circle2.rotation.x = Math.PI / 2;

  scene.add(light);
  scene.add(circle);
  scene.add(circle2);
}
