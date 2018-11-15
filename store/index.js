// Vuex is installed with Nuxt
import Vuex from 'vuex'

const createStore = () => {
  // run on server... so, return a new Vuex.Store for each session... otherwise, all sessions would share the same store
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      SET_POSTS(state, posts) {
        state.loadedPosts = posts
      },
    },
    actions: {
      // special action dispatched by nuxt
      // *** nuxtServerInit requires that you return a Promise if you're executing an async action
      nuxtServerInit(vuexContext, nuxtContext) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.dispatch('setPosts', [
              {
                id: '100',
                title: 'Mocked title 100',
                previewText: 'Some mocked preview text stuff',
                thumbnailUrl: 'https://avatars2.githubusercontent.com/u/23360933?s=200&v=4',
              },
              {
                id: '200',
                title: 'Mocked title 200',
                previewText: 'Some mocked preview text stuff 2',
                thumbnailUrl: 'https://avatars2.githubusercontent.com/u/23360933?s=200&v=4',
              },
            ])
            // IMPORTANT!! call resolve()
            resolve()
          }, 2000)
        })
      },
      setPosts({ commit }, posts) {
        commit('SET_POSTS', posts)
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
