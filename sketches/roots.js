export default (p5) => {
  let t = 0
  let lastTime = 0

  const roots = new Array(3)

  const getY = (x) =>
    roots.map((root) => x - root * p5.width).reduce((a, b) => a * b)

  const passTime = () => {
    t += Math.min(100, window.performance.now() - lastTime) / 2500
    lastTime = window.performance.now()
  }

  p5.setup = () => {
    p5.createCanvas(700, 410)
  }

  p5.update = () => {
    passTime()

    for (let i = 0; i < roots.length; i += 1) {
      roots[i] = p5.noise(t + 1000 * i) / roots.length + i / roots.length
    }

    roots.sort((a, b) => a - b)
  }

  p5.draw = () => {
    p5.update()

    p5.background('#ff7070')

    p5.noFill()
    p5.beginShape()
    for (let x = 0; x < p5.width; x += 1) {
      p5.vertex(x, p5.height / 2 - getY(x) / 125 / p5.height)
    }
    p5.endShape()

    p5.line(0, p5.height / 2, p5.width, p5.height / 2)

    roots.forEach((root) => {
      p5.noFill()
      p5.circle(root * p5.width, p5.height / 2, p5.width / 125)
      p5.fill('black')
      p5.text(root.toFixed(2), root * p5.width, p5.height / 2)
    })

    p5.text('x', p5.width / 100, p5.height / 2)

    p5.text(
      `y = ${roots.map((root) => `(x - ${root.toFixed(2)})`).join('')}`,
      p5.width / 100,
      p5.width / 40
    )
  }
}
