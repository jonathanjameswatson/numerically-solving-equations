import utilities from './utilities.js'

const falsePosition = (f, a, b, accuracy) => {
  const table = [
    {
      a,
      b,
      c: null
    }
  ]

  while (true) {
    const lastRow = table[table.length - 1]

    const fLastRow = utilities.mapObjectValues(lastRow, (number) => f(number))

    lastRow.c =
      (lastRow.a * fLastRow.b - lastRow.b * fLastRow.a) /
      (fLastRow.b - fLastRow.a)
    fLastRow.c = f(lastRow.c)

    if (Math.abs(fLastRow.c) < 10 ** -(accuracy + 1)) {
      break
    }

    const { a, b, c } = utilities.mapObjectValues(fLastRow, (number) =>
      Math.sign(number)
    )

    if (c === a) {
      table.push({
        a: lastRow.c,
        b: lastRow.b,
        c: null
      })
    } else if (c === b) {
      table.push({
        a: lastRow.a,
        b: lastRow.c,
        c: null
      })
    } else {
      break
    }
  }

  return table
}

export default (p5) => {
  let sketch = null
  let graph = null
  let animation = null

  const getY = (x) => x ** 6 + 4 * x - 3

  const update = (s) => {
    s.passTime()
  }

  p5.setup = () => {
    sketch = new utilities.Sketch(p5, update)
    graph = new utilities.Graph(sketch, 0.05, 0.15, 0.9, 0.8, 0, 0.5, 1, 10)

    const table = falsePosition(getY, 0, 1, 1)
    const keyframes = table.map((row) => {
      const { a, b } = row
      return {
        variables: { a, b },
        transition: 0.5,
        wait: 0.2
      }
    })
    animation = new utilities.Animation(sketch, keyframes)
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
    animation.update()

    sketch.background()

    graph.plotAxes()
    graph.plotFunction(getY)

    const { a, b } = animation.variables
    graph.plotLineUpToFunction(getY, a, 'blue')
    graph.plotLineUpToFunction(getY, b, 'red')
    graph.plotLinearInterpolation(getY, a, b, 'purple')

    sketch.displayList([`${a.toFixed(5)} < x < ${b.toFixed(5)}`])
  }
}
