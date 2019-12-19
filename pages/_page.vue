<template>
  <div v-html="content" class="content" />
</template>

<script>
export default {
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
  }
}
</script>
