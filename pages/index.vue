<template>
  <section class="section">
    <div class="content">
      <div v-html="html"></div>
    </div>
  </section>
</template>

<script>
import Markdown from '@nuxt/markdown'
const Content = require('~/assets/contents/test.md')

export default {
  name: 'HomePage',

  async asyncData() {
    const md = new Markdown({ toc: false, sanitize: false })
    const { html } = await md.toMarkup(Content.default)
    return { html }
  }
}
</script>
