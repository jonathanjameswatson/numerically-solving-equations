import Vue from 'vue'
import pageNames from '../assets/contents/pages'
import methods from '../js/methods'
import calculatorList from '~/js/calculators'

const capitals = /[A-Z]/g
const dashes = /-/g

const pages = pageNames.map((name) => {
  const lowerTitle = name.replace(dashes, ' ')
  const title = lowerTitle[0].toUpperCase() + lowerTitle.slice(1)

  return {
    name,
    title
  }
})

const calculators = Object.getOwnPropertyNames(methods).map((file) => {
  const title = calculatorList[file].name

  const name = file.replace(capitals, (match) => `-${match.toLowerCase()}`)

  return {
    name,
    title,
    file
  }
})

Vue.prototype.$pages = pages
Vue.prototype.$calculators = calculators

export default ({ app }) => {
  // Set the function directly on the context.app object
  app.pages = pages
  app.calculators = calculators
}
