// Vuex is installed with Nuxt
import Vuex from 'vuex'
import { fireBase } from '@/localconfig.js'
import Cookie from 'js-cookie'

const createStore = () => {
  // run on server... so, return a new Vuex.Store for each session... otherwise, all sessions would share the same store
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },

    mutations: {
      SET_POSTS(state, posts) {
        state.loadedPosts = posts
      },
      ADD_POST(state, post) {
        state.loadedPosts.push(post)
      },
      UPDATE_POST(state, post) {
        let postIndex = state.loadedPosts.findIndex(lp => lp.id === post.id)
        //console.log('found post', state.loadedPosts, post)
        state.loadedPosts[postIndex] = post
      },
      REMOVE_POST(state, post) {
        state.loadedPosts = state.loadedPosts.filter(lp => lp.id != post.id)
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      CLEAR_TOKEN(state) {
        state.token = null
      },
    },

    actions: {
      nuxtServerInit(vuexContext, nuxtContext) {
        // special action dispatched by nuxt
        // *** nuxtServerInit requires that you return a Promise if you're executing an async action
        // ***** nuxtServerInit will do all the magic to initialize data in the store

        // NOTE: .$axios is available because of the @nuxtjs/axios module
        // **** in the nuxtServerInit, the methods are prefaced with a $ (.get becomes .$get)
        return nuxtContext.app.$axios
          .$get(fireBase.postsJsonNode)
          .then(axiosResponse => {
            const postArray = []
            Object.keys(axiosResponse).forEach(key => {
              postArray.push({ ...axiosResponse[key], id: key })
            })
            vuexContext.dispatch('setPosts', postArray)
          })
          .catch(err => {
            nuxtContext.error(err)
          })
      },
      setPosts({ commit }, posts) {
        commit('SET_POSTS', posts)
      },
      addPost({ commit, state }, post) {
        let createdPost = { ...post, updatedDate: new Date() }
        return this.$axios
          .post(`${fireBase.postsJsonNode}?auth=${state.token}`, createdPost)
          .then(result => {
            commit('ADD_POST', { ...createdPost, id: result.data.name })
          })
          .catch(err => {
            console.log(err)
          })
      },
      updatePost({ commit, state }, post) {
        let fireBaseDocument = `${post.id}.json`
        post.updatedDate = new Date()
        return this.$axios
          .put(`${fireBase.postsNode}${fireBaseDocument}?auth=${state.token}`, post)
          .then(result => {
            commit('UPDATE_POST', post)
          })
          .catch(err => {
            console.log(err)
          })
      },
      deletePost({ commit, state }, post) {
        let fireBaseDocument = `${post.id}.json`
        return this.$axios
          .delete(`${fireBase.postsNode}${fireBaseDocument}?auth=${state.token}`)
          .then(result => {
            commit('REMOVE_POST', post)
          })
          .catch(err => {
            console.log(err)
          })
      },
      authenticateUser({ commit, dispatch }, { isLogin, email, password }) {
        let authEndpoint = isLogin ? process.env.fireBaseSignin : process.env.fireBaseSignup
        return this.$axios
          .$post(authEndpoint, {
            email,
            password,
            returnSecureToken: true,
          })
          .then(({ idToken, expiresIn }) => {
            const expiresInMilliseconds = expiresIn * 1000
            const tokenExpiresDateTime = new Date().getTime() + +expiresInMilliseconds
            commit('SET_TOKEN', idToken)

            // ** CLIENT
            localStorage.setItem('token', idToken)
            localStorage.setItem('tokenExpire', tokenExpiresDateTime)

            // ** SERVER
            Cookie.set('customjwt', idToken)
            Cookie.set('customjwttime', tokenExpiresDateTime)
          })
          .catch(err => {
            let [error] = err.errors
            console.log(error)
          })
      },
      initAuth({ commit, dispatch }, request) {
        let token
        let tokenExpireTime
        const isServer = request != null
        if (isServer) {
          if (!request.headers.cookie) {
            return
          }

          const jwtCookie = request.headers.cookie.split(';').find(c => c.trim().startsWith('customjwt='))
          const jwtCookieExpire = request.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('customjwttime='))

          if (jwtCookie && jwtCookieExpire) {
            token = jwtCookie.split('=')[1]
            tokenExpireTime = jwtCookieExpire.split('=')[1]
          }
        } else {
          token = localStorage.getItem('token')
          tokenExpireTime = localStorage.getItem('tokenExpire')
        }

        // new Date().getTime() converts to milliseconds
        if (!token || new Date().getTime() > tokenExpireTime) {
          // invalidate token
          console.log('token invalidated... logOut called')
          dispatch('logOut')
          return
        }
        commit('SET_TOKEN', token)
      },
      logOut({ commit }) {
        commit('CLEAR_TOKEN')
        Cookie.remove('customjwt')
        Cookie.remove('customjwttime')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpire')
        }
      },
    },

    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      },
    },
  })
}

export default createStore
