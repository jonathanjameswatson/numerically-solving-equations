const getY = x => (x ** 6) + 4 * x - 3;
const getC = (xs, ys) => (xs[0] * ys[1] - xs[1] * ys[0]) / (ys[1] - ys[0]);

let xs;
let ys;
let c;

const initialise = () => {
  xs = [0, 1];
  ys = xs.map(x => getY(x));

  c = getC(xs, ys);
};

initialise();

draw = () => {
  background('#ff7070');

  noFill();
  stroke('black');

  line(width * 0.1, height / 2, width * 0.9, height / 2);

  stroke('blue');
  line(width * (0.1 + 0.8 * xs[0]), height / 2, width * (0.1 + 0.8 * xs[0]),
    height / 2 - ys[0] * height * 0.4 / 3);

  stroke('red');
  line(width * (0.1 + 0.8 * xs[1]), height / 2, width * (0.1 + 0.8 * xs[1]),
    height / 2 - ys[1] * height * 0.4 / 3);

  stroke('purple');
  line(width * (0.1 + 0.8 * xs[0]), height / 2 - ys[0] * height * 0.4 / 3,
    width * (0.1 + 0.8 * xs[1]), height / 2 - ys[1] * height * 0.4 / 3);

  noStroke();
  fill('black');

  textAlign(CENTER, BASELINE);
  text('c', width * (0.1 + 0.8 * c), height / 2);
  text('a', width * (0.1 + 0.8 * xs[0]), height / 2);
  text('b', width * (0.1 + 0.8 * xs[1]), height / 2);

  text('c - a', width * (0.1 + 0.8 * (c + xs[0]) / 2), height / 2);
  text('b - c', width * (0.1 + 0.8 * (c + xs[1]) / 2), height / 2);

  textAlign(RIGHT, CENTER);
  text('-f(a)', 0.1 * width, height / 2 - ys[0] * height * 0.4 / 3 / 2);
  textAlign(LEFT, CENTER);
  text('f(b)', 0.9 * width, height / 2 - ys[1] * height * 0.4 / 3 / 2);
};
