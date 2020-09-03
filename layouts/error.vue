<template>
  <div class="container has-text-centered">
    <h1 class="title">Error {{ error.statusCode }}</h1>
    <p v-if="error.statusCode === 404" class="subtitle">Page not found</p>
    <template v-else>
      <p>An error occurred</p>
      <br />
    </template>
    <b-button tag="nuxt-link" type="is-link" to="/">Return to home</b-button>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
