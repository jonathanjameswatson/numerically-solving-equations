<template>
  <div>
    <h1 class="title">{{ title }} calculator</h1>

    <b-field label="Function">
      <b-input v-model="f" />
    </b-field>

    <div v-html="fKatex"></div>

    <b-field
      v-for="(parameter, index) in parameters"
      :key="index"
      :label="parameter.name"
    >
      <b-numberinput
        :controls="false"
        :step="parameter.type === 'Integer' ? 1 : 'any'"
        v-model="parameter.value"
      />
    </b-field>

    <b-button @click="solve" type="is-primary">Solve</b-button>

    <div v-if="table !== ''" v-html="table" />
  </div>
</template>

<script>
import { create, all } from 'mathjs'
import { renderToString } from 'katex'

import calculators from '~/js/calculators'
import methods from '~/js/methods'

const subscript = (a, b) => a

// eslint-disable-next-line no-template-curly-in-string
subscript.toTex = '${args[0]}_{${args[1]}}'

const mathjs = create(all)
mathjs.import({ subscript })

export default {
  computed: {
    fKatex() {
      return renderToString(this.fTex, {
        displayMode: true
      })
    }
  },
  watch: {
    f() {
      try {
        this.fTex = mathjs.parse(`${this.leftSide} == ${this.f}`).toTex()
        this.lastF = this.f
      } catch {}
    }
  },
  asyncData({ params, error }) {
    const calculatorKey = params.calculator
    const calculator = calculators[calculatorKey]

    if (calculator === undefined) {
      error({
        statusCode: 404,
        message: 'This page could not be found.'
      })
      return false
    }

    return {
      title: calculator.name,
      parameters: calculator.parameters,
      columns: calculator.columns,
      addF: calculator.addF,
      leftSide: calculator.leftSide,
      calculatorKey,
      f: calculator.function,
      lastF: calculator.function,
      fTex: mathjs
        .parse(`${calculator.leftSide} == ${calculator.function}`)
        .toTex(),
      table: ''
    }
  },
  methods: {
    solve() {
      const { evaluate } = mathjs.compile(this.lastF)
      const table = methods[this.calculatorKey](
        evaluate,
        ...this.parameters.map((parameter) => parameter.value)
      )

      const addF = (x) => {
        if (this.addF) {
          return `${x} & ${evaluate({ x })}`
        }
        return x
      }

      const makeRows = (row) =>
        `${Object.values(row)
          .map(addF)
          .join(' & ')} \\\\ \\hline`

      const array = `
      \\begin{array}{|${Array(Object.values(table[0]).length * 2)
        .fill('c|')
        .join('')}} \\hline
      ${this.columns.join(' & ')} \\\\ \\hline
      ${table.map(makeRows).join(' ')}
      \\end{array}`

      this.table = renderToString(array, {
        displayMode: true
      })
    }
  },
  head() {
    return {
      title: `${this.title} calculator`
    }
  }
}
</script>
