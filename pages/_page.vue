<template>
  <div v-html="content" class="content" />
</template>

<script>
const anchorRegExp = RegExp('(?!<a href=\\"e)#.+?(?=\\">)', 'g')
export default {
  async asyncData({ params, error }) {
    const page = params.page || 'index'
    try {
      const Content = await import(`~/assets/contents/${page}.md`)
      const linkFixedContent = Content.default.replace(
        anchorRegExp,
        (match) => `${page}${match}`
      )
      return { content: linkFixedContent }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'This page could not be found.'
      })
    }
  },
  mounted() {
    const P5 = require('p5')
    const sketches = document.getElementsByClassName('sketch')
    Array.from(sketches).forEach(async (sketch) => {
      const p = await import(`~/sketches/${sketch.getAttribute('sketch')}.js`)
      new P5(p.default, sketch) // eslint-disable-line
    })

    this.pageLong = document.body.clientHeight > window.innerHeight
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>
