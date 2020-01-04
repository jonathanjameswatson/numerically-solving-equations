const renderSketch = (sketch) => {
  return `<figure class="sketch image is-16by9" sketch=${sketch}></figure>`
}

const renderIFrame = (link) => {
  return `<figure class="image is-16by9"><iframe class="has-ratio" src="${link}" scrolling="no"></iframe></figure>`
}

const plugin = (md, opts) => {
  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx]
    const content = token.content.trim()
    if (token.info === 'sketch') {
      return renderSketch(content)
    }
    if (token.info === 'IFrame') {
      return renderIFrame(content)
    }
    return defaultRenderer(tokens, idx, opts, env, self)
  }
}

export default plugin
