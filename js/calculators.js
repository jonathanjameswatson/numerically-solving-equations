const parameters = {
  a(value) {
    return {
      name: 'a',
      type: 'Float',
      value,
      explanation:
        'This parameter usually refers to the left boundary of a numerical method.',
      katex: 'a'
    }
  },
  b(value) {
    return {
      name: 'b',
      type: 'Float',
      value,
      explanation:
        'This parameter usually refers to the right boundary of a numerical method.',
      katex: 'b'
    }
  },
  accuracy(value) {
    return {
      name: 'b',
      type: 'Integer',
      value,
      explanation: `In each iteration of a numerical method, the approximation to the exact value will be compared to the last iteration's approximation. If they agree to the number of decimal places given by this parameter, the process will end. Each numerical method will last for no longer than 51 iterations.`,
      katex: '\\text{Accuracy}'
    }
  },
  x_0(value) {
    return {
      name: 'x_0',
      type: 'Float',
      value,
      explanation:
        'This parameter usually refers to the starting value of a numerical method that uses a recurrence relation. It is also the equivalent of parameter a for the secant method.',
      katex: 'x_0'
    }
  },
  relaxation(value) {
    return {
      name: 'relaxation',
      type: 'Float',
      value,
      explanation:
        'This parameter refers the value that is used in the relaxation of fixed point iteration. If you do not want to apply relaxation, leave this value at 1.',
      katex: '\\text{Relaxation }(\\lambda)'
    }
  },
  derivative() {
    return {
      name: "f'(x)",
      type: 'Derivative',
      explanation:
        'This parameter refers to the derivative of the inputted function. This should be set automatically when you input the function. If this does not work or is incorrect, you can input a different formula for it.',
      katex: "f'(x)"
    }
  },
  x_1(value) {
    return {
      name: 'x_1',
      type: 'Float',
      value,
      explanation:
        'This parameter is the equivalent of parameter b for the secant method.',
      katex: 'x_1'
    }
  }
}

export default {
  bisection: {
    name: 'Bisection method',
    function: 'e^x - 4x',
    leftSide: 'y',
    parameters: [parameters.a(0), parameters.b(1), parameters.accuracy(1)],
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
    parameters: [parameters.a(0), parameters.b(1), parameters.accuracy(2)],
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
      parameters.x_0(0),
      parameters.relaxation(1),
      parameters.accuracy(2)
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
    name: 'Newton-Raphson method',
    function: 'x^4 + x - 3',
    leftSide: 'f(x)',
    parameters: [
      parameters.derivative(),
      parameters.x_0(0),
      parameters.accuracy(2)
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
      parameters.x_0(-0.5),
      parameters.x_1(0),
      parameters.accuracy(2)
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
