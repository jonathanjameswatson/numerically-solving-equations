import Sketch from '../sketch'

export default (p5) => {
  const roots = new Array(3)

  const getY = ({ x }) => roots.map((root) => x - root).reduce((a, b) => a * b)

  const update = (sketch) => {
    p5.noiseSeed(0)

    for (let i = 0; i < roots.length; i += 1) {
      roots[i] =
        p5.noise(sketch.time + 1000 * i) / roots.length + i / roots.length
    }

    roots.sort((a, b) => a - b)
  }

  const sketch = new Sketch(p5, update)
  const graph = sketch.addGraph(0.05, 0.15, 0.9, 0.8, 0, 0.5, 1, 0.1)

  p5.draw = () => {
    sketch.update()

    sketch.background()

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
