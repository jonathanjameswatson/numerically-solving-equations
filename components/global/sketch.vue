<template>
  <figure class="sketch-container">
    <figure class="sketch image is-16by9" :sketch="name"></figure>
    <sub v-if="play">Click the example above to play.</sub>
  </figure>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    play: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
