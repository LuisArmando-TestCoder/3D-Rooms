import * as THREE from 'three';

export const color = 0x000; // white
export const near = 10;
export const far = 100;

export function getRenderer(canvas) {
  return new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
}

export function getAspectRatio() {
  return window.innerWidth / window.innerHeight;
}

export function getCamera() {
  const camera = new THREE.PerspectiveCamera(32, getAspectRatio(), 1, 500);
  camera.lookAt(new THREE.Vector3());
  return camera;
}

export function getScene() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(color, near, far);
  return scene;
}

function getMouseVector(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  return mouse;
}

export function setMouseEventOnMesh({
  eventName = 'click',
  mesh, // required
  callback = console.log,
  camera, // required
  canvas,
}) {
  const raycaster = new THREE.Raycaster();
  (canvas || document).addEventListener(eventName, (event) => {
    const mouse = getMouseVector(event);

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(mesh, true);
    const isObjectIntersecting = intersects.length > 0;

    if (isObjectIntersecting) {
      const [firstIntersected] = intersects;

      firstIntersected.object.traverse((object3D) => {
        const canExecuteCallback = object3D.isMesh && callback;

        if (canExecuteCallback) callback(object3D);
      });
    }
  });
}

export function handleWindowResize(camera, renderer) {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; // eslint-disable-line
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);
}
