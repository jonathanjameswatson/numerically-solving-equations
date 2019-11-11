<template>
  <section class="section">
    <div class="content">
      <v-runtime-template :template="content" />
    </div>
  </section>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import Card from '~/components/Card'

export default {
  components: {
    VRuntimeTemplate,
    Card // eslint-disable-line vue/no-unused-components
  },
  async asyncData({ params }) {
    const Content = await import(`~/assets/contents/${params.page}.md`)
    return { content: Content.default }
  }
}
</script>
