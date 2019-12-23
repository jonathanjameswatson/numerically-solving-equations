import utilities from './utilities.js'

export default (p5) => {
  let sketch = null
  let graph = null

  let x
  let y
  let lineColour = 'black'

  const getY = (x) => x ** 3 - 0.5 * x ** 2 + x - 0.5

  const update = (s) => {
    s.passTime()

    x = 0.5 + Math.cos(4 * s.time) / 8
    y = getY(x)

    if (y > 0) {
      lineColour = 'red'
    } else {
      lineColour = 'blue'
    }
  }

  p5.setup = () => {
    sketch = new utilities.Sketch(p5, update)
    graph = new utilities.Graph(sketch, 0.05, 0.15, 0.9, 0.8, 0, 0.5, 1, 2)
  }

  p5.windowResized = () => {
    sketch.resize()
    graph.resize()
    p5.redraw()
  }

  p5.mouseClicked = (event) => {
    if (event.target.className === 'p5Canvas') {
      sketch.handleClick(event.target)
      return false
    }
  }

  p5.draw = () => {
    sketch.update()

    sketch.background()

    graph.plotAxes()
    graph.plotFunction(getY)

    graph.plotLineUpToFunction(getY, x, lineColour)
    graph.plotRoot(0.5)

    sketch.displayDictionary({
      x: x.toFixed(2),
      y: y.toFixed(2)
    })
  }
}
