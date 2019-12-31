<template>
  <div>
    <b-navbar type="is-primary" wrapper-class="container">
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" to="/">
          <h1 class="title has-text-light is-6">
            Numerically Solving Equations
          </h1>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item
          tag="a"
          href="https://github.com/jonathanjameswatson/numerically-solving-equations"
        >
          GitHub
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="main-content container">
      <section class="section">
        <div class="columns">
          <aside class="column is-2 sidebar">
            <b-menu>
              <b-menu-list aria-role="menu" label="Pages">
                <b-menu-item
                  v-for="(page, index) in pages"
                  :key="index"
                  :label="page.title"
                  :to="`/${page.name}`"
                  :active="onPage(page.name)"
                  tag="nuxt-link"
                  aria-role="menuitem"
                />
              </b-menu-list>
              <b-menu-list aria-role="menu" label="Calculators">
                <b-menu-item
                  v-for="(calculator, key, index) in calculators"
                  :key="index"
                  :label="calculator.name"
                  :to="`/calculator/${key}`"
                  :active="onPage(`calculator/${key}`)"
                  tag="nuxt-link"
                  aria-role="menuitem"
                />
              </b-menu-list>
            </b-menu>
            <b-button
              @click="scrollToTop()"
              class="button-stick"
              icon-left="arrow-up"
              type="is-primary"
              outlined
            >
              Back to top
            </b-button>
          </aside>

          <div class="column is-8 is-offset-1">
            <nuxt />
            <b-button
              @click="scrollToTop()"
              class="mobile-button"
              icon-left="arrow-up"
              type="is-link"
            >
              Back to top
            </b-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: this.$store.state.pages,
      calculators: this.$store.state.calculators,
      pageLong: false
    }
  },
  mounted() {
    this.pageLong = document.body.clientHeight > window.innerHeight
  },
  methods: {
    onPage(pageName) {
      return `/${pageName}` === this.$route.path
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>
