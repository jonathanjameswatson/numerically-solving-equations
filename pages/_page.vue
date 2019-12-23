<template>
  <div>
    <div v-html="content" class="content" />
    <b-button
      v-if="pageLong"
      @click="scrollToTop()"
      class="mobile-button"
      icon-left="arrow-up"
      type="is-link"
    >
      Back to top
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageLong: false
    }
  },
  async asyncData({ params, error }) {
    const page = params.page || 'index'
    try {
      const Content = await import(`~/assets/contents/${page}.md`)
      return { content: Content.default }
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
