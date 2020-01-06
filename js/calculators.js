export default {
  bisection: {
    name: 'Bisection method',
    function: 'e^x - 4x',
    leftSide: 'y',
    parameters: [
      {
        name: 'a',
        type: 'Float',
        value: 0
      },
      {
        name: 'b',
        type: 'Float',
        value: 1
      },
      {
        name: 'Accuracy',
        type: 'Integer',
        value: 1
      }
    ],
    columns: ['a', 'f(a)', 'b', 'f(b)', 'c', 'f(c)'],
    addF: true
  },
  falsePosition: {
    name: 'False position',
    function: '(x + 1/4)! - 1',
    leftSide: 'y',
    parameters: [
      {
        name: 'a',
        type: 'Float',
        value: 0
      },
      {
        name: 'b',
        type: 'Float',
        value: 1
      },
      {
        name: 'Accuracy',
        type: 'Integer',
        value: 2
      }
    ],
    columns: ['a', 'f(a)', 'b', 'f(b)', 'c', 'f(c)'],
    addF: true
  },
  fixedPointIteration: {
    name: 'Fixed point iteration',
    function: 'cos(x)',
    leftSide: 'subscript(x, r+1)',
    parameters: [
      {
        name: 'x_0',
        type: 'Float',
        value: 0
      },
      {
        name: 'Accuracy',
        type: 'Integer',
        value: 2
      }
    ],
    columns: ['r', 'x_r'],
    addF: false
  }
}
