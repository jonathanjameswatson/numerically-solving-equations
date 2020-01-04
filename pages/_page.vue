<template>
  <div v-html="content" class="content" />
</template>

<script>
const anchorRegExp = RegExp('(?!<a href=\\"e)#.+?(?=\\">)', 'g')

export default {
  data() {
    return { p5Instances: [] }
  },
  async asyncData({ params, error }) {
    const page = params.page || 'index'
    try {
      const Content = await import(`~/assets/contents/${page}.md`)
      const linkFixedContent = Content.default.replace(
        anchorRegExp,
        (match) => `${page}${match}`
      )
      return { page, content: linkFixedContent }
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
      this.p5Instances.push(new P5(p.default, sketch))
    })

    this.pageLong = document.body.clientHeight > window.innerHeight
  },
  beforeDestroy() {
    this.p5Instances.forEach((instance) => {
      instance.remove()
    })
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  },
  head() {
    if (this.page !== 'index') {
      return {
        title: this.$store.state.pages.find(
          (object) => object.name === this.page
        ).title
      }
    }
  }
}
</script>
