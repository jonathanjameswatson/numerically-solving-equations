export default (p5) => {
  const x = 100
  const y = 100

  p5.setup = () => {
    p5.createCanvas(700, 410)
  }

  p5.draw = () => {
    p5.background(0)
    p5.fill(255)
    p5.rect(x, y, 50, 50)
  }
}
