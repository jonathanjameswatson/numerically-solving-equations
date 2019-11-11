import contentsGenerator from '~/contents.js'

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
    const contents = await contentsGenerator()
    await commit('setContents', contents)
  }
}
