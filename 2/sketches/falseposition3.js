let t = 0;
let lastTime = 0;

const getY = x => (x ** 6) + 4 * x - 3;
const getC = (xs, ys) => (xs[0] * ys[1] - xs[1] * ys[0]) / (ys[1] - ys[0]);

let xs;
let ys;
let c;

let progress;

let moving;
let original;

const passTime = () => {
  t = min(100, window.performance.now() - lastTime) / 1500;
  lastTime = window.performance.now();
};

const initialise = () => {
  xs = [0, 1];
  ys = xs.map(x => getY(x));

  c = 0;

  progress = 1;
  moving = 0;
};

const update = () => {
  passTime();

  if (progress >= 1) {
    xs[moving] = c;
    ys[moving] = getY(c);

    c = getC(xs, ys);

    if (c * ys[0] < 0) {
      moving = 0;
      [original] = xs;
    } else {
      moving = 1;
      [, original] = xs;
    }

    progress = t;
  }

  xs[moving] = original + (c - original) * (progress ** 3);
  ys[moving] = getY(xs[moving]);

  progress += t;
};

initialise();

draw = () => {
  update();

  if (c - 0.716247 < 0.1 ** 5 && c - 0.71624672584524 > (-0.1) ** 5) {
    initialise();
  }

  background('#ff7070');

  noFill();
  stroke('black');

  beginShape();
  for (let x = 0; x < width * 0.8; x += 1) {
    vertex(0.1 * width + x, height / 2 - getY(x / (0.8 * width)) * height * 0.4 / 3);
  }
  endShape();

  line(width * 0.1, height / 2, width * 0.9, height / 2);
  line(width * 0.1, height * 0.1, width * 0.1, height * 0.9);

  stroke('blue');
  line(width * (0.1 + 0.8 * xs[0]), height / 2, width * (0.1 + 0.8 * xs[0]),
    height / 2 - ys[0] * height * 0.4 / 3);

  stroke('red');
  line(width * (0.1 + 0.8 * xs[1]), height / 2, width * (0.1 + 0.8 * xs[1]),
    height / 2 - ys[1] * height * 0.4 / 3);

  stroke('purple');
  line(width * (0.1 + 0.8 * xs[0]), height / 2 - ys[0] * height * 0.4 / 3,
    width * (0.1 + 0.8 * xs[1]), height / 2 - ys[1] * height * 0.4 / 3);
  circle(width * (0.1 + 0.8 * c), height / 2, width / 125);

  noStroke();
  fill('black');

  textAlign(LEFT, BASELINE);
  text('0', 0.1 * width, height / 2);
  textAlign(RIGHT, BASELINE);
  text('1', 0.9 * width, height / 2);
  textAlign(CENTER, BASELINE);
  text('0.5', width / 2, height / 2);

  textAlign(RIGHT, TOP);
  text('x', 0.9 * width, height / 2);
  text('3', 0.1 * width, height * 0.1);
  textAlign(RIGHT, BASELINE);
  text('-3', 0.1 * width, height * 0.9);

  textAlign(LEFT, TOP);
  text('y', 0.1 * width, height * 0.1);

  textAlign(LEFT, BASELINE);
  text(`c = ${c}`, width / 100, width / 40)
};
