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
import { parse, compile } from 'mathjs'
import { renderToString } from 'katex'

import utilities from '~/utilities'

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
        this.fTex = parse(`y == ${this.f}`).toTex()
        this.lastF = this.f
      } catch {}
    }
  },
  asyncData({ params, error }) {
    const calculatorKey = params.calculator
    const calculator = utilities.calculators[calculatorKey]

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
      calculatorKey,
      f: calculator.function,
      lastF: calculator.function,
      fTex: parse(`y == ${calculator.function}`).toTex(),
      table: ''
    }
  },
  methods: {
    solve() {
      const { evaluate } = compile(this.lastF)
      const table = utilities.methods[this.calculatorKey](
        evaluate,
        ...this.parameters.map((parameter) => parameter.value)
      )

      const makeRows = (row) =>
        `${Object.values(row)
          .map((x) => `${x} & ${evaluate({ x })}`)
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
