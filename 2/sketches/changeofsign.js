let t = 0;
let lastTime = 0;

let xLine;

const getY = x => (x ** 3) - 0.5 * (x ** 2) + x - 0.5;

const passTime = () => {
  t += min(100, window.performance.now() - lastTime) / 2500;
  lastTime = window.performance.now();
};

const update = () => {
  passTime();

  xLine = 0.25 + noise(t) / 2;
};

draw = () => {
  update();

  background('#ff7070');

  noFill();
  stroke('black');
  beginShape();
  for (let x = 0; x < width; x += 1) {
    vertex(x, height / 2 - getY(x / width) * 100000 / height);
  }
  endShape();

  line(0, height / 2, width, height / 2);

  if (getY(xLine) > 0) {
    stroke('red');
  } else {
    stroke('blue');
  }

  line(xLine * width, height / 2, xLine * width, height / 2 - getY(xLine) * 100000 / height);

  noStroke();

  textAlign(LEFT, BASELINE);
  noFill();
  circle(width / 2, height / 2, width / 125);
  fill('black');

  text(`x = ${xLine.toFixed(2)}, y = ${getY(xLine).toFixed(2)}`, width / 100, width / 40);
};
