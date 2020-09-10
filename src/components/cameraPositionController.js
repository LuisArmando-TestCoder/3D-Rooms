import {
  mouseController,
} from './cameraDirectionController';

function deegresToRadians(degrees) {
  const normalizedDegrees = degrees / 360;
  return normalizedDegrees * Math.PI;
}

const keyController = {
  keys: [],
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
  rotation: 0,
  chosenAxis: 'z',
  top: {
    acceleration: {
      x: 0.1,
      z: 0.1,
    },
  },
};

const move = {
  forward() {
    cameraVector.rotation = 0;
    cameraVector.chosenAxis = 'z';
    cameraVector.acceleration.z += cameraVector.friqtion.z * friqtionResistance;
  },
  backward() {
    cameraVector.rotation = deegresToRadians(0);
    cameraVector.chosenAxis = 'z';
    cameraVector.acceleration.z -= cameraVector.friqtion.z * friqtionResistance;
  },
  right() {
    cameraVector.rotation = deegresToRadians(180);
    cameraVector.chosenAxis = 'x';
    cameraVector.acceleration.x -= cameraVector.friqtion.x * friqtionResistance;
  },
  left() {
    cameraVector.rotation = deegresToRadians(180);
    cameraVector.chosenAxis = 'x';
    cameraVector.acceleration.x += cameraVector.friqtion.x * friqtionResistance;
  },
};

const movementKeys = {
  w: move.forward,
  a: move.left,
  s: move.backward,
  d: move.right,
  W: move.forward,
  A: move.left,
  S: move.backward,
  D: move.right,
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
  keyController.keys.forEach((key) => {
    movementKeys[key]();
  });
}

export function updateFirstPersonPosition() {
  setMoveOnKeyDown();
  reduceFirstPersonPositionAcceleration();
  topFirstPersonPositionAcceleration();
  const {
    camera,
    cameraDirection,
  } = mouseController;
  const {
    acceleration,
    chosenAxis,
    rotation,
  } = cameraVector;

  camera.position.x += acceleration[chosenAxis] * Math.sin(cameraDirection.x + rotation);
  camera.position.z += acceleration[chosenAxis] * Math.cos(cameraDirection.x + rotation);
}

export function setFirstPersonPositionControllers() {
  window.addEventListener('keydown', (event) => {
    const isValidKey = Object.keys(movementKeys).includes(event.key);
    const isKeyInQueue = keyController.keys.includes(event.key);
    if (isValidKey && !isKeyInQueue) {
      keyController.keys.push(event.key);
    }
  });
  window.addEventListener('keyup', (event) => {
    const disappearingKeyIndex = keyController.keys.indexOf(event.key);
    keyController.keys.splice(disappearingKeyIndex, 1);
  });
}
