export default class Sketch {
  constructor(p5, update = () => {}, noPlay = false, paused = true) {
    this.p5 = p5
    this.updateFunction = update

    this.paused = paused
    this.time = 0
    this.lastTime = 0

    this.graphs = []
    this.animations = []

    p5.setup = () => {
      this.canvas = p5.createCanvas(16, 9).elt
      this.canvas.classList.add('has-ratio')
      this.resize()
      this.graphs.forEach((graph) => {
        graph.resize()
      })

      p5.loadFont('/numerically-solving-equations/robotomono.ttf', (font) => {
        this.p5.textFont(font)
        this.p5.redraw()
      })

      p5.disableFriendlyErrors = true

      if (this.paused) {
        this.updateFunction(this)
        p5.noLoop()
      }
    }

    p5.windowResized = () => {
      this.resize()
      this.graphs.forEach((graph) => {
        graph.resize()
      })
      p5.redraw()
    }

    if (!noPlay) {
      p5.mouseClicked = (event) => {
        if (event.target.classList.contains('p5Canvas')) {
          this.handleClick(event.target)
          return false
        }
      }
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
      this.passTime()
      this.updateFunction(this)
      this.animations.forEach((animation) => animation.update())
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

  addGraph(x, y, width, height, xAxis, yAxis, xScale, yScale) {
    const graph = new Graph(
      this,
      x,
      y,
      width,
      height,
      xAxis,
      yAxis,
      xScale,
      yScale
    )
    this.graphs.push(graph)
    return graph
  }

  addAnimation(keyframes) {
    const animation = new Animation(this, keyframes)
    this.animations.push(animation)
    return animation
  }

  displayList(list) {
    this.p5.noStroke()
    this.p5.fill('black')

    list.forEach((line, i) => {
      this.p5.text(
        line,
        this.p5.width / 100,
        this.p5.width / 40 + (i * this.p5.width) / 35
      )
    })
  }

  displayDictionary(dictionary) {
    this.displayList(
      Object.entries(dictionary).map(([key, value]) => `${key} = ${value}`)
    )
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
      const y = f({ x })
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

    const y = f({ x })
    this.sketch.p5.line(
      this.yAxisPixels + x * this.xScalePixels,
      this.xAxisPixels,
      this.yAxisPixels + x * this.xScalePixels,
      this.xAxisPixels - y * this.yScalePixels
    )
  }

  plotLinearInterpolation(f, a, b, colour = 'black') {
    this.sketch.p5.stroke(colour)

    const fA = f({ x: a })
    const fB = f({ x: b })

    this.sketch.p5.line(
      this.yAxisPixels + a * this.xScalePixels,
      this.xAxisPixels - fA * this.yScalePixels,
      this.yAxisPixels + b * this.xScalePixels,
      this.xAxisPixels - fB * this.yScalePixels
    )
  }
}

class Animation {
  constructor(sketch, keyframes) {
    this.sketch = sketch
    this.keyframes = keyframes
    this.variables = { ...this.keyframes[0].variables }

    this.keyframe = { ...keyframes[0] }
    this.keyframeIndex = 0

    this.frameTime = 0
    this.lastTime = 0
  }

  getNextKeyframeIndex() {
    if (this.keyframeIndex === this.keyframes.length - 1) {
      return 0
    } else {
      return this.keyframeIndex + 1
    }
  }

  update() {
    if (!this.sketch.paused) {
      this.frameTime += this.sketch.time - this.lastTime

      if (this.frameTime > this.keyframe.wait + this.keyframe.transition) {
        this.keyframeIndex = this.getNextKeyframeIndex()

        this.keyframe = { ...this.keyframes[this.keyframeIndex] }
        this.variables = { ...this.keyframe.variables }

        this.frameTime = 0
      } else if (this.frameTime > this.keyframe.wait) {
        const progress =
          (this.frameTime - this.keyframe.wait) / this.keyframe.transition
        const progressEased = progress ** 3

        Object.entries(this.keyframe.variables).forEach(([key, value]) => {
          const nextKeyframe = this.keyframes[this.getNextKeyframeIndex()]
          this.variables[key] =
            value + (nextKeyframe.variables[key] - value) * progressEased
        })
      }
    }

    this.lastTime = this.sketch.time
  }
}
