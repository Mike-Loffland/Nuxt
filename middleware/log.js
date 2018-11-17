// *** NOTE -> executed on both server and client (in the relative context)
// ** if you want a given middleware to work on a particular component... you have to add the "middleware" property in said component"
// ** if you wanted a given middleware to work on all routes... provide the "middleware" property on the router property in nuxt.config.js
export default function(nuxtContext) {
  // async needs to return a promise
  // synchronous... you don't need to return anything
  console.log('[Middleware] Log middleware is running')
}
