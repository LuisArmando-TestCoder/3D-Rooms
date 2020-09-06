export const mouseController = {
  isPressed: false,
  pressedVector: {
    x: null,
    y: null,
  },
  cameraDirection: {
    x: 0,
    y: 0,
  },
  speedResistance: 25000,
  lookAt: {
    x: null,
    y: null,
    z: null,
  },
  camera: null,
};

function setCameraDirection(event) {
  const xLeg = mouseController.pressedVector.x - event.clientX;
  const yLeg = mouseController.pressedVector.y - event.clientY;
  mouseController.cameraDirection.x += xLeg / mouseController.speedResistance;
  mouseController.cameraDirection.y += yLeg / mouseController.speedResistance;
}

function setCameraSight(event) {
  if (mouseController.isPressed) {
    const control = mouseController;
    setCameraDirection(event);
    control.lookAt.x = control.camera.position.x + Math.sin(control.cameraDirection.x);
    control.lookAt.y = control.camera.position.y + Math.sin(control.cameraDirection.y);
    control.lookAt.z = control.camera.position.z + Math.cos(control.cameraDirection.x);
    control.camera.lookAt(
      control.lookAt.x,
      control.lookAt.y,
      control.lookAt.z,
    );
  }
}

export function setFirstPersonDirectionControllers(camera) {
  // debugger; // eslint-disable-line
  mouseController.camera = camera;
  window.addEventListener('mousedown', (event) => {
    if (!mouseController.isPressed) {
      mouseController.pressedVector = {
        x: event.clientX,
        y: event.clientY,
      };
    }
    mouseController.isPressed = true;
  });
  window.addEventListener('mousemove', setCameraSight);
  window.addEventListener('mouseup', () => {
    mouseController.isPressed = false;
  });
}
