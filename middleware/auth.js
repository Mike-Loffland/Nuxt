// middleware applied in admin layout
export default function({ store, redirect }) {
  console.log('[Middleware] Auth')
  if (!store.getters.isAuthenticated) {
    redirect('/login')
  }
}
