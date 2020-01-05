import pagesGenerator from '~/pages'
import calculators from '~/js/calculators'

const titleRegex = /h1.*?>(.*?)</m

export const state = () => ({
  pages: null,
  calculators: null
})

export const mutations = {
  setPages(state, pages) {
    state.pages = pages
  },
  setCalculators(state, calculators) {
    state.calculators = calculators
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const pageNames = await pagesGenerator()
    const pages = await Promise.all(
      pageNames
        .filter((pageName) => pageName !== 'index')
        .map(async (name) => {
          const content = await import(`~/assets/contents/${name}.md`)
          const title = content.default.match(titleRegex)[1]
          return { name, title }
        })
    )

    await commit('setPages', pages)
    await commit('setCalculators', calculators)
  }
}
