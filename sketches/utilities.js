class Sketch {
  constructor(p5) {
    this.p5 = p5
    this.canvas = p5.createCanvas(16, 9).elt
    this.resize()

    this.paused = false
    this.time = 0
    this.lastTime = 0

    p5.loadFont('/robotomono.ttf', (font) => {
      p5.textFont(font)
    })
    p5.textSize(p5.width / 50)
  }

  passTime() {
    if (this.paused) {
      return false
    }

    this.time += Math.min(100, window.performance.now() - this.lastTime) / 2500
    this.lastTime = window.performance.now()
  }

  resize() {
    this.p5.resizeCanvas(
      this.canvas.parentElement.offsetWidth,
      this.canvas.parentElement.offsetHeight
    )
  }

  displayDictionary(dictionary) {
    Object.entries(dictionary).forEach(([key, value], i) => {
      this.p5.text(
        `${key} = ${value}`,
        this.p5.width / 100,
        this.p5.width / 40 + (i * this.p5.width) / 20
      )
    })
  }
}

class Graph {
  constructor(sketch, x, y, length, height, xAxis, yAxis, xScale, yScale) {
    this.sketch = sketch
    this.x = x * sketch.p5.width
    this.y = y * sketch.p5.height
    this.width = length * sketch.p5.width
    this.height = height * sketch.p5.height
    this.xAxis = this.y + yAxis * this.height
    this.yAxis = this.x + xAxis * this.width
    this.xScale = this.width / xScale
    this.yScale = this.height / yScale
  }

  plotAxes() {
    this.sketch.p5.line(this.x, this.xAxis, this.x + this.width, this.xAxis)
    this.sketch.p5.line(this.yAxis, this.y, this.yAxis, this.y + this.height)
  }

  plotFunction(f) {
    this.sketch.p5.noFill()
    this.sketch.p5.beginShape()

    for (let x = this.x; x < this.x + this.width; x += 1) {
      const scaledX = (x - this.yAxis) / this.xScale
      const scaledY = f(scaledX)
      const y = this.xAxis - scaledY * this.yScale
      if (y > this.y && y < this.y + this.height) {
        this.sketch.p5.vertex(x, y)
      }
    }

    this.sketch.p5.endShape()
  }

  plotRoot(root) {
    this.sketch.p5.noFill()
    this.sketch.p5.circle(
      this.yAxis + root * this.xScale,
      this.xAxis,
      this.sketch.p5.width / 75
    )
    this.sketch.p5.fill('black')
    this.sketch.p5.text(
      root.toFixed(2),
      this.yAxis + root * this.xScale,
      this.xAxis + this.sketch.p5.width / 50
    )
  }

  plotcIRCLE
}

export default {
  Sketch,
  Graph
}
