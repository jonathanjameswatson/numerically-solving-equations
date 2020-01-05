import Sketch from '../sketch'

export default (p5) => {
  const getY = ({ x }) => x ** 6 + 4 * x - 3

  const sketch = new Sketch(p5, () => {}, true)
  const graph = sketch.addGraph(0.05, 0.1, 0.9, 0.9, 0, 0.5, 1, 10)

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
