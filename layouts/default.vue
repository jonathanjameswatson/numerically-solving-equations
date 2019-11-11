<template>
  <div>
    <b-navbar type="is-primary" wrapper-class="container">
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" to="/">
          <img
            src="~assets/buefy.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
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

    <section class="main-content container">
      <div class="columns">
        <aside class="column is-2 section">
          <b-menu>
            <b-menu-list aria-role="menu">
              <b-menu-item
                v-for="(page, index) in pages"
                :key="index"
                :label="page.title"
                :to="`/${page.name}`"
                tag="nuxt-link"
                aria-role="menuitem"
              />
            </b-menu-list>
          </b-menu>
        </aside>

        <div class="container column is-10">
          <nuxt />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { pages: this.$store.state.contents }
  }
}
</script>
