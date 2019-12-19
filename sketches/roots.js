import utilities from './utilities.js'

export default (p5) => {
  let sketch = null
  let graph = null

  const roots = new Array(3)

  const getY = (x) => roots.map((root) => x - root).reduce((a, b) => a * b)

  p5.setup = () => {
    sketch = new utilities.Sketch(p5)
    graph = new utilities.Graph(sketch, 0.05, 0.1, 0.9, 0.8, 0, 0.5, 1, 0.1)
  }

  p5.windowResized = () => {
    sketch.resize()
  }

  p5.update = () => {
    sketch.passTime()

    for (let i = 0; i < roots.length; i += 1) {
      roots[i] =
        p5.noise(sketch.time + 1000 * i) / roots.length + i / roots.length
    }

    roots.sort((a, b) => a - b)
  }

  p5.draw = () => {
    p5.update()

    p5.background('#ff7070')

    graph.plotAxes()
    graph.plotFunction(getY)

    roots.forEach((root) => {
      graph.plotRoot(root)
    })

    // p5.text('x', p5.width / 100, p5.height / 2)

    sketch.displayDictionary({
      y: roots.map((root) => `(x - ${root.toFixed(2)})`).join('')
    })
  }
}
