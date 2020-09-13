// import * as THREE from 'three';
import {
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader';

export default function addSculpture(scene) {
  const loader = new GLTFLoader();
  loader.setCrossOrigin('anonymous');
  loader.load('/static/models/signe_tegner/scene.gltf', (gltf) => {
    const sculpture = gltf.scene.children[0];
    sculpture.scale.setScalar(0.5, 0.5, 0.5);
    sculpture.position.x = 50;
    sculpture.position.y = 9;
    sculpture.rotation.z = 4.8;
    scene.add(gltf.scene);
  });
}
