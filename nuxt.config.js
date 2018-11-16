const pkg = require('./package')

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
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [],

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
    baseUrl: process.env.BASE_URL || 'https://blog-bb78a.firebaseio.com/',
  },
}
