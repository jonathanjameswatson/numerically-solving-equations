import Sketch from '../sketch'

export default (p5) => {
  let x
  let y
  let lineColour = 'black'

  const getY = ({ x }) => x ** 3 - 0.5 * x ** 2 + x - 0.5

  const update = (s) => {
    x = 0.5 + Math.cos(4 * s.time) / 8
    y = getY({ x })

    if (y > 0) {
      lineColour = 'red'
    } else {
      lineColour = 'blue'
    }
  }

  const sketch = new Sketch(p5, update)
  const graph = sketch.addGraph(0.05, 0.15, 0.9, 0.8, 0, 0.5, 1, 2)

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
