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
      <!--<template slot="start">
        <b-navbar-item tag="nuxt-link" to="/">
          Home
        </b-navbar-item>
      </template>-->

      <template slot="end">
        <b-navbar-item tag="a" href="#">
          GitHub
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="main-content container">
      <section class="section">
        <div class="columns">
          <aside class="column is-2">
            <b-menu>
              <b-menu-list aria-role="menu">
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
            </b-menu>
          </aside>

          <div class="column is-8 is-offset-1">
            <nuxt />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { pages: this.$store.state.contents }
  },
  methods: {
    onPage(pageName) {
      return `/${pageName}` === this.$route.path
    }
  }
}
</script>
