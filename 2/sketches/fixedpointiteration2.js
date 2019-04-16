const getY = x => Math.cos(x);
const xScale = 0.5 * Math.PI;
const xScaleName = 'π/2';
const iterations = 5;
const x0 = 0.5;
const label = 'x_r+1 = cos x_r';

let xs;

const initialise = () => {
  xs = [x0];

  for (let i = 0; i <= iterations; i += 1) {
    xs.push(getY(xs[xs.length - 1]));
  }
};

initialise();

draw = () => {

  background('#ff7070');

  noFill();
  stroke('black');

  // function
  beginShape();
  for (let x = 0; x < 0.8 * width; x += 1) {
    vertex(0.1 * width + x,
      0.9 * height - 0.8 * getY((x * xScale) / (0.8 * width)) * height);
  }
  endShape();

  // y = x
  beginShape();
  for (let x = 0; x < 0.8 * width; x += 1) {
    vertex(0.1 * width + x, 0.9 * height - 0.8 * ((x * xScale) / (0.8 * width)) * height);
  }
  endShape();

  textAlign(CENTER, TOP);

  fill('black');

  line(0.1 * width, 0.9 * height, 0.9 * width, 0.9 * height); // x-axis
  line(0.1 * width, 0.1 * height, 0.1 * width, 0.9 * height); // y-axis

  textSize(width / 80);

  for (let xNum = 1; xNum < xs.length; xNum += 1) {
    const x = xs[xNum];
    const prevX = xs[xNum - 1];

    stroke('black');

    if (xNum !== 1) {
      line(0.1 * width + (0.8 * x * width) / xScale,
        0.9 * height - 0.8 * x * height,
        0.1 * width + (0.8 * x * width) / xScale,
        0.9 * height - 0.8 * getY(x) * height);
      line(0.1 * width + (0.8 * prevX * width) / xScale,
        0.9 * height - 0.8 * x * height,
        0.1 * width + (0.8 * x * width) / xScale,
        0.9 * height - 0.8 * x * height);
    } else {
      line(0.1 * width + (0.8 * x * width) / xScale,
        0.9 * height,
        0.1 * width + (0.8 * x * width) / xScale,
        0.9 * height - 0.8 * getY(x) * height);
    }

    noStroke();
    text(`x${xNum - 1}`, 0.1 * width + (0.8 * x * width) / xScale, 0.9 * height);
  }

  textSize(width / 40);
  textAlign(RIGHT, TOP);
  text('1', 0.1 * width, height * 0.1); // top left
  text(xScaleName, 0.9 * width, 0.9 * height); // bottom right
  text('0', 0.1 * width, height * 0.9); // bottom left

  textAlign(LEFT, BASELINE);
  text(label, 0.01 * width, 0.025 * width);
};
