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

  beginShape();
  for (let x = 0; x < width * 0.8; x += 1) {
    vertex(0.1 * width + x, height / 2 - getY(x / (0.8 * width)) * height * 0.4 / 3);
  }
  endShape();

  line(width * 0.1, height / 2, width * 0.9, height / 2);
  line(width * 0.1, height * 0.1, width * 0.1, height * 0.9);

  circle(width * (0.1 + 0.8 * 0.716247), height / 2, width / 125);

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

  textAlign(CENTER, TOP);
  text('c', width * (0.1 + 0.8 * c), height / 2);

  textAlign(RIGHT, TOP);
  text('x', 0.9 * width, height / 2);
  text('3', 0.1 * width, height * 0.1);
  textAlign(RIGHT, BASELINE);
  text('-3', 0.1 * width, height * 0.9);

  textAlign(LEFT, TOP);
  text('y', 0.1 * width, height * 0.1);
};
