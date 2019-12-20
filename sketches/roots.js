import utilities from './utilities.js'

export default (p5) => {
  let sketch = null
  let graph = null

  const roots = new Array(3)

  const getY = (x) => roots.map((root) => x - root).reduce((a, b) => a * b)

  const update = (s) => {
    s.passTime()

    for (let i = 0; i < roots.length; i += 1) {
      roots[i] = p5.noise(s.time + 1000 * i) / roots.length + i / roots.length
    }

    roots.sort((a, b) => a - b)
  }

  p5.setup = () => {
    sketch = new utilities.Sketch(p5, update)
    graph = new utilities.Graph(sketch, 0.05, 0.15, 0.9, 0.8, 0, 0.5, 1, 0.1)
  }

  p5.windowResized = () => {
    graph.resize()
    sketch.resize()
  }

  p5.mouseClicked = (event) => {
    if (event.target === sketch.canvas) {
      sketch.pause()
      return false
    }
  }

  p5.draw = () => {
    sketch.update()

    p5.background('#ff7070')

    graph.plotAxes()
    graph.plotFunction(getY)

    roots.forEach((root) => {
      graph.plotRoot(root)
    })

    sketch.displayDictionary({
      y: roots.map((root) => `(x - ${root.toFixed(2)})`).join(''),
      roots: roots.map((root) => root.toFixed(2).toString()).join(', ')
    })
  }
}
