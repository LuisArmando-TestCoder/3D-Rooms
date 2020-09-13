import * as THREE from 'three';
import {
  setMouseEventOnMesh,
} from '../getUtils';
import {
  keyController,
} from '../cameraPositionController';

const textureLoader = new THREE.TextureLoader();
const imageLoader = new THREE.ImageLoader();
textureLoader.setCrossOrigin('anonymous');
imageLoader.setCrossOrigin('anonymous');

function isValidURL(url) {
  const regexURLValidator = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/img;
  return regexURLValidator.test(url);
}

function reScaleImage() {
  const {
    object3D,
    image,
    size,
    frame,
  } = this;
  const aspectRatio = image.width / image.height;
  const preScale = 15;
  const scale = preScale / size;
  const base = 5;
  const frameAddition = 0.05;
  object3D.scale.x = aspectRatio * scale;
  object3D.scale.y = scale;
  object3D.position.y = preScale / 2 + base;

  frame.scale.x = aspectRatio * (scale + frameAddition);
  frame.scale.y = scale + frameAddition;
  frame.position.y = (preScale) / 2 + base;
}

function setImageTexture(image) {
  const {
    object3D,
    target,
  } = this;
  const newImageTexture = textureLoader.load(image.src);

  target.value = '';
  target.blur();

  reScaleImage.call({
    image,
    ...this,
  });

  object3D.material.dispose();

  console.log('object3D', object3D);

  object3D.material.map = newImageTexture;
}

function handleImageInput(event) {
  const isInputValueValidURL = isValidURL(event.target.value);
  if (isInputValueValidURL) {
    imageLoader.load(
      event.target.value,
      setImageTexture.bind({
        ...this,
        target: event.target,
      }),
    );
  }
}

function stopCameraMovement() {
  keyController.keys.splice(0);
}

function handleRaycastedEvent(object3D) {
  const imageUrl = document.getElementById('imageURL');
  imageUrl.focus();
  stopCameraMovement();
  if (!imageUrl.hasInputListener) {
    imageUrl.hasInputListener = true;
    imageUrl.addEventListener('input', handleImageInput.bind({
      object3D,
      ...this,
    }));
  }
  return null;
}

export default function addCustomPaintingPlaceholder({
  scene,
  camera,
  canvas,
}) {
  const z = 0;
  const gap = 0.1;
  const x = -50;
  const base = 5;
  const yRotation = -Math.PI / 2;
  const size = 5;
  const geometry = new THREE.PlaneGeometry(
    size,
    size,
    1,
    1,
  );
  const material = new THREE.MeshBasicMaterial({
    map: null,
    side: THREE.DoubleSide,
  });

  const picture = new THREE.Mesh(geometry, material);
  picture.position.set(x + gap * 2, size / 2 + base, z);
  picture.rotation.y = yRotation;
  scene.add(picture);

  const frameGeometry = new THREE.PlaneGeometry(
    size,
    size,
    1,
    1,
  );
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: '#333',
    side: THREE.DoubleSide,
  });

  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.set(x + gap, size / 2 + base, z);
  frame.rotation.y = yRotation;
  frame.scale.setScalar(1.05);
  scene.add(frame);

  setMouseEventOnMesh({
    eventName: 'mouseup',
    mesh: picture,
    camera,
    callback: handleRaycastedEvent.bind({
      size,
      frame,
    }),
    canvas,
  });
}
