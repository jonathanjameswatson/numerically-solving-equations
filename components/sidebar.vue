<template>
  <b-sidebar
    :position="mobile ? 'fixed' : 'static'"
    type="is-white"
    :overlay="mobile"
    fullheight
    :fullwidth="!mobile"
    right
    :mobile="mobile ? undefined : 'hide'"
    :class="mobile ? 'is-hidden-desktop' : 'is-paddingless'"
    :open="open"
    @close="close"
  >
    <div :class="mobile ? 'padded' : undefined">
      <b-menu>
        <b-menu-list aria-role="menu" label="Pages">
          <b-menu-item
            v-for="(page, index) in $pages"
            :key="index"
            :label="page.title"
            :to="`/${page.name}`"
            :active="onPage(page.name)"
            tag="nuxt-link"
            aria-role="menuitem"
            @click.native="close"
          />
        </b-menu-list>
        <b-menu-list aria-role="menu" label="Calculators">
          <b-menu-item
            v-for="(calculator, index) in $calculators"
            :key="index"
            :label="calculator.title"
            :to="`/calculator/${calculator.name}`"
            :active="onPage(`calculator/${calculator.name}`)"
            tag="nuxt-link"
            aria-role="menuitem"
            @click.native="close"
          />
        </b-menu-list>
        <b-menu-list v-if="mobile" aria-role="menu" label="Other">
          <b-menu-item
            label="GitHub"
            href="https://github.com/jonathanjameswatson/numerically-solving-equations"
            tag="a"
            aria-role="menuitem"
            @click.native="close"
          />
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    },
    open: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    onPage(pageName) {
      return `/${pageName}` === this.$route.path
    },
    close() {
      this.$emit('update:open', false)
    }
  }
}
</script>
