<template>
  <div class="content">
    <h1>Error {{ error.statusCode }}</h1>
    <p v-if="error.statusCode === 404">
      Page not found
    </p>
    <p v-else>
      An error occurred
    </p>
    <b-button tag="nuxt-link" type="is-link" to="/">
      Return to home
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
