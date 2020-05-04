<template>
  <div>
    <h1 class="title">{{ title }} calculator</h1>

    <form>
      <b-field>
        <template slot="label">
          <div aria-hidden="true" v-html="titleKatex" />
        </template>
        <b-input v-model="f" aria-label="Close" />
      </b-field>

      <div v-html="fKatex" />

      <b-field v-for="(parameter, index) in parameters" :key="index">
        <template slot="label">
          <b-tooltip dashed :label="parameter.explanation" multilined>
            <div aria-hidden="true" v-html="parameterKatex[index]" />
          </b-tooltip>
        </template>

        <b-numberinput
          v-if="parameter.type === 'Integer' || parameter.type === 'Float'"
          v-model="parameter.value"
          :aria-label="parameter.name"
          :controls="false"
          :step="parameter.type === 'Integer' ? 1 : 'any'"
        />
        <b-input
          v-else
          v-model="parameter.value"
          :aria-label="parameter.name"
        />
      </b-field>

      <b-field>
        <template slot="label">
          <b-tooltip
            dashed
            label="This is the number of decimal places each value in each cell will be rounded to."
            multilined
          >
            <div aria-hidden="true" v-html="dpKatex" />
          </b-tooltip>
        </template>

        <b-numberinput
          v-model="decimalPlaces"
          aria-label="Decimal place limit"
          :controls="false"
          :step="1"
        />
      </b-field>

      <hr />

      <b-button
        type="is-primary"
        native-type="submit"
        @click.stop.prevent="solve"
        >Solve</b-button
      >
    </form>

    <div v-if="table !== ''" v-html="table" />
  </div>
</template>

<script>
import { renderToString } from 'katex'

import calculators from '~/js/calculators'

export default {
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
      leftSide: calculator.leftSide,
      calculatorKey,
      f: calculator.function,
      lastF: calculator.function,
      fTex: '',
      table: '',
      decimalPlaces: 16
    }
  },
  computed: {
    fKatex() {
      return renderToString(this.fTex, {
        displayMode: true
      })
    },
    titleKatex() {
      return renderToString('\\text{Function}')
    },
    dpKatex() {
      return renderToString('\\text{Decimal place limit}')
    },
    parameterKatex() {
      return this.parameters.map((parameter) => renderToString(parameter.katex))
    }
  },
  watch: {
    f() {
      this.watchF()
    }
  },
  mounted() {
    this.watchF()
  },
  methods: {
    watchF() {
      try {
        this.fTex = this.$getTex(`${this.leftSide} == ${this.f}`)
        this.lastF = this.f

        this.parameters.forEach((parameter) => {
          if (parameter.type === 'Derivative') {
            parameter.value = this.$getDerivativeString(this.f)
          }
        })
      } catch {}
    },
    solve() {
      const f = this.$getF(this.lastF)
      const parameters = this.parameters.map((parameter) => {
        if (parameter.type === 'Derivative') {
          return this.$getF(parameter.value)
        }
        return parameter.value
      })
      this.table = this.$createTable(
        this.calculatorKey,
        f,
        parameters,
        this.decimalPlaces
      )
    }
  },
  head() {
    return {
      title: `${this.title} calculator`
    }
  }
}
</script>
