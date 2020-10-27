let ctx = canvas.getContext('2d');
let size = 8;
canvas.width = size * 64;
canvas.height = size * 64;

// clear canvas
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 64*size, 64*size);

// memory is simply an array
let memory = []

// videoOffset gets set when portTo is called with addr 14
let videoOffset = -1;

// the code, in hex form
let kaleidoscope = "3100013E81D30E3E30D30F780F0FA2814F0F0FA26F789547C5D5E51100007CE61F1FDA2B005F07070707572608CD5D00782F472606CD5D00792F4F2602CD5D00782F472604CD5D00E1D1C11DC20B00040C1E3F25C20B0014261FC30B0079E6F8176F7CCE006778E6F81F1F1F1FF5856FF17EDA7A00E6F08377C9E60F8277C9"

// copy code into memory
for (let i=0; i<kaleidoscope.length; i+=2) {
  let byte = parseInt(kaleidoscope.substr(i, 2), 16)
  memory[i/2] = byte
}

// callback used by 8080.js to write to memory.
function memoryTo(addr, value) {
  memory[addr] = value;

  if (addr >= videoOffset) {
    // convert addr to two pixels and draw them. First find the quadrant
    let memOffset = addr - videoOffset;
    let quad = (memOffset / 512)|0;
    let i = (quad % 2) * 32;
    let j = ((quad / 2)|0) * 32;
    memOffset = memOffset % 512;

    // convert memOffset to offset within quadrant
    i += (memOffset % 16)*2;
    j += (memOffset / 16)|0;

    // draw the two pixels defined by the value
    drawPixel(i, j, value)
    drawPixel(i+1, j, (value >> 4))
  }
}

function drawPixel(i, j, data) {
  // the lower four bits encode the following information:
  // |   3   |   2  |   1   |  0  |
  // | hi/lo | blue | green | red |
  let style = "#";
  let intensity = (data & 0x8) ? "ff" : "7f";
  style += (data & 0x1) ? intensity : "00";
  style += (data & 0x2) ? intensity : "00";
  style += (data & 0x4) ? intensity : "00";
  ctx.fillStyle = style;
  ctx.fillRect(i*size+2, j*size+2, size-4, size-4);
}

// callback used by 8080.js to read from memory.
function memoryAt(addr) {
  return memory[addr];
}

// unused
function ticker(T) {
}

// callback used to write to a peripheral
function portTo(addr, value) {
  switch (addr) {
    case 14:
      videoOffset = (value & 0x7f) << 9;
      break;
    case 15:
      // we only support one mode (64x64 color), so we don't need to
      // do anything.
      break;
    default:
      throw new Error("unexpected portTo")
  }
}

// callback used to read from a peripheral
function portAt(addr) {
  throw new Error("unexpected portAt")
}

// initialize 8080 simulator
CPU8080.init(memoryTo, memoryAt, ticker, portTo, portAt)

// run at 33333 steps per animationFrame, which translates to roughly 2Mhz,
// which was to the best of my knowledge, the clock speed of the Altair 8800.
function go() {
  CPU8080.steps(33333);
  window.requestAnimationFrame(go)
}
go();
