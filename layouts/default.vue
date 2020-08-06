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
            <sidebar :pages="pages" :calculators="calculators" />
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

    <sidebar
      :pages="pages"
      :calculators="calculators"
      mobile
      :open.sync="open"
    />
  </div>
</template>

<script>
import calculators from '~/js/calculators'
const icon = require('~/assets/icon.png?resize')

export default {
  async fetch() {
    const pages = await this.$content('/')
      .only(['slug', 'title'])
      .where({ slug: { $ne: 'index' } })
      .sortBy('order')
      .fetch()
    this.pages = pages

    const capitals = /[A-Z]/g
    this.calculators = Object.getOwnPropertyNames(calculators).map((name) => {
      return {
        title: calculators[name].name,
        slug: name.replace(capitals, (match) => `-${match.toLowerCase()}`)
      }
    })
  },
  data() {
    return {
      icon,
      open: false,
      pages: [],
      calculators: []
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    burgerClick() {
      this.open = !this.open
    }
  }
}
</script>
