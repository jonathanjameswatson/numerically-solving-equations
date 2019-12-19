<template>
  <div v-html="content" class="content" />
</template>

<script>
import Card from '~/components/Card'

export default {
  components: {
    Card // eslint-disable-line vue/no-unused-components
  },
  async asyncData({ params }) {
    const Content = await import(`~/assets/contents/${params.page}.md`)
    return { content: Content.default }
  }
}
</script>
