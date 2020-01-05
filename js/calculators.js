export default {
  bisection: {
    name: 'Bisection method',
    function: 'e^x - 4x',
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
    columns: ['a', 'f(a)', 'b', 'f(b)', 'c', 'f(c)']
  },
  falsePosition: {
    name: 'False position',
    function: '(x + 1/4)! - 1',
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
        type: 'Int',
        value: 2
      }
    ],
    columns: ['a', 'f(a)', 'b', 'f(b)', 'c', 'f(c)']
  }
}
