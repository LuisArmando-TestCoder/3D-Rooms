import {
  mouseController,
} from './cameraDirectionController';

const keyController = {
  event: null,
};

const friqtionResistance = 2;

const cameraVector = {
  position: {
    x: 0,
    z: 0,
  },
  acceleration: {
    x: 0,
    z: 0,
  },
  friqtion: {
    x: 0.01,
    z: 0.01,
  },
  top: {
    acceleration: {
      x: 0.1,
      z: 0.1,
    },
  },
};

const move = {
  forward() {
    cameraVector.acceleration.z += cameraVector.friqtion.z * friqtionResistance;
  },
  backward() {
    cameraVector.acceleration.z -= cameraVector.friqtion.z * friqtionResistance;
  },
  right() {
    cameraVector.acceleration.x -= cameraVector.friqtion.x * friqtionResistance;
  },
  left() {
    cameraVector.acceleration.x += cameraVector.friqtion.x * friqtionResistance;
  },
};

const movementKeys = {
  w: move.forward,
  a: move.left,
  s: move.backward,
  d: move.right,
  ArrowUp: move.forward,
  ArrowLeft: move.left,
  ArrowDown: move.backward,
  ArrowRight: move.right,
};

const variousaAxis = ['x', 'z'];

function reduceFirstPersonPositionAcceleration() {
  const key = 'acceleration';
  const obj = cameraVector;
  variousaAxis.forEach((axis) => {
    const surpassingFriqtion = Math.abs(obj[key][axis]) > obj.friqtion[axis] / 2;
    if (surpassingFriqtion) {
      obj[key][axis] += -Math.sign(obj[key][axis]) * (obj.friqtion[axis] / friqtionResistance);
    } else {
      obj[key][axis] = 0;
    }
  });
}

function topFirstPersonPositionAcceleration() {
  variousaAxis.forEach((axis) => {
    if (cameraVector.acceleration[axis] > cameraVector.top.acceleration[axis]) {
      cameraVector.acceleration[axis] = cameraVector.top.acceleration[axis];
    }
    if (cameraVector.acceleration[axis] < -cameraVector.top.acceleration[axis]) {
      cameraVector.acceleration[axis] = -cameraVector.top.acceleration[axis];
    }
  });
}

function setMoveOnKeyDown() {
  const validKey = movementKeys[keyController.event && keyController.event.key];
  if (validKey) validKey();
}

export function updateFirstPersonPosition() {
  setMoveOnKeyDown();
  reduceFirstPersonPositionAcceleration();
  topFirstPersonPositionAcceleration();
  const { camera, cameraDirection } = mouseController;
  const obj = cameraVector;
  obj.position.x += obj.acceleration.x;
  obj.position.z += obj.acceleration.z;
  camera.position.x += Math.sin(cameraDirection.x) * obj.position.z;
  camera.position.z += Math.cos(cameraDirection.x) * obj.position.z;
}

export function setFirstPersonPositionControllers() {
  window.addEventListener('keydown', (event) => {
    keyController.event = event;
  });
  window.addEventListener('keyup', () => {
    keyController.event = null;
  });
}
