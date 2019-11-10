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
          <p class="menu-label is-hidden-touch">
            General
          </p>
          <ul class="menu-list">
            <li v-for="(item, key) of items" :key="key">
              <nuxt-link :to="item.to" exact-active-class="is-active">
                <b-icon :icon="item.icon" /> {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
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
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
