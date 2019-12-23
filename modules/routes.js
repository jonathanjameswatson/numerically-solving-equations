import contentsGenerator from '../contents'

export default async function routes() {
  const contents = await contentsGenerator()
  const routes = contents.map((page) => `/${page}`)
  this.options.generate.routes = this.options.generate.routes.concat(routes)
}
