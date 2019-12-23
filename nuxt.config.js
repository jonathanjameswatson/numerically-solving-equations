import markdownItPlugin from './markdownItPlugin.js'

export default {
  mode: 'universal',
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['katex/dist/katex.min.css', '~/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { css: false }],
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '~/modules/routes.js'
  ],
  /*
   ** Markdownit configuration
   */
  markdownit: {
    typographer: true,
    linkify: true,
    breaks: true,
    use: [
      [
        'markdown-it-anchor',
        {
          permalink: true,
          level: 2
        }
      ],
      '@liradb2000/markdown-it-katex',
      [
        'markdown-it-toc-done-right',
        {
          level: 2
        }
      ],
      markdownItPlugin
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = { fs: 'empty' }
    }
  },
  /*
   ** Generate configuration
   */
  generate: {
    subFolders: false
  },
  /*
   ** Router configuration
   */
  router: {
    base: '/numerically-solving-equations/'
  },
  /*
   ** Default transition
   */
  pageTransition: 'default',
  /*
   ** PWA configuration
   */
  pwa: {
    meta: {
      name: 'Numerically Solving Equations',
      theme_color: '#f00',
      ogHost:
        'https://jonathanjameswatson.github.io/numerically-solving-equations',
      twitterCard: 'summary'
    },
    manifest: {
      name: 'Numerically Solving Equations',
      short_name: 'Numerically Solving Equations',
      theme_color: '#f00',
      display: 'fullscreen'
    }
  }
}
