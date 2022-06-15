export default {
  target: 'static',
  components: true,
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: [
    {
      src: 'katex/dist/katex.min.css',
      defer: true
    },
    '~/assets/scss/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/math.js', '~/plugins/createTable.js'],
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
    ['nuxt-buefy', { css: false, materialDesignIcons: false }],
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],
  /*
   ** Content configuration
   */
  content: {
    markdown: {
      remarkPlugins: ['remark-math', 'remark-textr'],
      rehypePlugins: ['rehype-katex']
    }
  },
  /*
   ** Generate configuration
   */
  generate: {
    subFolders: false,
    fallback: true
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
      description:
        'Numerically Solving Equations is a website designed to demonstrate how numerical methods can be used to find the roots of equations. It has interactive diagrams to demonstrate numerical processes as well as calculators to find roots with tables. This website has information on bisection method, false position, fixed point iteration, Newton-Raphson method and Secant method.',
      theme_color: '#FF7070',
      ogHost: 'https://jonathanjameswatson.com',
      ogImage: '/numerically-solving-equations/preview.png',
      twitterCard: 'summary_large_image'
    },
    manifest: {
      name: 'Numerically Solving Equations',
      short_name: 'Numerically Solving Equations',
      theme_color: '#FF7070',
      display: 'fullscreen'
    }
  },
  /*
   ** Sitemap configuration
   */
  sitemap: {
    hostname: 'https://jonathanjameswatson.com',
    gzip: true
  },
  /*
   ** Webpack configuration
   */
  build: {
    transpile: ['remark-math', 'remark-textr', 'rehype-katex']
  }
}
