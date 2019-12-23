import contentsGenerator from '~/contents.js'

const titleRegex = /h1.*?>(.*?)</m

export const state = () => ({
  contents: null
})

export const mutations = {
  setContents(state, contents) {
    state.contents = contents
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const pageNames = await contentsGenerator()
    const contents = await Promise.all(
      pageNames
        .filter((pageName) => pageName !== 'index')
        .map(async (name) => {
          const content = await import(`~/assets/contents/${name}.md`)
          const title = content.default.match(titleRegex)[1]
          return { name, title }
        })
    )
    await commit('setContents', contents)
  }
}
