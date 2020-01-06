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
    columns: [
      {
        name: 'a',
        addF: true
      },
      {
        name: 'b',
        addF: true
      },
      {
        name: 'c',
        addF: true
      }
    ],
    addR: false
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
    columns: [
      {
        name: 'a',
        addF: true
      },
      {
        name: 'b',
        addF: true
      },
      {
        name: 'c',
        addF: true
      }
    ],
    addR: false
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
        name: 'Relaxation (λ)',
        type: 'Float',
        value: 1
      },
      {
        name: 'Accuracy',
        type: 'Integer',
        value: 2
      }
    ],
    columns: [
      {
        name: 'x_r',
        addF: false
      }
    ],
    addR: true
  },
  newtonRaphson: {
    name: 'Newton Raphson',
    function: 'x^4 + x - 3',
    leftSide: 'f(x)',
    parameters: [
      {
        name: "f'(x)",
        type: 'Derivative'
      },
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
    columns: [
      {
        name: 'x_r',
        addF: false
      }
    ],
    addR: true
  },
  secant: {
    name: 'Secant method',
    function: '4x^3 - 5x + 1',
    leftSide: 'f(x)',
    parameters: [
      {
        name: 'x_0',
        type: 'Float',
        value: -0.5
      },
      {
        name: 'x_1',
        type: 'Float',
        value: 0
      },
      {
        name: 'Accuracy',
        type: 'Integer',
        value: 2
      }
    ],
    columns: [
      {
        name: 'x_r',
        addF: true
      },
      {
        name: 'x_{r + 1}',
        addF: true
      },
      {
        name: 'x_{r + 2}',
        addF: true
      }
    ],
    addR: true
  }
}
