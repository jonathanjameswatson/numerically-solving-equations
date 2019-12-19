export default (p5) => {
  let t = 0
  let lastTime = 0

  let xLine

  const getY = (x) => x ** 3 - 0.5 * x ** 2 + x - 0.5

  const passTime = () => {
    t += Math.min(100, window.performance.now() - lastTime) / 2500
    lastTime = window.performance.now()
  }

  p5.setup = () => {
    p5.createCanvas(700, 410)
  }

  p5.update = () => {
    passTime()

    xLine = 0.5 + Math.sin(4 * t) / 8
  }

  p5.draw = () => {
    p5.update()

    p5.background('#ff7070')

    p5.noFill()
    p5.stroke('black')
    p5.beginShape()
    for (let x = 0; x < p5.width; x += 1) {
      p5.vertex(x, p5.height / 2 - (getY(x / p5.width) * 100000) / p5.height)
    }
    p5.endShape()

    p5.line(0, p5.height / 2, p5.width, p5.height / 2)

    if (getY(xLine) > 0) {
      p5.stroke('red')
    } else {
      p5.stroke('blue')
    }

    p5.line(
      xLine * p5.width,
      p5.height / 2,
      xLine * p5.width,
      p5.height / 2 - (getY(xLine) * 100000) / p5.height
    )

    p5.noStroke()

    p5.textAlign(p5.LEFT, p5.BASELINE)
    p5.noFill()
    p5.circle(p5.width / 2, p5.height / 2, p5.width / 125)
    p5.fill('black')

    p5.text(
      `x = ${xLine.toFixed(2)}, y = ${getY(xLine).toFixed(2)}`,
      p5.width / 100,
      p5.width / 40
    )
  }
}
