<template>
  <div class="content">
    <h1>{{ document.title }}</h1>
    <ol v-if="document.toc">
      <li v-for="link of document.toc" :key="link.id">
        <nuxt-link :to="`#${link.id}`">{{ link.text }}</nuxt-link>
      </li>
    </ol>
    <nuxt-content class="content" :document="document" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const page = params.page || 'index'
    try {
      const document = await $content(page).fetch()
      return { page, document }
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
        title: this.document.title
      }
    }
  }
}
</script>
