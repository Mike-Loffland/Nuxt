// middleware applied in admin layout
export default function({ store, req }) {
  console.log('[Middleware] Check Auth')

  // if (process.client) {
  //   store.dispatch('initAuth', null)
  // } else {
  //  store.dispatch('initAuth', req)
  // }

  store.dispatch('initAuth', req) // req will be null if it's the client executing the middleware
}
