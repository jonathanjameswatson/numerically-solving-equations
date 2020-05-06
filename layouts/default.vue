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

      <template slot="burger">
        <a
          role="button"
          class="navbar-burger burger"
          :class="{ 'is-active': open }"
          aria-label="menu"
          :aria-expanded="open"
          @click="burgerClick"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </template>
    </b-navbar>

    <div class="main-content container">
      <section class="section">
        <div class="columns is-desktop">
          <aside
            class="column is-3 is-2-widescreen sidebar is-paddingless-touch"
          >
            <b-sidebar
              :position="mobile ? 'fixed' : 'static'"
              type="is-white"
              :overlay="mobile"
              :fullheight="true"
              :fullwidth="!mobile"
              :open.sync="openComputed"
              :right="true"
              class="is-paddingless-desktop"
            >
              <div class="padded is-paddingless-desktop">
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
                  <b-menu-list v-if="mobile" aria-role="menu" label="Other">
                    <b-menu-item
                      label="GitHub"
                      href="https://github.com/jonathanjameswatson/numerically-solving-equations"
                      tag="a"
                      aria-role="menuitem"
                    />
                  </b-menu-list>
                </b-menu>
              </div>
            </b-sidebar>
            <button
              class="button button-stick is-hidden-touch is-primary is-outlined"
              @click="scrollToTop()"
            >
              <span class="icon">▲</span>
              <span>Back to top</span>
            </button>
          </aside>

          <div
            class="column is-8-widescreen is-9-desktop is-8-tablet is-12-mobile is-offset-1-widescreen is-offset-0-desktop is-offset-2-tablet"
          >
            <nuxt />
            <div class="is-hidden-desktop">
              <hr />
              <button class="button is-link" @click="scrollToTop()">
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
      icon,
      mobile: false,
      open: false
    }
  },
  computed: {
    openComputed: {
      get() {
        return this.mobile ? this.open : true
      },
      set(value) {
        this.open = value
      }
    }
  },
  mounted() {
    const setMobile = () => {
      this.mobile = window.innerWidth <= 1023
    }
    window.onresize = setMobile
    setMobile()
  },
  methods: {
    onPage(pageName) {
      return `/${pageName}` === this.$route.path
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    burgerClick() {
      this.open = !this.open
    }
  }
}
</script>
