import utilities from './utilities.js'

export default (p5) => {
  let sketch = null
  let graph = null

  const getY = (x) => x ** 6 + 4 * x - 3

  const update = () => {}

  p5.setup = () => {
    sketch = new utilities.Sketch(p5, update)
    graph = new utilities.Graph(sketch, 0.05, 0.1, 0.9, 0.9, 0, 0.5, 1, 10)
  }

  p5.windowResized = () => {
    sketch.resize()
    graph.resize()
    p5.redraw()
  }

  p5.draw = () => {
    sketch.update()

    sketch.background()

    graph.plotAxes()
    graph.plotFunction(getY)

    graph.plotLineUpToFunction(getY, 0, 'blue')
    graph.plotLineUpToFunction(getY, 1, 'red')
    graph.plotLinearInterpolation(getY, 0, 1, 'purple')
  }
}
