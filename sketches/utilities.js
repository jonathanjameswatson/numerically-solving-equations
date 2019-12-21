class Sketch {
  constructor(p5, update, paused = true) {
    this.p5 = p5
    this.updateFunction = update
    this.canvas = p5.createCanvas(16, 9).elt
    this.resize()

    this.paused = paused
    this.time = 0
    this.lastTime = 0

    p5.loadFont('/robotomono.ttf', (font) => {
      p5.textFont(font)
      p5.redraw()
    })

    if (this.paused) {
      update(this)
      p5.noLoop()
    }
  }

  passTime() {
    if (this.paused) {
      return false
    }

    this.time += Math.min(100, window.performance.now() - this.lastTime) / 2500
    this.lastTime = window.performance.now()
  }

  update() {
    if (!this.paused) {
      this.updateFunction(this)
    }
  }

  resize() {
    this.p5.resizeCanvas(
      this.canvas.parentElement.offsetWidth,
      this.canvas.parentElement.offsetHeight
    )

    this.p5.textSize(this.p5.width / 50)
  }

  handleClick(target) {
    if (target === this.canvas) {
      this.paused = false
      this.p5.loop()
    } else {
      this.paused = true
      this.p5.noLoop()
    }
  }

  displayDictionary(dictionary) {
    this.p5.noStroke()
    this.p5.fill('black')

    Object.entries(dictionary).forEach(([key, value], i) => {
      this.p5.text(
        `${key} = ${value}`,
        this.p5.width / 100,
        this.p5.width / 40 + (i * this.p5.width) / 35
      )
    })
  }

  background() {
    this.p5.background('#ff7070')
  }
}

class Graph {
  constructor(sketch, x, y, width, height, xAxis, yAxis, xScale, yScale) {
    this.sketch = sketch

    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.xAxis = xAxis
    this.yAxis = yAxis
    this.xScale = xScale
    this.yScale = yScale

    this.resize()
  }

  resize() {
    this.xPixels = this.x * this.sketch.p5.width
    this.yPixels = this.y * this.sketch.p5.height

    this.widthPixels = this.width * this.sketch.p5.width
    this.heightPixels = this.height * this.sketch.p5.height

    this.xAxisPixels = this.yPixels + this.yAxis * this.heightPixels
    this.yAxisPixels = this.xPixels + this.xAxis * this.widthPixels

    this.xScalePixels = this.widthPixels / this.xScale
    this.yScalePixels = this.heightPixels / this.yScale
  }

  plotAxes(x = true, y = true) {
    this.sketch.p5.stroke('black')
    if (x) {
      this.sketch.p5.line(
        this.xPixels,
        this.xAxisPixels,
        this.xPixels + this.widthPixels,
        this.xAxisPixels
      )
    }
    if (y) {
      this.sketch.p5.line(
        this.yAxisPixels,
        this.yPixels,
        this.yAxisPixels,
        this.yPixels + this.heightPixels
      )
    }
  }

  plotFunction(f) {
    this.sketch.p5.stroke('black')
    this.sketch.p5.noFill()

    this.sketch.p5.beginShape()

    for (
      let xPixels = this.xPixels;
      xPixels < this.xPixels + this.widthPixels;
      xPixels += 1
    ) {
      const x = (xPixels - this.yAxisPixels) / this.xScalePixels
      const y = f(x)
      const yPixels = this.xAxisPixels - y * this.yScalePixels

      if (
        yPixels > this.yPixels &&
        yPixels < this.yPixels + this.heightPixels
      ) {
        this.sketch.p5.vertex(xPixels, yPixels)
      }
    }

    this.sketch.p5.endShape()
  }

  plotRoot(root, colour = 'black') {
    this.sketch.p5.stroke(colour)
    this.sketch.p5.noFill()

    this.sketch.p5.circle(
      this.yAxisPixels + root * this.xScalePixels,
      this.xAxisPixels,
      this.sketch.p5.width / 75
    )

    this.sketch.p5.noStroke()
    this.sketch.p5.fill('black')

    this.sketch.p5.text(
      root.toFixed(2),
      this.yAxisPixels + root * this.xScalePixels,
      this.xAxisPixels + this.sketch.p5.width / 40
    )
  }

  plotLineUpToFunction(f, x, colour = 'black') {
    this.sketch.p5.stroke(colour)

    const y = f(x)
    this.sketch.p5.line(
      this.yAxisPixels + x * this.xScalePixels,
      this.xAxisPixels,
      this.yAxisPixels + x * this.xScalePixels,
      this.xAxisPixels - y * this.yScalePixels
    )
  }
}

export default {
  Sketch,
  Graph
}
