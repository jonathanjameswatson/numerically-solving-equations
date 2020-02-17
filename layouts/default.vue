<template>
  <div>
    <b-navbar type="is-primary" wrapper-class="container">
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" to="/">
          <figure class="image is-16x16 logo">
            <img
              :srcSet="icon.srcSet"
              :src="icon.src"
              sizes="16px"
              alt="Numerically Solving Equations"
            />
          </figure>
          <h1
            class="title has-text-light is-6 has-text-weight-normal"
            aria-hidden="true"
          >
            umerically Solving Equations
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
          <aside class="column is-3-desktop is-2-widescreen sidebar">
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
                  v-for="(calculator, index) in calculators"
                  :key="index"
                  :label="calculator.title"
                  :to="`/calculator/${calculator.name}`"
                  :active="onPage(`calculator/${calculator.name}`)"
                  tag="nuxt-link"
                  aria-role="menuitem"
                />
              </b-menu-list>
            </b-menu>
            <button
              @click="scrollToTop()"
              class="button button-stick is-hidden-mobile is-primary is-outlined"
            >
              <span class="icon">▲</span>
              <span>Back to top</span>
            </button>
            <hr class="is-hidden-tablet" />
          </aside>

          <div class="column is-8-widescreen is-offset-1-widescreen is-9">
            <nuxt />
            <div class="is-hidden-tablet">
              <hr />
              <button @click="scrollToTop()" class="button is-link">
                <span class="icon">▲</span>
                <span>Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
const icon = require('~/assets/icon.png')

export default {
  data() {
    return {
      pages: this.$pages,
      calculators: this.$calculators,
      icon
    }
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
