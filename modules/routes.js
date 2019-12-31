import pagesGenerator from '../pages'
import utilities from '../utilities'

export default async function routes() {
  const pageNames = await pagesGenerator()
  const methodNames = Object.getOwnPropertyNames(utilities.methods)
  const routes = pageNames.map((page) => `/${page}`)
  routes.push(...methodNames.map((method) => `/calculator/${method}`))
  this.options.generate.routes = this.options.generate.routes.concat(routes)
}
