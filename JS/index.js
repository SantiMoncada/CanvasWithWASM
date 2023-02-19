const canvasId = "canvas";
const ctx = document.querySelector(canvasId).getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

document.querySelector(canvasId).setAttribute("width", width - 10);
document.querySelector(canvasId).setAttribute("height", height - 10);

const postion = {
  x: 0,
  y: 0,
};

const keysPressed = {
  left: false,
  right: false,
  up: false,
  down: false,
};

document.onkeydown = (e) => {
  const { key } = e;
  switch (key) {
    case "ArrowLeft":
      keysPressed.left = true;
      break;
    case "ArrowRight":
      keysPressed.right = true;
      break;
    case "ArrowUp":
      keysPressed.up = true;
      break;
    case "ArrowDown":
      keysPressed.down = true;
      break;
  }
};
document.onkeyup = (e) => {
  const { key } = e;
  switch (key) {
    case "ArrowLeft":
      keysPressed.left = false;
      break;
    case "ArrowRight":
      keysPressed.right = false;
      break;
    case "ArrowUp":
      keysPressed.up = false;
      break;
    case "ArrowDown":
      keysPressed.down = false;
      break;
  }
};

setInterval(() => {
  const { left, right, up, down } = keysPressed;
  if (left) {
    postion.x -= 10;
  }

  if (right) {
    postion.x += 10;
  }

  if (up) {
    postion.y -= 10;
  }

  if (down) {
    postion.y += 10;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillRect(postion.x, postion.y, 100, 100);
}, 1000 / 60);
