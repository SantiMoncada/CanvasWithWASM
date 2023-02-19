const canvasId = "canvas";
const ctx = document.querySelector(canvasId).getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

document.querySelector(canvasId).setAttribute("width", width - 10);
document.querySelector(canvasId).setAttribute("height", height - 10);

//movenment array left right up down
let movenmentArray;

let memory = new WebAssembly.Memory({
  initial: 256,
  maximum: 512,
});

let exports;
let ptr;

WebAssembly.instantiateStreaming(fetch("testing_out.wasm"), {
  js: {
    mem: memory,
  },
  env: {
    emscripten_resize_heap: memory.grow,
    clearRect: (...args) => {
      ctx.clearRect(...args);
    },
    fillRect: (...args) => {
      ctx.fillRect(...args);
    },
  },
}).then((results) => {
  exports = results.instance.exports;
  memory = results.instance.exports.memory;

  ptr = exports.wasmmalloc(4);

  movenmentArray = new Uint8Array(memory.buffer, ptr);

  exports.establish_movement_array(ptr);

  exports.setScreenSize(width, height);

  setInterval(exports.run_frame, 1000 / 10);

  createListerners();
});

function createListerners() {
  document.onkeydown = (e) => {
    const { key } = e;
    switch (key) {
      case "ArrowLeft":
        movenmentArray[0] = 1;
        break;
      case "ArrowRight":
        movenmentArray[1] = 1;
        break;
      case "ArrowUp":
        movenmentArray[2] = 1;
        break;
      case "ArrowDown":
        movenmentArray[3] = 1;
        break;
    }
  };

  document.onkeyup = (e) => {
    const { key } = e;
    switch (key) {
      case "ArrowLeft":
        movenmentArray[0] = 0;
        break;
      case "ArrowRight":
        movenmentArray[1] = 0;
        break;
      case "ArrowUp":
        movenmentArray[2] = 0;
        break;
      case "ArrowDown":
        movenmentArray[3] = 0;
        break;
    }
  };
}
