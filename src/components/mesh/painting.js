import * as THREE from 'three';

const pexelsPaintings = [
  {
    pexelsId: '590141',
    direction: 1,
    x: 10,
  },
  {
    pexelsId: '2508810',
    direction: -1,
    x: 0,
  },
  {
    pexelsId: '3013982',
    direction: 1,
    x: -10,
  },
  {
    pexelsId: '1770803',
    direction: -1,
    x: -20,
  },
];

export function setPainting(scene, config = {
  direction: -1,
  pexelsId: '1770803',
  customUrlResource: null,
  x: 9,
}) {
  const scale = 15;
  const base = 5;
  const textureLoader = new THREE.TextureLoader();
  const imageLoader = new THREE.ImageLoader();
  const pexelsResourceFormat = '.jpeg';
  const pexelsbasePath = 'https://images.pexels.com/photos/';
  const pexelsUrlVars = '?auto=compress&cs=tinysrgb&dpr=1&w=2600';
  const { pexelsId, customUrlResource } = config;
  const pexelsResourcePath = `${pexelsId}/pexels-photo-${pexelsId}${pexelsResourceFormat}`;
  const pexelsURL = `${pexelsbasePath}${pexelsResourcePath}${pexelsUrlVars}`;
  const customUrl = customUrlResource || pexelsURL;

  textureLoader.crossOrigin = 'anonymous';
  imageLoader.crossOrigin = 'anonymous';

  imageLoader.load(
    customUrl,
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
        map: textureLoader.load(customUrl),
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

export function setPexelsPaintings(scene) {
  pexelsPaintings.forEach(({
    pexelsId,
    direction,
    x,
  }) => {
    setPainting(scene, {
      pexelsId,
      direction,
      x,
    });
  });
}
