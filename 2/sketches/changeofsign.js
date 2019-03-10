const getY = x => (x ** 3) - 0.5 * (x ** 2) + x - 0.5;
let y;

const update = () => {
  if (frameRate()) {
    t += 0.3 / frameRate();
  }

  y = getY(mouseX / width)
};

draw = () => {
  update();

  background('#ff7070');

  noFill();
  beginShape();
  for (let x = 0; x < width; x += 1) {
    vertex(x, height / 2 - getY(x / width) * 100000 / height);
  }
  endShape();

  line(0, height / 2, width, height / 2);

  textAlign(CENTER, CENTER);
  if (y > 0) {
    fill('red');
    text('+', mouseX, mouseY, width / 125);
  } else {
    fill('blue');
    text('-', mouseX, mouseY, width / 125);
  }

  textAlign(LEFT, BASELINE);
  noFill();
  circle(width / 2, height / 2, width / 125);
  fill('black');
  text('0.5', width / 2, height / 2);

  text('x', width / 100, height / 2);

  text(`y = ${y.toFixed(2)}`, width / 100, width / 40);
};
