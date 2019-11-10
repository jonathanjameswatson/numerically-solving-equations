<template>
  <section class="section">
    <div class="content">
      <v-runtime-template :template="README" />
    </div>
  </section>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'

import Card from '~/components/Card'
import README from '~/assets/contents/test.md'

export default {
  name: 'HomePage',
  components: {
    VRuntimeTemplate,
    Card // eslint-disable-line vue/no-unused-components
  },
  computed: {
    README() {
      return README
    }
  }
}
</script>
