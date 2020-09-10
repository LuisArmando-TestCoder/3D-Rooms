import * as THREE from 'three';

const paintings = [
  {
    resource: '590141',
    direction: 1,
    x: 10,
  },
  {
    resource: '2508810',
    direction: -1,
    x: 0,
  },
  {
    resource: '3013982',
    direction: 1,
    x: -10,
  },
  {
    resource: '1770803',
    direction: -1,
    x: -20,
  },
];

export function setPainting(scene, config = {
  direction: -1,
  resource: '1770803',
  x: 9,
}) {
  const scale = 15;
  const base = 5;
  const textureLoader = new THREE.TextureLoader();
  const imageLoader = new THREE.ImageLoader();
  const resourceFormat = '.jpeg';
  const basePath = 'https://images.pexels.com/photos/';
  const urlVars = '?auto=compress&cs=tinysrgb&dpr=1&w=2600';
  const { resource } = config;
  const url = `${basePath}${resource}/pexels-photo-${resource}${resourceFormat}${urlVars}`;
  imageLoader.load(
    url,
    (image) => {
      const z = 10;
      const aspectRatio = image.width / image.height;
      const geometry = new THREE.PlaneGeometry(
        aspectRatio * scale,
        scale,
        1,
        1,
      );
      const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(url),
        side: THREE.DoubleSide,
      });

      const picture = new THREE.Mesh(geometry, material);
      picture.position.set(config.x, scale / 2 + base, (z - 0.1) * config.direction);
      scene.add(picture);

      const resizedScale = scale * 1.02;
      const frameMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: '#333',
      });
      const frameGeometry = new THREE.PlaneGeometry(
        aspectRatio * resizedScale,
        resizedScale,
        1,
        1,
      );
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(config.x, scale / 2 + base, (z - 0.01) * config.direction);
      scene.add(frame);
    },
  );
}

export function setPaintings(scene) {
  paintings.forEach(({
    resource,
    direction,
    x,
  }) => {
    setPainting(scene, {
      resource,
      direction,
      x,
    });
  });
}
