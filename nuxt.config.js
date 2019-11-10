export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
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
    '@nuxtjs/markdownit'
  ],

  markdownit: {
    typographer: true,
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-anchor',
      '@liradb2000/markdown-it-katex',
      'markdown-it-toc-done-right',
      [
        'markdown-it-container',
        'sketch',
        {
          validate(params) {
            return params.trim().match(/^sketch\s+(.*)$/)
          },
          render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^sketch\s+(.*)$/)

            if (tokens[idx].nesting === 1) {
              // opening tag
              return `<div><card title=${m[1]} icon="user" />\n`
            } else {
              // closing tag
              return '</div>\n'
            }
          }
        }
      ]
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
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  }
}
