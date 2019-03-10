let t = 0;
let lastTime = 0;

const roots = new Array(3);

const getY = x => roots.map(root => x - root * width).reduce((a, b) => a * b);

const passTime = () => {
  t += min(100, window.performance.now() - lastTime) / 2500;
  lastTime = window.performance.now();
};

const update = () => {
  passTime();

  for (let i = 0; i < roots.length; i += 1) {
    roots[i] = noise(t + 1000 * i) / roots.length + i / roots.length;
  }

  roots.sort((a, b) => a - b);
};

draw = () => {
  update();

  background('#ff7070');

  noFill();
  beginShape();
  for (let x = 0; x < width; x += 1) {
    vertex(x, height / 2 - getY(x) / 125 / height);
  }
  endShape();

  line(0, height / 2, width, height / 2);

  roots.forEach((root) => {
    noFill();
    circle(root * width, height / 2, width / 125);
    fill('black');
    text(root.toFixed(2), root * width, height / 2);
  });

  text('x', width / 100, height / 2);

  text(`y = ${roots.map(root => (`(x - ${root.toFixed(2)})`)).join('')}`, width / 100, width / 40);
};
