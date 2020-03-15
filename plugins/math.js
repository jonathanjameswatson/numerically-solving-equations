import { create, all } from 'mathjs'

const subscript = (a, b) => a

// eslint-disable-next-line no-template-curly-in-string
subscript.toTex = '${args[0]}_{${args[1]}}'

const mathjs = create(all)
mathjs.import({ subscript })

const getF = (f) => mathjs.compile(f).evaluate
const getDerivativeString = (f) =>
  mathjs.derivative(mathjs.parse(f), 'x').toString()
const getTex = (f) => mathjs.parse(f).toTex()

export default ({ app }, inject) => {
  inject('getF', getF)
  inject('getDerivativeString', getDerivativeString)
  inject('getTex', getTex)
}
