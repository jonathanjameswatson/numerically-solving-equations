let t = 0;
let lastTime = 0;

const getY = x => (x ** 6) + 4 * x - 3;

let xs;
let ys;

let progress;

let moving;
let original;

const passTime = () => {
  t = 0.25 / min(100, window.performance.now() - lastTime);
  lastTime = window.performance.now();
};

const initialise = () => {
  xs = [0, 1, 0];
  ys = xs.map(x => getY(x));

  progress = 1;
  moving = 0;
};

initialise();

const update = () => {
  passTime();

  if (progress >= 1) {
    ({ 2: xs[moving] } = xs);
    ({ 2: ys[moving] } = ys);

    xs[2] = (xs[0] + xs[1]) / 2;
    ys[2] = getY(xs[2]);

    if (ys[2] * ys[0] > 0) {
      moving = 0;
      [original] = xs;
    } else {
      moving = 1;
      [, original] = xs;
    }

    progress = t;
  }

  xs[moving] = original + (xs[2] - original) * (progress ** 3);
  ys[moving] = getY(xs[moving]);

  progress += t;
};

draw = () => {
  update();

  if (xs[1] - xs[0] < 0.5 ** 7.5) {
    initialise();
  }

  background('#ff7070');

  noFill();
  stroke('black');

  beginShape();
  for (let x = 0; x < width * 0.8; x += 1) {
    vertex(0.1 * width + x, height / 2 - getY(x / (0.8 * width)) * height * 0.4);
  }
  endShape();

  line(width * 0.1, height / 2, width * 0.9, height / 2);
  line(width * 0.1, height * 0.1, width * 0.1, height * 0.9);

  stroke('blue');
  line(width * (0.1 + 0.8 * xs[0]), height / 2, width * (0.1 + 0.8 * xs[0]),
    height / 2 - ys[0] * height * 0.4);

  stroke('red');
  line(width * (0.1 + 0.8 * xs[1]), height / 2, width * (0.1 + 0.8 * xs[1]),
    height / 2 - ys[1] * height * 0.4);

  noStroke();
  fill('black');

  text('0', 0.1 * width, height / 2);
  textAlign(RIGHT, BASELINE);
  text('1', 0.9 * width, height / 2);
  textAlign(CENTER, BASELINE);
  text('0.5', width / 2, height / 2);

  textAlign(RIGHT, TOP);
  text('x', 0.9 * width, height / 2);
  text('1', 0.1 * width, height * 0.1);
  textAlign(RIGHT, BASELINE);
  text('-1', 0.1 * width, height * 0.9);

  textAlign(LEFT, TOP);
  text('y', 0.1 * width, height * 0.1);

  textAlign(LEFT, BASELINE);
  if (moving === 0) {
    text(`${original} < x < ${xs[1]}`, width / 100, width / 40);
  } else {
    text(`${xs[0]} < x < ${original}`, width / 100, width / 40);
  }
};
