// const pkg = require('./package')
import { fireBase } from './localconfig.js'

module.exports = {
  mode: 'universal', // take advantage of Nuxt's pre-rendering capabilities

  // mode: 'spa', // -> Just use Nuxt to take advantage of the route configuration by folder approach and other coniguration (but, no server-side rendering)

  /*
   ** Headers of the page (ALL pages)
   **** using Vue Meta behind the scenes
   */
  head: {
    title: 'WD Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Super cool Nuxt.js WD blog' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans' },

      //<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  // loading: false,
  loading: { color: 'lime', failedColor: 'red', height: '10px', duration: 5000 },
  // loadingIndicator is only for mode: 'spa'
  // loadingIndicator: {
  //   name: 'circle',
  //   color: 'lime'
  // }

  /*
   ** Global CSS
   */
  css: ['~assets/styles/mycustomglobal.css'],

  /*
   ** Plugins to load before mounting the App
   */

  // interface to execute/load functionality before the app is fully rendered and mounted
  // *** the code executed does NOT have to be Vue specific... just use it to run ANY code you want executed before the app is mounted
  plugins: ['~plugins/core-components.js', '~plugins/date-filter.js'],

  /*
   ** Nuxt.js modules
   */

  // allows you to add convenience features to your Nuxt app
  // https://github.com/nuxt-community/awesome-nuxt#modules
  // https://nuxtjs.org/guide/modules/
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: process.env.BASE_URL || fireBase.url,
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  // set environmental variables that will be injected into the project
  env: {
    baseUrl: process.env.BASE_URL || fireBase.url,
    fireBaseSignup: fireBase.authSignup,
    fireBaseSignin: fireBase.authSignin,
  },

  //set the rootDir... default is '' .. set the path relative to your node_modules folder (essentially)
  //rootDir: '',

  // where do all of your nuxt specific folders live? pages, layouts, etc..
  // srcDir: 'some-folder/sub-folder/',

  // .fade-enter-active class is defined in styles/mycustomglobal.css
  // use the prefix (as defined in Vue docs)
  transition: {
    name: 'fade',
    mode: 'out-in',
  },

  router: {
    // example of adding a route programatically (instead of the folder based approach)
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/booger',
        component: resolve(__dirname, 'pages/index.vue'),
      })
    },
    middleware: 'log',
    //linkActiveClass: 'some-custom-class',
  },

  // change the way Nuxt generates static pages
  // generate: {

  // }
}
