import pageNames from '../assets/contents/pages'
import methods from '../js/methods'

const capitals = /[A-Z]/g

export default function routes() {
  const methodNames = Object.getOwnPropertyNames(methods).map((name) =>
    name.replace(capitals, (match) => `-${match.toLowerCase()}`)
  )

  const routes = ['/']
  routes.push(...pageNames.map((page) => `/${page}`))
  routes.push(...methodNames.map((method) => `/calculator/${method}`))

  this.options.generate.routes = this.options.generate.routes.concat(routes)
}
