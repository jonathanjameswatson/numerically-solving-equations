<template>
  <section class="section">
    <div class="content">
      <div v-html="README"></div>
    </div>
  </section>
</template>

<script>
import README from '~/assets/contents/test.md'

export default {
  name: 'HomePage',

  computed: {
    README() {
      return README
    }
  }
}
</script>
