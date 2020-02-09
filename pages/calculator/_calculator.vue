<template>
  <div>
    <h1 class="title">{{ title }} calculator</h1>

    <form>
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
          v-if="parameter.type === 'Integer' || parameter.type === 'Float'"
          :controls="false"
          :step="parameter.type === 'Integer' ? 1 : 'any'"
          v-model="parameter.value"
        />
        <b-input v-else v-model="parameter.value"> </b-input>
      </b-field>

      <b-button
        @click.stop.prevent="solve"
        type="is-primary"
        native-type="submit"
        >Solve</b-button
      >
    </form>

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
      this.watchF()
    }
  },
  asyncData({ params, error, app }) {
    const name = params.calculator
    const calculatorKey = app.calculators.find(
      (calculator) => calculator.name === name
    ).file
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
      addR: calculator.addR,
      leftSide: calculator.leftSide,
      calculatorKey,
      f: calculator.function,
      lastF: calculator.function,
      fTex: '',
      table: ''
    }
  },
  mounted() {
    this.watchF()
  },
  methods: {
    watchF() {
      try {
        this.fTex = mathjs.parse(`${this.leftSide} == ${this.f}`).toTex()
        this.lastF = this.f

        this.parameters.forEach((parameter) => {
          if (parameter.type === 'Derivative') {
            const derivative = mathjs.derivative(mathjs.parse(this.f), 'x')
            parameter.value = derivative.toString()
          }
        })
      } catch {}
    },
    solve() {
      const { evaluate } = mathjs.compile(this.lastF)
      const table = methods[this.calculatorKey](
        evaluate,
        ...this.parameters.map((parameter) => {
          if (parameter.type === 'Derivative') {
            return mathjs.compile(parameter.value).evaluate
          }

          return parameter.value
        })
      )

      const addF = ([key, x]) => {
        const column = this.columns.find((element) => element.name === key)
        if (column) {
          if (column.addF) {
            return `${x} & ${evaluate({ x })}`
          }
        }

        return x
      }

      const makeRows = (row, i) => {
        let start = ''
        if (this.addR) {
          start = `${i} &`
        }

        return `${start} ${Object.entries(row)
          .map(addF)
          .join(' & ')} \\\\ \\hline`
      }

      const columns = this.columns.flatMap((column) => {
        if (column.addF) {
          return [column.name, `f(${column.name})`]
        }

        return column.name
      })

      if (this.addR) {
        columns.unshift('r')
      }

      const array = `
      \\begin{array}{|${Array(Object.values(table[0]).length * 2)
        .fill('c|')
        .join('')}} \\hline
      ${columns.join(' & ')} \\\\ \\hline
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
