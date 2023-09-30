const noiseScalse = 100;
const width = 500;
const height = 500;
const n = 500; // number of particles
const particles = [];
let noiseImg;

function setup() {
  createCanvas(500, 500);
  noiseDetail(1, 0);
  noiseImg = genNoiseImg();
  image(noiseImg, 0, 0);

  // init particles
  for (let i = 0; i < n; i++) {
    const particle = {};
    particle.pos = createVector(random(width), random(height));
    particles.push(particle);
  }
}

// get gradient vector and rotate 90deg
function curl(x, y) {
  const EPSILON = 0.001; // sampling interval
  // Find rate of change in X direction
  let n1 = noise(x + EPSILON, y);
  let n2 = noise(x - EPSILON, y);
  // Average to find approximate derivative
  const cx = (n1 - n2) / (2 * EPSILON);

  // Find rate of change in Y direction
  n1 = noise(x, y + EPSILON);
  n2 = noise(x, y - EPSILON);

  // Average to find approximate derivative
  const cy = (n1 - n2) / (2 * EPSILON);

  // return new createVector(cx, cy);
  return new createVector(cy, -cx); // rotate 90deg
}

function draw() {
  tint(255, 10);
  image(noiseImg, 0, 0); // fill with transparent noise image
  strokeWeight(4); // particle size
  stroke(255);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.pos.add(curl(p.pos.x / noiseScalse, p.pos.y / noiseScalse));
    point(p.pos.x, p.pos.y);
  }
}

function genNoiseImg() {
  const noiseImg = createGraphics(width, height);
  noiseImg.loadPixels();
  const widthd = width * pixelDensity();
  const heightd = height * pixelDensity();
  for (let i = 0; i < widthd; i++) {
    for (let j = 0; j < heightd; j++) {
      let x = i / pixelDensity();
      let y = j / pixelDensity();
      let bright = pow(noise(x / noiseScalse, y / noiseScalse), 1 / 2.0) * 400;
      noiseImg.pixels[(i + j * widthd) * 4] = bright;
      noiseImg.pixels[(i + j * widthd) * 4 + 1] = bright;
      noiseImg.pixels[(i + j * widthd) * 4 + 2] = bright;
      noiseImg.pixels[(i + j * widthd) * 4 + 3] = 255;
    }
  }
  noiseImg.updatePixels();
  return noiseImg;
}
