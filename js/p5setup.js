let looping = true;
let robotoMono;

windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
  textSize(width / 40);
};

preload = () => {
  robotoMono = loadFont('../fonts/RobotoMono-Regular.ttf');
};

mouseClicked = () => {
  if (looping) {
    noLoop();
    looping = false;
  } else {
    loop();
    looping = true;
  }
};

setup = () => {
  createCanvas(windowWidth, windowHeight);
  textFont(robotoMono);
  textSize(width / 40);
  mouseClicked();
};
