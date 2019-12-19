const renderSketch = (sketch) => {
  return `<div class="sketch container-16-by-9" sketch=${sketch}></div>`
}

const renderIFrame = (link) => {
  return `<div class="container-16-by-9"><iframe src="${link}"></iframe></div>`
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
