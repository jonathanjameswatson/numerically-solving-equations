<template>
  <div class="content" v-html="content" />
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
      return { page, content: linkFixedContent }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'This page could not be found.'
      })
    }
  },
  data() {
    return { p5Instances: [] }
  },
  async mounted() {
    const { default: P5 } = await import('p5/lib/p5.min.js')
    const sketches = document.getElementsByClassName('sketch')
    await Promise.all(
      Array.from(sketches).map(async (sketch) => {
        const { default: instance } = await import(
          `~/js/sketches/${sketch.getAttribute('sketch')}.js`
        )
        this.p5Instances.push(new P5(instance, sketch))
        return true
      })
    )
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
        title: this.$pages.find((object) => object.name === this.page).title
      }
    }
  }
}
</script>
