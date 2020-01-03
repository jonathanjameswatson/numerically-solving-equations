<template>
  <div>
    <h1 class="title">{{ title }} calculator</h1>

    <b-field label="Function">
      <b-input v-model="f" />
    </b-field>

    <div v-html="fKatex"></div>

    <b-field label="a">
      <b-numberinput :controls="false" v-model="a" />
    </b-field>

    <b-field label="b">
      <b-numberinput :controls="false" v-model="b" />
    </b-field>

    <b-field label="Accuracy">
      <b-numberinput :controls="false" v-model="accuracy" />
    </b-field>

    <b-button @click="solve" type="is-primary">Solve</b-button>

    <div v-html="table" />
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
    const method = utilities.methods[calculatorKey]

    if (calculator === undefined) {
      error({
        statusCode: 404,
        message: 'This page could not be found.'
      })
      return false
    }

    return {
      title: calculator.name,
      calculator,
      method,
      f: 'x^2',
      lastF: 'x^2',
      fTex: 'y = x^2',
      a: 0,
      b: 1,
      accuracy: 1,
      table: ''
    }
  },
  methods: {
    solve() {
      const { evaluate } = compile(this.lastF)
      const table = this.method(evaluate, this.a, this.b, this.accuracy)

      const makeRows = (row) =>
        `${Object.values(row)
          .map((x) => `${x} & ${evaluate({ x })}`)
          .join(' & ')} \\\\ \\hline`

      const array = `
      \\begin{array}{|${Array(Object.values(table[0]).length * 2)
        .fill('c|')
        .join('')}} \\hline
      a & f(a) & b & f(b) & c & f(c) \\\\ \\hline
      ${table.map(makeRows).join(' ')}
      \\end{array}`

      this.table = renderToString(array, {
        displayMode: true
      })
    }
  }
}
</script>
