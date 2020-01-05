import Sketch from '../sketch'
import falsePosition from '../methods/falsePosition'

export default (p5) => {
  const getY = ({ x }) => x ** 6 + 4 * x - 3

  const table = falsePosition(getY, 0, 1, 2)

  const keyframes = table.map((row) => {
    const { a, b, c } = row
    return {
      variables: { a, b, c },
      transition: 0.5,
      wait: 0.2
    }
  })

  const sketch = new Sketch(p5)
  const graph = sketch.addGraph(0.05, 0.15, 0.9, 0.8, 0, 0.5, 1, 10)
  const animation = sketch.addAnimation(keyframes)

  p5.draw = () => {
    sketch.update()

    sketch.background()

    graph.plotAxes()
    graph.plotFunction(getY)

    const { a, b, c } = animation.variables
    graph.plotLineUpToFunction(getY, a, 'blue')
    graph.plotLineUpToFunction(getY, b, 'red')
    graph.plotLinearInterpolation(getY, a, b, 'purple')

    sketch.displayList([
      `${a.toFixed(5)} < x < ${b.toFixed(5)}`,
      `c = ${c.toFixed(5)}`
    ])
  }
}
